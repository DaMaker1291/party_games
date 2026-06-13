import { Server as HTTPServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Socket as NetSocket } from 'net'
import {
  createRoom,
  getRoom,
  addPlayerToRoom,
  addPassAndPlayPlayer,
  startGame,
  nextTurn,
  answerQuestion,
  handleTimerExpiry,
  applySabotage,
  removePlayer,
  endGame,
} from '../../lib/gameLogic'

export const config = {
  api: {
    bodyParser: false,
  },
}

interface SocketServer extends HTTPServer {
  io?: SocketIOServer
}

interface SocketWithIO extends NetSocket {
  server: SocketServer
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO
}

export default function SocketHandler(req: NextApiRequest, res: NextApiResponseWithSocket) {
  if (res.socket.server.io) {
    res.end()
    return
  }

  const io = new SocketIOServer(res.socket.server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  })

  res.socket.server.io = io

  io.on('connection', (socket) => {
    console.log(`Player connected: ${socket.id}`)

    socket.on('create-room', ({ playerName, mode }, callback) => {
      const room = createRoom(playerName, mode)

      socket.join(room.code)
      socket.data.playerId = room.players[0].id
      socket.data.roomCode = room.code
      socket.data.isHost = true

      callback({ success: true, room })
    })

    socket.on('join-room', ({ roomCode, playerName }, callback) => {
      const result = addPlayerToRoom(roomCode, playerName)
      if (!result) {
        callback({ success: false, error: 'Room not found or game already started' })
        return
      }

      const { room, playerId } = result
      socket.join(roomCode)
      socket.data.playerId = playerId
      socket.data.roomCode = roomCode
      socket.data.isHost = false

      io.to(roomCode).emit('room-updated', room)
      callback({ success: true, room, playerId })
    })

    socket.on('add-pass-and-play-player', ({ roomCode, playerName }, callback) => {
      const room = getRoom(roomCode)
      if (!room) {
        callback({ success: false, error: 'Room not found' })
        return
      }

      const player = addPassAndPlayPlayer(roomCode, playerName)
      if (!player) {
        callback({ success: false, error: 'Failed to add player' })
        return
      }

      io.to(roomCode).emit('room-updated', room)
      callback({ success: true, room, player })
    })

    socket.on('start-game', ({ roomCode }, callback) => {
      const room = startGame(roomCode)
      if (!room) {
        callback({ success: false, error: 'Cannot start game' })
        return
      }

      io.to(roomCode).emit('game-started', room)
      callback({ success: true, room })
    })

    socket.on('submit-answer', ({ roomCode, playerId, answerIndex }, callback) => {
      try {
        const result = answerQuestion(roomCode, playerId, answerIndex)
        io.to(roomCode).emit('answer-result', {
          playerId,
          correct: result.correct,
          pointsEarned: result.pointsEarned,
          room: result.newRoom,
        })

        if (result.newRoom.state === 'game-over') {
          io.to(roomCode).emit('game-over', result.newRoom)
        }

        callback({ success: true, ...result })
      } catch (e: any) {
        callback({ success: false, error: e.message })
      }
    })

    socket.on('next-turn', ({ roomCode }, callback) => {
      const room = nextTurn(roomCode)
      if (!room) {
        callback({ success: false, error: 'Room not found' })
        return
      }

      if (room.state === 'game-over') {
        io.to(roomCode).emit('game-over', room)
      } else {
        io.to(roomCode).emit('new-turn', room)
      }

      callback({ success: true, room })
    })

    socket.on('timer-expired', ({ roomCode }, callback) => {
      const room = handleTimerExpiry(roomCode)
      if (!room) {
        callback({ success: false, error: 'Room not found' })
        return
      }

      if (room.state === 'game-over') {
        io.to(roomCode).emit('game-over', room)
      } else {
        io.to(roomCode).emit('new-turn', room)
      }

      callback({ success: true, room })
    })

    socket.on('use-sabotage', ({ roomCode, targetPlayerId, sabotageId }, callback) => {
      const room = applySabotage(roomCode, socket.data.playerId, targetPlayerId, sabotageId)
      if (!room) {
        callback({ success: false, error: 'Failed to use sabotage' })
        return
      }

      io.to(roomCode).emit('sabotage-applied', {
        sourcePlayerId: socket.data.playerId,
        targetPlayerId,
        sabotageId,
        room,
      })

      callback({ success: true, room })
    })

    socket.on('disconnect', () => {
      const { roomCode, playerId } = socket.data
      if (roomCode && playerId) {
        const room = getRoom(roomCode)
        if (room) {
          const player = room.players.find((p) => p.id === playerId)
          if (player) {
            player.connected = false
          }
          io.to(roomCode).emit('room-updated', room)
        }
      }
    })
  })

  res.end()
}
