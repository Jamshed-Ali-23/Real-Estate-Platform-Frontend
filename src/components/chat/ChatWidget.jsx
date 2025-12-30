import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { agentConfig } from '../../config/agent'

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `Hi! I'm ${agentConfig.name}. How can I help you with your real estate needs today?`,
      sender: 'agent',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ])

  const handleSend = (e) => {
    e.preventDefault()
    if (!message.trim()) return

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setMessages(prev => [...prev, userMessage])
    setMessage('')

    // Simulate agent response
    setTimeout(() => {
      const responses = [
        "Thanks for reaching out! I'd be happy to help. Could you tell me more about what you're looking for?",
        "Great question! Let me check on that for you. In the meantime, feel free to browse our properties.",
        "I appreciate your interest! Would you like to schedule a viewing or get more information?",
        `You can also reach me directly at ${agentConfig.phone} or ${agentConfig.email}.`,
        "I'll get back to you with more details shortly. Is there anything else you'd like to know?"
      ]
      const agentMessage = {
        id: Date.now() + 1,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'agent',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, agentMessage])
    }, 1000)
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full shadow-lg flex items-center justify-center z-50 hover:shadow-xl transition-shadow"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 left-4 sm:left-auto sm:right-6 sm:w-96 h-[450px] sm:h-[500px] bg-white rounded-2xl shadow-2xl overflow-hidden z-50 flex flex-col max-w-[calc(100vw-2rem)]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-4 flex items-center gap-3">
              <div className="relative">
                <img
                  src={agentConfig.photo}
                  alt={agentConfig.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{agentConfig.name}</h3>
                <p className="text-sm text-white/80">Online • Usually replies instantly</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      msg.sender === 'user'
                        ? 'bg-primary-500 text-white rounded-br-sm'
                        : 'bg-white text-gray-800 shadow-sm rounded-bl-sm'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-white/70' : 'text-gray-400'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {['Schedule a viewing', 'Get property info', 'Contact agent'].map((action) => (
                  <button
                    key={action}
                    onClick={() => setMessage(action)}
                    className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-600 whitespace-nowrap hover:bg-gray-100 transition-colors"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  type="submit"
                  className="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export { ChatWidget }
export default ChatWidget
