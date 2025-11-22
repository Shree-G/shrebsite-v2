'use client'

import { useInView } from '@/hooks/use-in-view'
import { useChatStore } from '@/lib/chat-store'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Github, Linkedin } from 'lucide-react'
import { AssistantUiChat } from './chat/assistant-ui-chat'

export default function Hero() {
  const [sectionRef, isInView] = useInView()
  const { isOpen, open, close } = useChatStore()

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
    <div className="relative min-h-screen flex items-center">
      <section
        id="home"
        ref={sectionRef}
        className="w-full py-20 md:py-0"
      >
        <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Column: Bio & Info */}
            <div className={`flex flex-col items-start space-y-8 transition-all duration-700 delay-100 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>

              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground tracking-tight break-words">
                  Shree<br />Gopalakrishnan
                </h1>
                <p className="text-lg md:text-xl text-accent font-medium">
                  Full Stack Software Engineer
                </p>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Hi! I'm Shree Gopalakrishnan. If I had to summarize the reasons I do what I do, it would be because I love solving complex problems to actively help people. I love building systems that streamline and make processes efficient. I love solving challenging problems or cracking difficult bugs and understanding exactly why the bug actually took place.
              </p>

              <div className="flex items-center gap-4 pt-2">
                <a
                  href="https://github.com/Shree-G"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-muted hover:bg-accent/10 hover:text-accent transition-colors"
                >
                  <Github size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/in/shree-gopalakrishnan-4b2427214/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-muted hover:bg-accent/10 hover:text-accent transition-colors"
                >
                  <Linkedin size={24} />
                </a>
              </div>
            </div>

            {/* Right Column: Persistent Chat */}
            <div className={`relative w-full flex justify-center h-[500px] transition-all duration-700 delay-300 ${isInView ? 'opacity-100 transform-none' : 'opacity-0 translate-x-8'}`}>
              <motion.div
                layout
                className={`bg-background border border-border shadow-2xl overflow-hidden ${isOpen
                  ? 'fixed inset-4 z-50 rounded-xl md:inset-10'
                  : 'relative w-full max-w-[400px] h-full rounded-xl cursor-pointer hover:shadow-xl transition-shadow'
                  }`}
                onClick={() => !isOpen && open()}
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <AnimatePresence>
                  {isOpen && (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        close()
                      }}
                      className="absolute top-4 right-4 z-50 p-2 bg-background/50 hover:bg-accent hover:text-accent-foreground rounded-full transition-colors backdrop-blur-sm"
                    >
                      <X size={20} />
                    </motion.button>
                  )}
                </AnimatePresence>

                <div className={`w-full h-full ${!isOpen && 'pointer-events-none'}`}>
                  <AssistantUiChat />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
