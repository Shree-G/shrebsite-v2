'use client'

import { useState } from 'react'

export default function Anecdotes() {
  const [activeAnecdote, setActiveAnecdote] = useState(0)

  const anecdotes = [
    {
      title: 'The 3AM Breakthrough',
      category: 'Engineering',
      excerpt: 'I spent weeks optimizing a RAG pipeline before realizing the bottleneck wasn\'t algorithmic—it was architectural. Sometimes the best solutions come from stepping back.',
      fullStory: 'I was working on a retrieval system for a research platform when I hit a wall. The retrieval latency was unacceptable. I started down the path of complex indexing optimizations, vector compression, everything. At 3AM (yes, really), I realized I was searching across the wrong documents entirely. The problem wasn\'t the retrieval speed—it was the data organization. After restructuring the knowledge base, response times dropped 10x. It taught me that understanding the problem is more important than optimizing the solution.'
    },
    {
      title: 'When the Model Surprised Me',
      category: 'AI/ML',
      excerpt: 'Fine-tuning a model on domain-specific data, I discovered it had learned patterns I never explicitly taught. The emergence was both humbling and fascinating.',
      fullStory: 'While fine-tuning a model for technical documentation, something unexpected happened. The model started generating not just accurate answers, but helpful context I never trained it to provide. It had learned to recognize when users needed background information. This moment shifted how I think about AI systems—they don\'t just follow instructions, they learn underlying patterns. It\'s a reminder to build with curiosity and remain open to what the system teaches you.'
    },
    {
      title: 'Deploying to Production',
      category: 'Lessons',
      excerpt: 'Building in isolation is comfortable. Deploying at scale is humbling. My first production system taught me more than months of development.',
      fullStory: 'The first AI system I deployed to real users was terrifying. I thought I\'d tested everything. I hadn\'t. Real-world data is messier, user patterns are weirder, and edge cases are everywhere. That experience forced me to build more robust systems, implement better monitoring, and stay humble about what I don\'t know. Every deployment since has been an exercise in empathy—building for the user who will find the edge case.'
    }
  ]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="inline-block mb-8">
          <span className="text-sm font-semibold text-accent tracking-widest uppercase">Stories & Lessons</span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
          Real moments that shaped my approach
        </h2>
        
        <p className="text-lg text-muted-foreground mb-12">
          Engineering is personal. Here are stories that shaped how I think about building AI systems.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {anecdotes.map((anecdote, idx) => (
            <button
              key={idx}
              onClick={() => setActiveAnecdote(idx)}
              className={`text-left p-6 rounded-xl border transition-all ${
                activeAnecdote === idx
                  ? 'glass-effect border-accent/50 bg-accent/5'
                  : 'border-border hover:border-accent/20 hover:bg-muted/30'
              }`}
            >
              <div className="text-xs font-semibold text-accent mb-2 uppercase tracking-wider">
                {anecdote.category}
              </div>
              <h3 className="font-semibold text-foreground text-lg">{anecdote.title}</h3>
            </button>
          ))}
        </div>

        <div className="glass-effect rounded-2xl p-10 border border-accent/10">
          <div className="mb-2 text-xs font-semibold text-accent uppercase tracking-wider">
            {anecdotes[activeAnecdote].category}
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-4">
            {anecdotes[activeAnecdote].title}
          </h3>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
            {anecdotes[activeAnecdote].fullStory}
          </p>
        </div>
      </div>
    </section>
  )
}
