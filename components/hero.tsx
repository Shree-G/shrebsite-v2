'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Loader } from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'

export default function Hero() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    {
      role: 'assistant',
      content: 'Hi! I\'m Shree\'s AI assistant. Ask me about my experience, projects, or background. What would you like to know?'
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [chatScale, setChatScale] = useState(0.95)
  const [chatWidth, setChatWidth] = useState(95)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const [sectionRef, isInView] = useInView()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current || !chatContainerRef.current) return
      
      const rect = heroRef.current.getBoundingClientRect()
      const chatRect = chatContainerRef.current.getBoundingClientRect()
      const heroCenter = window.innerHeight / 2
      const distance = Math.abs(rect.top + rect.height / 2 - heroCenter)
      const maxDistance = window.innerHeight
      
      const scale = Math.max(0.95, 1 - (distance / maxDistance) * 0.05)
      setChatScale(scale)
      
      const chatCenterDistance = Math.abs(chatRect.top + chatRect.height / 2 - heroCenter)
      const maxChatDistance = window.innerHeight * 1.5
      const width = Math.min(100, 95 + ((maxChatDistance - chatCenterDistance) / maxChatDistance) * 5)
      setChatWidth(width)
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
          'I\'ve worked extensively on RAG systems and LLM applications. Feel free to check out my projects.',
          'I specialize in building AI-powered solutions and machine learning systems for real-world problems.',
          'Explore my portfolio to see the projects I\'ve developed in AI and full-stack engineering.',
          'For specific questions, you can reach out via email directly. I\'d love to chat!'
        ]
        const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
        setMessages(prev => [...prev, { role: 'assistant', content: randomResponse }])
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Please try again or reach out via email.' }])
    }

    setIsLoading(false)
  }

  const renderNameWithLetterAnimation = (name: string) => {
    return name.split('').map((letter, index) => (
      <span
        key={index}
        className={`letter-animate ${letter === ' ' ? 'w-4' : ''}`}
        style={{
          animationDelay: `${index * 0.05}s`,
          display: 'inline-block'
        }}
      >
        {letter}
      </span>
    ))
  }

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen pt-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto w-full">
        <div className={`text-center mb-16 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="md:text-7xl font-serif text-foreground mb-6 font-normal text-6xl mt-20">
            {renderNameWithLetterAnimation('Shree Gopalakrishnan')}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light mb-6">
            AI Engineer
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Building intelligent systems and exploring the frontiers of AI.
          </p>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto mt-6 leading-relaxed">
            Welcome to my portfolio. I specialize in building AI-powered solutions, machine learning systems, and cutting-edge applications that solve real-world problems.
          </p>
        </div>

        <div 
          ref={chatContainerRef}
          className="transition-transform duration-300 ease-out mb-12"
          style={{ 
            transform: `scale(${chatScale})`,
            transformOrigin: 'center',
            width: `${chatWidth}%`,
            margin: '0 auto'
          }}
        >
          <div className="glass-effect rounded-md p-6 h-80 md:h-96 flex flex-col border border-border shadow-sm">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded text-sm ${
                      msg.role === 'user'
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted text-foreground px-4 py-2 rounded flex items-center gap-2">
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
                className="flex-1 bg-input border border-border rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 text-foreground placeholder-muted-foreground transition-all"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-accent text-accent-foreground p-3 rounded hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
