'use client'

import { useRef } from 'react'
import { useInView } from '@/hooks/use-in-view'
import { AssistantUiChat } from './chat/assistant-ui-chat'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [sectionRef, isInView] = useInView()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Animation phases:
  // 0-0.3: Initial state (hero visible)
  // 0.3-0.5: Chat grows to full screen
  // 0.5-0.8: Chat stays locked
  // 0.8-1.0: Chat shrinks back

  const scale = useTransform(scrollYProgress, [0.3, 0.5, 0.8, 1], [0.95, 1, 1, 0.95])

  // Theme interpolation
  // Light/Glass -> Dark Mode (#343541 is ChatGPT dark)

  const backgroundColor = useTransform(
    scrollYProgress,
    [0.3, 0.5, 0.8, 1],
    ["rgba(255, 255, 255, 0.5)", "#343541", "#343541", "rgba(255, 255, 255, 0.5)"]
  )

  const foregroundColor = useTransform(
    scrollYProgress,
    [0.3, 0.5, 0.8, 1],
    ["#09090b", "#FFFFFF", "#FFFFFF", "#09090b"]
  )

  const mutedColor = useTransform(
    scrollYProgress,
    [0.3, 0.5, 0.8, 1],
    ["#f4f4f5", "#444654", "#444654", "#f4f4f5"]
  )

  const borderColor = useTransform(
    scrollYProgress,
    [0.3, 0.5, 0.8, 1],
    ["rgba(228, 228, 231, 0.5)", "#565869", "#565869", "rgba(228, 228, 231, 0.5)"]
  )

  const backdropFilter = useTransform(
    scrollYProgress,
    [0.3, 0.5, 0.8, 1],
    ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]
  )

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
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center">
        <section
          id="home"
          ref={sectionRef}
          className="w-full h-full px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative"
        >
          <div className="max-w-4xl mx-auto w-full flex flex-col h-full pt-16 pb-8">
            <div className={`text-center mb-8 transition-all duration-700 flex-shrink-0 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 className="md:text-7xl font-serif text-foreground mb-6 font-normal text-6xl mt-10">
                {renderNameWithLetterAnimation('Shree Gopalakrishnan')}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-light mb-4">
                AI Engineer
              </p>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Building intelligent systems and exploring the frontiers of AI.
              </p>
            </div>

            <motion.div
              className="flex-1 w-full mx-auto relative z-10 overflow-hidden border cursor-pointer"
              onClick={() => {
                if (containerRef.current) {
                  const element = containerRef.current
                  const scrollableDistance = element.scrollHeight - window.innerHeight
                  const targetScroll = element.offsetTop + (scrollableDistance * 0.5)
                  window.scrollTo({
                    top: targetScroll,
                    behavior: 'smooth'
                  })
                }
              }}
              style={{
                scale,
                width: useTransform(scrollYProgress, [0.3, 0.5, 0.8, 1], ["95%", "calc(100% - 40px)", "calc(100% - 40px)", "95%"]),
                borderRadius: "12px",
                backdropFilter,
                backgroundColor,
                borderColor,
                // @ts-ignore
                "--background": backgroundColor,
                "--foreground": foregroundColor,
                "--muted": mutedColor,
                "--border": borderColor,
                "--input": mutedColor,
                color: foregroundColor,
              }}
            >
              <div className="h-full w-full">
                <AssistantUiChat />
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}
