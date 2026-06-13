import { useEffect, useState, useCallback } from 'react'
import { io, Socket } from 'socket.io-client'
import { GameRoom, Player } from '../lib/types'

let globalSocket: Socket | null = null

export function getSocket(): Socket | null {
  return globalSocket
}

export function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    if (globalSocket?.connected) {
      setSocket(globalSocket)
      setConnected(true)
      return
    }

    const s = io({
      transports: ['websocket', 'polling'],
    })

    globalSocket = s
    setSocket(s)

    s.on('connect', () => setConnected(true))
    s.on('disconnect', () => setConnected(false))

    return () => {
      s.off('connect')
      s.off('disconnect')
    }
  }, [])

  return { socket, connected }
}

export function useGameRoom() {
  const [room, setRoom] = useState<GameRoom | null>(null)
  const [playerId, setPlayerId] = useState<string | null>(null)
  const [isHost, setIsHost] = useState(false)

  useEffect(() => {
    const s = getSocket()
    if (!s) return

    const handlers = {
      'room-updated': (updatedRoom: GameRoom) => setRoom(updatedRoom),
      'game-started': (startedRoom: GameRoom) => setRoom(startedRoom),
      'new-turn': (updatedRoom: GameRoom) => setRoom(updatedRoom),
      'answer-result': ({ room: updatedRoom }: { room: GameRoom }) => setRoom(updatedRoom),
      'game-over': (finalRoom: GameRoom) => setRoom(finalRoom),
      'sabotage-applied': ({ room: updatedRoom }: { room: GameRoom }) => setRoom(updatedRoom),
    }

    Object.entries(handlers).forEach(([event, handler]) => {
      s.on(event, handler)
    })

    return () => {
      Object.entries(handlers).forEach(([event, handler]) => {
        s.off(event, handler)
      })
    }
  }, [])

  const createRoom = useCallback((playerName: string, mode: 'pass-and-play' | 'multi-device') => {
    return new Promise<{ success: boolean; room: GameRoom }>((resolve) => {
      const s = getSocket()
      if (!s) return
      s.emit('create-room', { playerName, mode }, (res: any) => {
        if (res.success) {
          setRoom(res.room)
          setPlayerId(res.room.players[0].id)
          setIsHost(true)
        }
        resolve(res)
      })
    })
  }, [])

  const joinRoom = useCallback((roomCode: string, playerName: string) => {
    return new Promise<{ success: boolean; room?: GameRoom; playerId?: string; error?: string }>((resolve) => {
      const s = getSocket()
      if (!s) return
      s.emit('join-room', { roomCode, playerName }, (res: any) => {
        if (res.success) {
          setRoom(res.room)
          setPlayerId(res.playerId)
        }
        resolve(res)
      })
    })
  }, [])

  const addPassAndPlayPlayer = useCallback((roomCode: string, playerName: string) => {
    return new Promise<{ success: boolean; room?: GameRoom }>((resolve) => {
      const s = getSocket()
      if (!s) return
      s.emit('add-pass-and-play-player', { roomCode, playerName }, (res: any) => {
        if (res.success) setRoom(res.room)
        resolve(res)
      })
    })
  }, [])

  const startGame = useCallback((roomCode: string) => {
    return new Promise<{ success: boolean; room?: GameRoom }>((resolve) => {
      const s = getSocket()
      if (!s) return
      s.emit('start-game', { roomCode }, (res: any) => {
        if (res.success) setRoom(res.room)
        resolve(res)
      })
    })
  }, [])

  const submitAnswer = useCallback((roomCode: string, playerId: string, answerIndex: number) => {
    return new Promise<{ success: boolean; correct?: boolean; pointsEarned?: number }>((resolve) => {
      const s = getSocket()
      if (!s) return
      s.emit('submit-answer', { roomCode, playerId, answerIndex }, resolve)
    })
  }, [])

  const nextTurn = useCallback((roomCode: string) => {
    return new Promise((resolve) => {
      const s = getSocket()
      if (!s) return
      s.emit('next-turn', { roomCode }, resolve)
    })
  }, [])

  const timerExpired = useCallback((roomCode: string) => {
    return new Promise((resolve) => {
      const s = getSocket()
      if (!s) return
      s.emit('timer-expired', { roomCode }, resolve)
    })
  }, [])

  const useSabotage = useCallback((roomCode: string, targetPlayerId: string, sabotageId: string) => {
    return new Promise((resolve) => {
      const s = getSocket()
      if (!s) return
      s.emit('use-sabotage', { roomCode, targetPlayerId, sabotageId }, resolve)
    })
  }, [])

  return {
    room,
    setRoom,
    playerId,
    isHost,
    createRoom,
    joinRoom,
    addPassAndPlayPlayer,
    startGame,
    submitAnswer,
    nextTurn,
    timerExpired,
    useSabotage,
  }
}
