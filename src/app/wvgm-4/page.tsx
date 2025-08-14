'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Plus, Trash2, Bot, User, Loader2, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface Chat {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

export default function WVGM4Page() {
  const [chats, setChats] = useState<Chat[]>([])
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Load chats from localStorage on mount
  useEffect(() => {
    const savedChats = localStorage.getItem('wvgm4-chats')
    if (savedChats) {
      const parsedChats = JSON.parse(savedChats)
      setChats(parsedChats)
      if (parsedChats.length > 0 && !currentChatId) {
        setCurrentChatId(parsedChats[0].id)
      }
    } else {
      // Create initial chat if no chats exist
      createNewChat()
    }
  }, [])

  // Save chats to localStorage whenever they change
  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem('wvgm4-chats', JSON.stringify(chats))
    }
  }, [chats])

  // Auto-scroll to bottom of messages
  useEffect(() => {
    scrollToBottom()
  }, [chats, currentChatId])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const currentChat = chats.find(chat => chat.id === currentChatId)

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'New Conversation',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }
    setChats(prev => [newChat, ...prev])
    setCurrentChatId(newChat.id)
    setInputMessage('')
  }

  const deleteChat = (chatId: string) => {
    setChats(prev => prev.filter(chat => chat.id !== chatId))
    if (currentChatId === chatId) {
      const remainingChats = chats.filter(chat => chat.id !== chatId)
      if (remainingChats.length > 0) {
        setCurrentChatId(remainingChats[0].id)
      } else {
        createNewChat()
      }
    }
  }

  const generateChatTitle = (firstMessage: string) => {
    // Take first 30 characters of the message as title
    return firstMessage.length > 30 
      ? firstMessage.substring(0, 30) + '...' 
      : firstMessage
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || !currentChat || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    }

    // Update chat title if it's the first message
    const isFirstMessage = currentChat.messages.length === 0
    
    // Add user message to current chat
    setChats(prev => prev.map(chat => {
      if (chat.id === currentChatId) {
        return {
          ...chat,
          messages: [...chat.messages, userMessage],
          title: isFirstMessage ? generateChatTitle(inputMessage.trim()) : chat.title,
          updatedAt: new Date()
        }
      }
      return chat
    }))

    setInputMessage('')
    setIsLoading(true)

    try {
      // Call API endpoint
      const response = await fetch('/api/wvgm-4', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [...currentChat.messages, userMessage].map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      }

      // Add assistant message to current chat
      setChats(prev => prev.map(chat => {
        if (chat.id === currentChatId) {
          return {
            ...chat,
            messages: [...chat.messages, assistantMessage],
            updatedAt: new Date()
          }
        }
        return chat
      }))
    } catch (error) {
      console.error('Error sending message:', error)
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I encountered an error processing your request. Please try again later.',
        timestamp: new Date()
      }

      setChats(prev => prev.map(chat => {
        if (chat.id === currentChatId) {
          return {
            ...chat,
            messages: [...chat.messages, errorMessage],
            updatedAt: new Date()
          }
        }
        return chat
      }))
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-gradient-to-b from-ivory to-white">
      <div className="flex h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)]">
        {/* Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="w-64 bg-white border-r border-charcoal/10 flex flex-col"
            >
              {/* Sidebar Header */}
              <div className="p-4 border-b border-charcoal/10">
                <button
                  onClick={createNewChat}
                  className="w-full flex items-center justify-center space-x-2 bg-steel-blue text-white px-4 py-2 rounded-lg hover:bg-cyber-teal smooth-transition"
                >
                  <Plus className="w-5 h-5" />
                  <span>New Chat</span>
                </button>
              </div>

              {/* Chat List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {chats.map(chat => (
                  <div
                    key={chat.id}
                    className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer smooth-transition ${
                      currentChatId === chat.id 
                        ? 'bg-steel-blue/10 border border-steel-blue/30' 
                        : 'hover:bg-charcoal/5'
                    }`}
                    onClick={() => setCurrentChatId(chat.id)}
                  >
                    <div className="flex-1 truncate">
                      <p className="text-sm font-medium text-charcoal truncate">
                        {chat.title}
                      </p>
                      <p className="text-xs text-charcoal/50">
                        {chat.messages.length} messages
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteChat(chat.id)
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded smooth-transition"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Sidebar Footer */}
              <div className="p-4 border-t border-charcoal/10">
                <div className="text-xs text-charcoal/50 text-center">
                  WVGM-4 Reformed AI<br />
                  Powered by Biblical Truth
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="bg-white border-b border-charcoal/10 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 hover:bg-charcoal/5 rounded-lg smooth-transition"
              >
                {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <div>
                <h1 className="text-xl font-serif text-charcoal">WVGM-4: Whiddon Valley Generative Model</h1>
                <p className="text-sm text-charcoal/60">Reformed AI Assistant • Presuppositional Apologetics</p>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4">
            {currentChat && currentChat.messages.length === 0 && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center max-w-2xl">
                  <div className="w-20 h-20 bg-gradient-to-br from-steel-blue/20 to-cyber-teal/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Bot className="w-10 h-10 text-steel-blue" />
                  </div>
                  <h2 className="text-2xl font-serif text-charcoal mb-4">
                    Welcome to WVGM-4
                  </h2>
                  <p className="text-charcoal/70 mb-6">
                    The world's first Reformed presuppositional AI model. Ask questions about theology, 
                    scripture, church history, or seek biblical guidance. All responses are grounded in 
                    Reformed theology and the 1689 Baptist Confession.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                    <div className="glass-effect rounded-xl p-4">
                      <h3 className="font-semibold text-charcoal mb-1">📖 Biblical Questions</h3>
                      <p className="text-sm text-charcoal/60">Exegesis, hermeneutics, biblical theology</p>
                    </div>
                    <div className="glass-effect rounded-xl p-4">
                      <h3 className="font-semibold text-charcoal mb-1">⛪ Church History</h3>
                      <p className="text-sm text-charcoal/60">Reformation, Baptist heritage, theologians</p>
                    </div>
                    <div className="glass-effect rounded-xl p-4">
                      <h3 className="font-semibold text-charcoal mb-1">🎓 Reformed Theology</h3>
                      <p className="text-sm text-charcoal/60">Doctrines of grace, covenant theology</p>
                    </div>
                    <div className="glass-effect rounded-xl p-4">
                      <h3 className="font-semibold text-charcoal mb-1">💭 Apologetics</h3>
                      <p className="text-sm text-charcoal/60">Presuppositional defense of the faith</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentChat && currentChat.messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
              >
                <div className={`flex max-w-3xl ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === 'user' 
                      ? 'bg-steel-blue text-white ml-3' 
                      : 'bg-sage/30 text-charcoal mr-3'
                  }`}>
                    {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`px-4 py-3 rounded-2xl ${
                    message.role === 'user' 
                      ? 'bg-steel-blue text-white' 
                      : 'bg-white border border-charcoal/10'
                  }`}>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <p className={`text-xs mt-2 ${
                      message.role === 'user' ? 'text-white/70' : 'text-charcoal/40'
                    }`}>
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start mb-4"
              >
                <div className="flex max-w-3xl">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sage/30 flex items-center justify-center mr-3">
                    <Bot className="w-4 h-4 text-charcoal" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-white border border-charcoal/10">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin text-steel-blue" />
                      <span className="text-charcoal/60">Thinking biblically...</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-charcoal/10 bg-white p-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex space-x-3">
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask a question about theology, scripture, or seek biblical guidance..."
                  className="flex-1 resize-none rounded-xl border border-charcoal/20 px-4 py-3 focus:outline-none focus:border-steel-blue smooth-transition"
                  rows={1}
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className={`px-4 py-3 rounded-xl smooth-transition flex items-center justify-center ${
                    inputMessage.trim() && !isLoading
                      ? 'bg-steel-blue text-white hover:bg-cyber-teal' 
                      : 'bg-charcoal/10 text-charcoal/30 cursor-not-allowed'
                  }`}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>
              <p className="text-xs text-charcoal/40 mt-2 text-center">
                WVGM-4 presupposes the truth of Scripture and answers from a Reformed Baptist perspective
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}