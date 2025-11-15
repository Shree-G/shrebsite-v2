'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Loader } from 'lucide-react'

export default function Hero() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    {
      role: 'assistant',
      content: 'Hey! Ask me about my AI projects, experience, and expertise.'
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [chatScale, setChatScale] = useState(0.95)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return
      
      const rect = heroRef.current.getBoundingClientRect()
      const heroCenter = window.innerHeight / 2
      const distance = Math.abs(rect.top + rect.height / 2 - heroCenter)
      const maxDistance = window.innerHeight
      
      // Scale from 0.95 at top to 1 at center to 0.95 at bottom
      const scale = Math.max(0.95, 1 - (distance / maxDistance) * 0.05)
      setChatScale(scale)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      }).catch(() => null)

      if (response?.ok) {
        const data = await response.json()
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
      } else {
        const fallbackResponses = [
          'That\'s a great question! I\'ve worked extensively on RAG systems and LLM applications. Check my projects section to see what I\'ve built.',
          'I\'m passionate about AI engineering. My expertise spans from prompt engineering to fine-tuning models and building scalable AI infrastructure.',
          'Feel free to explore my work! I\'ve developed several AI-powered applications you might find interesting.',
          'Reach out via email for specific questions or collaboration opportunities!'
        ]
        const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
        setMessages(prev => [...prev, { role: 'assistant', content: randomResponse }])
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again or reach out via email.' }])
    }

    setIsLoading(false)
  }

  return (
    <section 
      ref={heroRef}
      className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute top-24 right-8 w-6 h-6 text-accent/40 animate-pulse">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </div>
      <div className="absolute bottom-32 left-8 w-5 h-5 text-secondary/30 animate-pulse" style={{ animationDelay: '0.5s' }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </div>

      <div className="max-w-5xl mx-auto w-full">
        <div className="text-center mb-12 fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            I Build 
            <span className="text-transparent bg-gradient-to-r from-accent to-secondary bg-clip-text"> AI Systems</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            RAG applications, LLM orchestration, and intelligent AI infrastructure
          </p>
        </div>

        <div 
          className="transition-transform duration-300 ease-out"
          style={{ 
            transform: `scale(${chatScale})`,
            transformOrigin: 'center'
          }}
        >
          <div className="glass-effect rounded-2xl p-6 h-96 md:h-[450px] flex flex-col border border-accent/10 shadow-lg">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-xl text-sm ${
                      msg.role === 'user'
                        ? 'bg-accent text-accent-foreground rounded-br-none'
                        : 'bg-muted text-foreground rounded-bl-none'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted text-foreground px-4 py-2 rounded-xl rounded-bl-none flex items-center gap-2">
                    <Loader size={16} className="animate-spin" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-input border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 text-foreground placeholder-muted-foreground transition-all"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-accent text-accent-foreground p-3 rounded-xl hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                aria-label="Send message"
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
