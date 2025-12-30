import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useAuth } from './AuthContext'
import socketService from '../services/socketService'
import chatService from '../services/chatService'

const ChatContext = createContext()

export function ChatProvider({ children }) {
  const { user, token } = useAuth()
  const [conversations, setConversations] = useState([])
  const [activeConversation, setActiveConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isConnected, setIsConnected] = useState(false)
  const [typingUsers, setTypingUsers] = useState({})
  const [onlineUsers, setOnlineUsers] = useState(new Set())
  const [loading, setLoading] = useState(false)

  // Connect to socket when user is authenticated
  useEffect(() => {
    if (token && user) {
      const socket = socketService.connect(token)
      
      socket.on('connect', () => {
        setIsConnected(true)
      })

      socket.on('disconnect', () => {
        setIsConnected(false)
      })

      // Listen for new messages
      socketService.onMessage((message) => {
        setMessages(prev => [...prev, message])
        
        // Update conversation last message
        setConversations(prev => prev.map(conv => 
          conv.id === message.conversationId 
            ? { ...conv, lastMessage: message, updatedAt: message.createdAt }
            : conv
        ))

        // Increment unread if not in active conversation
        if (activeConversation?.id !== message.conversationId) {
          setUnreadCount(prev => prev + 1)
        }
      })

      // Listen for typing indicators
      socketService.onTyping(({ roomId, userId, isTyping }) => {
        setTypingUsers(prev => ({
          ...prev,
          [roomId]: isTyping ? userId : null
        }))
      })

      // Listen for user online status
      socketService.onUserOnline((userId) => {
        setOnlineUsers(prev => new Set([...prev, userId]))
      })

      socketService.onUserOffline((userId) => {
        setOnlineUsers(prev => {
          const newSet = new Set(prev)
          newSet.delete(userId)
          return newSet
        })
      })

      return () => {
        socketService.disconnect()
      }
    }
  }, [token, user, activeConversation])

  // Fetch conversations
  const fetchConversations = useCallback(async () => {
    try {
      setLoading(true)
      const data = await chatService.getConversations()
      setConversations(data.conversations || [])
      setUnreadCount(data.unreadCount || 0)
    } catch (error) {
      console.error('Error fetching conversations:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  // Fetch messages for a conversation
  const fetchMessages = useCallback(async (conversationId) => {
    try {
      setLoading(true)
      const data = await chatService.getMessages(conversationId)
      setMessages(data.messages || [])
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  // Open a conversation
  const openConversation = useCallback(async (conversation) => {
    setActiveConversation(conversation)
    socketService.joinRoom(conversation.id)
    await fetchMessages(conversation.id)
    await chatService.markAsRead(conversation.id)
  }, [fetchMessages])

  // Close current conversation
  const closeConversation = useCallback(() => {
    if (activeConversation) {
      socketService.leaveRoom(activeConversation.id)
    }
    setActiveConversation(null)
    setMessages([])
  }, [activeConversation])

  // Start a new conversation
  const startConversation = useCallback(async (participantId, propertyId = null) => {
    try {
      const data = await chatService.getOrCreateConversation(participantId, propertyId)
      await openConversation(data.conversation)
      await fetchConversations()
      return data.conversation
    } catch (error) {
      console.error('Error starting conversation:', error)
      throw error
    }
  }, [openConversation, fetchConversations])

  // Send a message
  const sendMessage = useCallback(async (content, attachments = []) => {
    if (!activeConversation) return

    try {
      const message = await chatService.sendMessage(activeConversation.id, content, attachments)
      
      // Emit via socket
      socketService.sendMessage({
        conversationId: activeConversation.id,
        ...message
      })

      // Optimistically add to messages
      setMessages(prev => [...prev, message])
      
      return message
    } catch (error) {
      console.error('Error sending message:', error)
      throw error
    }
  }, [activeConversation])

  // Send typing indicator
  const sendTypingIndicator = useCallback((isTyping) => {
    if (activeConversation) {
      socketService.emitTyping(activeConversation.id, isTyping)
    }
  }, [activeConversation])

  // Check if user is online
  const isUserOnline = useCallback((userId) => {
    return onlineUsers.has(userId)
  }, [onlineUsers])

  const value = {
    conversations,
    activeConversation,
    messages,
    unreadCount,
    isConnected,
    typingUsers,
    loading,
    fetchConversations,
    openConversation,
    closeConversation,
    startConversation,
    sendMessage,
    sendTypingIndicator,
    isUserOnline
  }

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}

export default ChatContext
