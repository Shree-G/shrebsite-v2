'use client'

import { useEffect, useRef, useState } from 'react'

export function useInView(options = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true)
        // Once viewed, we can stop observing if we only want one-time animation
        observer.unobserve(entry.target)
      }
    }, {
      threshold: 0.1,
      ...options
    })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [options])

  return [ref, isInView] as const
}
