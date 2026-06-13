import { useEffect, useState, useCallback } from 'react'
import { io, Socket } from 'socket.io-client'
import { GameRoom } from '../lib/types'

let globalSocket: Socket | null = null
let initPromise: Promise<void> | null = null

function ensureServer(): Promise<void> {
  if (initPromise) return initPromise
  initPromise = fetch('/api/socket').then(() => {})
  return initPromise
}

export function getSocket(): Socket | null {
  return globalSocket
}

export function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [connected, setConnected] = useState(false)
  const [initDone, setInitDone] = useState(false)

  useEffect(() => {
    if (globalSocket?.connected) {
      setSocket(globalSocket)
      setConnected(true)
      setInitDone(true)
      return
    }

    let cancelled = false

    ensureServer().then(() => {
      if (cancelled) return
      setInitDone(true)

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
      s.on('connect_error', (err) => {
        console.error('Socket connection error:', err.message)
      })
    })

    return () => { cancelled = true }
  }, [])

  return { socket, connected, initDone }
}

export function useGameRoom() {
  const [room, setRoom] = useState<GameRoom | null>(null)
  const [playerId, setPlayerId] = useState<string | null>(null)
  const [isHost, setIsHost] = useState(false)

  useEffect(() => {
    const s = getSocket()
    if (!s) return

    const handlers: Record<string, (...args: any[]) => void> = {
      'room-updated': (updatedRoom: GameRoom) => setRoom(updatedRoom),
      'game-started': (startedRoom: GameRoom) => setRoom(startedRoom),
      'new-turn': (updatedRoom: GameRoom) => setRoom(updatedRoom),
      'answer-result': ({ room: updatedRoom }: { room: GameRoom }) => setRoom(updatedRoom),
      'game-over': (finalRoom: GameRoom) => setRoom(finalRoom),
      'sabotage-applied': ({ room: updatedRoom }: { room: GameRoom }) => setRoom(updatedRoom),
    }

    Object.entries(handlers).forEach(([event, handler]) => s.on(event, handler))
    return () => {
      Object.entries(handlers).forEach(([event, handler]) => s.off(event, handler))
    }
  }, [])

  const waitForSocket = useCallback(async (): Promise<Socket> => {
    const s = getSocket()
    if (s?.connected) return s
    await ensureServer()
    return new Promise((resolve) => {
      const check = setInterval(() => {
        const sock = getSocket()
        if (sock?.connected) { clearInterval(check); resolve(sock) }
      }, 100)
      setTimeout(() => clearInterval(check), 10000)
    })
  }, [])

  const createRoom = useCallback(async (playerName: string, mode: 'pass-and-play' | 'multi-device') => {
    const s = await waitForSocket()
    return new Promise<{ success: boolean; room: GameRoom }>((resolve) => {
      s.emit('create-room', { playerName, mode }, (res: any) => {
        if (res?.success) {
          setRoom(res.room)
          setPlayerId(res.room.players[0].id)
          setIsHost(true)
        }
        resolve(res || { success: false, error: 'No response' })
      })
    })
  }, [waitForSocket])

  const joinRoom = useCallback(async (roomCode: string, playerName: string) => {
    const s = await waitForSocket()
    return new Promise<{ success: boolean; room?: GameRoom; playerId?: string; error?: string }>((resolve) => {
      s.emit('join-room', { roomCode, playerName }, (res: any) => {
        if (res?.success) {
          setRoom(res.room)
          setPlayerId(res.playerId)
        }
        resolve(res || { success: false, error: 'No response' })
      })
    })
  }, [waitForSocket])

  const addPassAndPlayPlayer = useCallback(async (roomCode: string, playerName: string) => {
    const s = getSocket()
    if (!s) return { success: false }
    return new Promise<{ success: boolean; room?: GameRoom }>((resolve) => {
      s.emit('add-pass-and-play-player', { roomCode, playerName }, (res: any) => {
        if (res?.success) setRoom(res.room)
        resolve(res || { success: false })
      })
    })
  }, [])

  const startGame = useCallback(async (roomCode: string) => {
    const s = getSocket()
    if (!s) return { success: false }
    return new Promise<{ success: boolean; room?: GameRoom }>((resolve) => {
      s.emit('start-game', { roomCode }, (res: any) => {
        if (res?.success) setRoom(res.room)
        resolve(res || { success: false })
      })
    })
  }, [])

  const submitAnswer = useCallback((roomCode: string, playerId: string, answerIndex: number) => {
    return new Promise<{ success: boolean; correct?: boolean; pointsEarned?: number }>((resolve) => {
      const s = getSocket()
      if (!s) { resolve({ success: false }); return }
      s.emit('submit-answer', { roomCode, playerId, answerIndex }, resolve)
    })
  }, [])

  const nextTurn = useCallback((roomCode: string) => {
    return new Promise((resolve) => {
      const s = getSocket()
      if (!s) { resolve({ success: false }); return }
      s.emit('next-turn', { roomCode }, resolve)
    })
  }, [])

  const timerExpired = useCallback((roomCode: string) => {
    return new Promise((resolve) => {
      const s = getSocket()
      if (!s) { resolve({ success: false }); return }
      s.emit('timer-expired', { roomCode }, resolve)
    })
  }, [])

  const useSabotage = useCallback((roomCode: string, targetPlayerId: string, sabotageId: string) => {
    return new Promise((resolve) => {
      const s = getSocket()
      if (!s) { resolve({ success: false }); return }
      s.emit('use-sabotage', { roomCode, targetPlayerId, sabotageId }, resolve)
    })
  }, [])

  return {
    room, setRoom, playerId, isHost,
    createRoom, joinRoom, addPassAndPlayPlayer,
    startGame, submitAnswer, nextTurn, timerExpired, useSabotage,
  }
}
