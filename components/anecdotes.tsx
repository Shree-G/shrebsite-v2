'use client'

import { useState } from 'react'
import { useInView } from '@/hooks/use-in-view'

export default function Anecdotes() {
  const [activeAnecdote, setActiveAnecdote] = useState(0)
  const [ref, isInView] = useInView()

  const anecdotes = [
    {
      title: 'Tech Obsession',
      category: 'Origin Story',
      excerpt: 'It started with YouTube channels like MKBHD and Linus Tech Tips. I memorized every smartphone spec for 5 years.',
      fullStory: 'I think this all started with me being addicted to youtube channels like Marques Brownlee, Dave2D, Linus Tech Tips and others. I learnt so much about consumer technology that I knew all of the features every smartphone and laptop that came out had for a period of 4-5 years. I still remember coming back home from school and being so excited to watch the youtube livestream of the iPhone 6 launch. My first phone was an LG V20 with a cool secondary screen on top that would show you live activities. (They did dynamic islands before it was cool. Rest peacefully my love LG.)'
    },
    {
      title: 'The "Aha" Moment',
      category: 'Impact',
      excerpt: 'Helping my grandparents send emails made me realize I could use my nerdy knowledge to help people.',
      fullStory: 'Things changed when I realized I could use this nerdy knowledge to help people streamline processes they didn\'t know they could. It was small things like helping my grandparents send emails, or being the point person that family members asked when they had to buy a new device. But that feeling felt addictive, I loved being able to help people with the knowledge I had about the things I loved.'
    },
    {
      title: 'Volunteering',
      category: 'Service',
      excerpt: 'Teaching tech literacy at a rehabilitation center taught me to take things back to the very basics.',
      fullStory: 'Eventually, it turned into volunteering at the local rehabilitation center for recently unhoused people to teach them tech literacy. I expected most of these people to not know how to use advanced tools like Excel or Google Docs, but I soon realized that I neded to take things back to the very basics - starting with basic computer and phone literacy. Most of all, it was heartbreaking how many of these people didn\'t know how many resources they had access to from just their smart phone.'
    }
  ]

  return (
    <section ref={ref} className="px-4 sm:px-6 bg-background lg:px-0 py-0">
      <div className="max-w-6xl mx-auto">
        <div className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-block mb-8">
            <span className="text-sm font-semibold text-accent tracking-widest uppercase">Stories & Lessons</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-8 leading-tight">
            Real moments that shaped my approach
          </h2>

          <p className="text-lg text-foreground/80 mb-12 leading-relaxed">
            Engineering is personal. Here are stories that shaped how I think about building AI systems.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-12">
            {anecdotes.map((anecdote, idx) => (
              <button
                key={idx}
                onClick={() => setActiveAnecdote(idx)}
                className={`text-left p-6 border transition-all rounded ${activeAnecdote === idx
                  ? 'border-accent/50 bg-accent/5'
                  : 'border-border hover:border-accent/30'
                  }`}
              >
                <div className="text-xs font-semibold text-accent mb-2 uppercase tracking-wider">
                  {anecdote.category}
                </div>
                <h3 className="font-semibold text-foreground text-base">{anecdote.title}</h3>
              </button>
            ))}
          </div>

          <div className="glass-effect rounded p-8 border border-border">
            <div className="mb-2 text-xs font-semibold text-accent uppercase tracking-wider">
              {anecdotes[activeAnecdote].category}
            </div>
            <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
              {anecdotes[activeAnecdote].title}
            </h3>
            <p className="text-foreground leading-relaxed whitespace-pre-wrap">
              {anecdotes[activeAnecdote].fullStory}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
