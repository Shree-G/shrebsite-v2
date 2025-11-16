'use client'

import { useState } from 'react'
import { Mail, MessageSquare, Loader } from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [ref, isInView] = useInView()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      }).catch(() => null)

      if (response?.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setSubmitted(false), 5000)
      } else {
        window.location.href = `mailto:your-email@example.com?subject=Message from ${formData.name}&body=${formData.message}`
      }
    } catch (error) {
      window.location.href = `mailto:your-email@example.com?subject=Message from ${formData.name}&body=${formData.message}`
    }

    setIsLoading(false)
  }

  return (
    <section ref={ref} id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-12">
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-4">
              Let's Connect
            </h2>
            <p className="text-base text-muted-foreground">
              Have a project in mind? Send me a message or reach out directly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="p-6 border-l-2 border-accent">
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="text-accent" size={20} />
                  <h3 className="font-semibold text-foreground">Email</h3>
                </div>
                <a href="mailto:your-email@example.com" className="text-accent hover:underline text-sm">
                  your-email@example.com
                </a>
              </div>

              <div className="p-6 border-l-2 border-border">
                <div className="flex items-center gap-3 mb-2">
                  <MessageSquare className="text-foreground/60" size={20} />
                  <h3 className="font-semibold text-foreground">Chat</h3>
                </div>
                <p className="text-muted-foreground text-sm">Use the chatbot to ask questions</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass-effect p-8 border border-border">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="text-accent mb-4 text-4xl">✓</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground text-sm">Thanks for reaching out.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-input border border-border rounded px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all text-sm"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-input border border-border rounded px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all text-sm"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full bg-input border border-border rounded px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all resize-none text-sm"
                      placeholder="Your message..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-accent text-accent-foreground py-2 rounded font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                  >
                    {isLoading ? (
                      <>
                        <Loader size={16} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
