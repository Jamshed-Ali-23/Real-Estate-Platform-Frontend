import { io } from 'socket.io-client'

// Production Socket URL - defaults to deployed Heroku backend
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'https://real-estate-platform-bf1c8ee4e0a4.herokuapp.com'

console.log(`🔌 Socket Configuration: ${SOCKET_URL}`)

class SocketService {
  constructor() {
    this.socket = null
    this.listeners = new Map()
  }

  connect(token) {
    if (this.socket?.connected) return this.socket

    this.socket = io(SOCKET_URL, {
      auth: { token },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
      withCredentials: true
    })

    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket.id)
    })

    this.socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason)
    })

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error.message)
    })

    return this.socket
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  }

  // Chat methods
  joinRoom(roomId) {
    this.socket?.emit('join_room', roomId)
  }

  leaveRoom(roomId) {
    this.socket?.emit('leave_room', roomId)
  }

  sendMessage(data) {
    this.socket?.emit('send_message', data)
  }

  onMessage(callback) {
    this.socket?.on('receive_message', callback)
  }

  onTyping(callback) {
    this.socket?.on('user_typing', callback)
  }

  emitTyping(roomId, isTyping) {
    this.socket?.emit('typing', { roomId, isTyping })
  }

  onUserOnline(callback) {
    this.socket?.on('user_online', callback)
  }

  onUserOffline(callback) {
    this.socket?.on('user_offline', callback)
  }

  // Notification methods
  onNotification(callback) {
    this.socket?.on('notification', callback)
  }

  // Clean up listeners
  removeListener(event) {
    this.socket?.off(event)
  }

  removeAllListeners() {
    this.socket?.removeAllListeners()
  }
}

export const socketService = new SocketService()
export default socketService
