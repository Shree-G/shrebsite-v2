'use client'

import { useForm, ValidationError } from '@formspree/react'
import { Mail, MessageSquare, Loader } from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'
import { useChatStore } from '@/lib/chat-store'

export default function Contact() {
  const { open } = useChatStore()
  const [state, handleSubmit] = useForm("xyzvedwd")
  const [ref, isInView] = useInView()

  return (
    <section ref={ref} id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
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
                <a href="mailto:shree.hridai@gmail.com" className="text-accent hover:underline text-sm">
                  shree.hridai@gmail.com
                </a>
              </div>

              <div
                className="p-6 border-l-2 border-border cursor-pointer hover:bg-accent/5 transition-colors group"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                  open()
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <MessageSquare className="text-foreground/60 group-hover:text-accent transition-colors" size={20} />
                  <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">Chat</h3>
                </div>
                <p className="text-muted-foreground text-sm">Use the chatbot to ask questions</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass-effect p-8 border border-border">
              {state.succeeded ? (
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
                      required
                      className="w-full bg-input border border-border rounded px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all text-sm"
                      placeholder="Your name"
                    />
                    <ValidationError
                      prefix="Name"
                      field="name"
                      errors={state.errors}
                      className="text-red-500 text-xs mt-1"
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
                      required
                      className="w-full bg-input border border-border rounded px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all text-sm"
                      placeholder="your@email.com"
                    />
                    <ValidationError
                      prefix="Email"
                      field="email"
                      errors={state.errors}
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      className="w-full bg-input border border-border rounded px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all resize-none text-sm"
                      placeholder="Your message..."
                    />
                    <ValidationError
                      prefix="Message"
                      field="message"
                      errors={state.errors}
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="w-full bg-accent text-accent-foreground py-2 rounded font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                  >
                    {state.submitting ? (
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
