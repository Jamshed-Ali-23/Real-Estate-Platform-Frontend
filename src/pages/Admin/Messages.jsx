import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import leadService from '../../services/leadService'

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [conversations, setConversations] = useState([])

  // Fetch real messages from API (leads with messages)
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true)
        const response = await leadService.getAll()

        if (response.success && response.data) {
          // Transform leads with messages into conversation format
          const messagesFromLeads = response.data
            .filter(lead => lead.message || lead.name) // Only leads that have content
            .map((lead, index) => {
              // Handle property - it could be an object (populated) or a string
              let propertyName = 'General Inquiry'
              if (lead.property) {
                if (typeof lead.property === 'object') {
                  propertyName = lead.property.title || lead.property.name || 'Property Inquiry'
                } else {
                  propertyName = lead.property
                }
              } else if (lead.propertyInterest) {
                propertyName = lead.propertyInterest
              } else if (lead.interestedIn) {
                propertyName = lead.interestedIn
              }

              return {
                id: lead.id || lead._id || index,
                client: {
                  name: lead.name || 'Unknown Customer',
                  email: lead.email || '',
                  phone: lead.phone || '',
                  avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(lead.name || 'U')}&background=${['6366f1', '10b981', 'f59e0b', 'ec4899', '8b5cf6'][index % 5]}&color=fff`
                },
                property: propertyName,
                lastMessage: lead.message || 'Customer inquiry',
                time: lead.createdAt ? new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recently',
                date: lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : new Date().toLocaleDateString(),
                unread: lead.status === 'new' ? 1 : 0,
                status: lead.status || 'new',
                source: lead.source || 'Website',
                messages: [
                  {
                    id: 1,
                    text: lead.message || `Hi, I'm interested in your properties. ${lead.phone ? 'You can reach me at ' + lead.phone : ''}`,
                    sender: 'client',
                    time: lead.createdAt ? new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recently'
                  }
                ]
              }
            })

          setConversations(messagesFromLeads)
        } else {
          setConversations([])
        }
      } catch (error) {
        console.error('Error fetching messages:', error)
        setConversations([])
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [])

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.property.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filter === 'all' ||
      (filter === 'unread' && conv.unread > 0)
    return matchesSearch && matchesFilter
  })

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unread, 0)

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedConversation) return

    const message = {
      id: Date.now(),
      text: newMessage,
      sender: 'agent',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setConversations(conversations.map(conv =>
      conv.id === selectedConversation.id
        ? {
          ...conv,
          messages: [...conv.messages, message],
          lastMessage: newMessage,
          time: 'Just now'
        }
        : conv
    ))

    setSelectedConversation({
      ...selectedConversation,
      messages: [...selectedConversation.messages, message]
    })

    setNewMessage('')
    toast.success('Message sent!')
  }

  const markAsRead = (id) => {
    setConversations(conversations.map(conv =>
      conv.id === id ? { ...conv, unread: 0 } : conv
    ))
  }

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-120px)] bg-white rounded-2xl shadow-sm border border-gray-100 items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading messages...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-120px)] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Conversations List */}
      <div className={`w-full md:w-96 border-r border-gray-100 flex flex-col ${selectedConversation ? 'hidden md:flex' : 'flex'}`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Messages</h1>
              <p className="text-sm text-gray-500">{conversations.length} total • {totalUnread} unread</p>
            </div>
            <button className="p-2 bg-primary-50 text-primary-600 rounded-xl hover:bg-primary-100 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
            />
          </div>

          {/* Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === 'all' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === 'unread' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              Unread ({totalUnread})
            </button>
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map(conv => (
            <div
              key={conv.id}
              onClick={() => {
                setSelectedConversation(conv)
                markAsRead(conv.id)
              }}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${selectedConversation?.id === conv.id ? 'bg-primary-50' : ''
                }`}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <img
                    src={conv.client.avatar}
                    alt={conv.client.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {conv.unread > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {conv.unread}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`font-semibold truncate ${conv.unread > 0 ? 'text-gray-900' : 'text-gray-700'}`}>
                      {conv.client.name}
                    </h3>
                    <span className="text-xs text-gray-400">{conv.time}</span>
                  </div>
                  <p className="text-xs text-primary-600 mb-1">{conv.property}</p>
                  <p className={`text-sm truncate ${conv.unread > 0 ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                    {conv.lastMessage}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {filteredConversations.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p>No messages found</p>
            </div>
          )}
        </div>
      </div>

      {/* Chat Window */}
      {selectedConversation ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedConversation(null)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <img
                src={selectedConversation.client.avatar}
                alt={selectedConversation.client.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900">{selectedConversation.client.name}</h3>
                <p className="text-xs text-gray-500">{selectedConversation.property}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={`mailto:${selectedConversation.client.email}`}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {selectedConversation.messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] ${msg.sender === 'agent' ? 'order-2' : 'order-1'}`}>
                  <div
                    className={`rounded-2xl px-4 py-3 ${msg.sender === 'agent'
                      ? 'bg-primary-500 text-white rounded-br-md'
                      : 'bg-white text-gray-800 shadow-sm rounded-bl-md'
                      }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                  <p className={`text-xs mt-1 ${msg.sender === 'agent' ? 'text-right text-gray-400' : 'text-gray-400'}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Replies */}
          <div className="px-4 py-2 border-t border-gray-100 bg-gray-50">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {[
                'Thank you for your interest!',
                'Would you like to schedule a viewing?',
                'I will get back to you shortly.',
                'Is there anything else you would like to know?'
              ].map((reply, index) => (
                <button
                  key={index}
                  onClick={() => setNewMessage(reply)}
                  className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 whitespace-nowrap hover:bg-gray-100 transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-100 bg-white">
            <div className="flex gap-3">
              <button
                type="button"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="px-4 py-2 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50">
          <div className="text-center">
            <svg className="w-20 h-20 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Select a conversation</h3>
            <p className="text-gray-500">Choose a conversation from the list to start messaging</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Messages
