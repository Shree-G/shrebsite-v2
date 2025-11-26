'use client'

import { useState } from 'react'
import { useInView } from '@/hooks/use-in-view'

export default function Anecdotes() {
  const [activeAnecdote, setActiveAnecdote] = useState(0)
  const [ref, isInView] = useInView()

  //   const anecdotes = [
  //     {
  //       title: 'The Multiplier Effect',
  //       category: 'Scale',
  //       excerpt: '',
  //       fullStory: `I chose to create software because it is the highest-leverage tool in human history. It is the only medium where a team of five can effectively serve five million. For decades, we scaled logic - automating deterministic tasks. Now, with LLMs, we are scaling reasoning. 

  // This unlocks the ability to decouple "intelligence" from "biological time." Previously, high-quality reasoning - like medical diagnosis, legal counsel, or personalized tutoring - was a scarce resource limited by human hours. By digitizing reasoning, we can deploy personalized expertise to the "long tail" of societal problems that were previously too expensive or complex to address manually.

  // I aim to build the infrastructure that allows this new form of leverage to reach the problems that need it most.`
  //     },
  //     {
  //       title: 'Lowering Barriers',
  //       category: 'Impact',
  //       excerpt: '',
  //       fullStory: `I am fascinated by software's ability to solve complex problems in totality, from start to finish. My favorite case study is the lifecycle of an idea.

  // Before the internet, an idea was geographically bound to your physical social bubble. The internet revolutionized this by solving the distribution problem - lowering the cost of sharing ideas with the world. This effectively democratized access - anyone could publish to the world.

  // Now, AI is solving the creation problem by democratizing execution. It removes the friction between "thought" and "artifact." Advanced voice-to-text captures the raw input; LLMs battle-test the logic; generative pipelines craft the visual narrative. We are witnessing the cost of entry for creation drop to near-zero. It is infectiously exciting to build the systems that will remove these barriers across every other industry.`
  //     },
  //     {
  //       title: 'Software Architecture',
  //       category: 'Effectiveness',
  //       excerpt: '',
  //       fullStory: `I believe there is a profound difference between a "working prototype" and a "production-grade system." The former works under ideal conditions; the latter works under pressure.

  // I approach social problems with the same rigor I apply to high-scale distributed systems. Good intentions are like pseudocode - they set the direction, but actual change requires accounting for scalability (can this help millions?), fault tolerance (what happens when things go wrong?), and maintainability (can this last without me?). 

  // I view software engineering not just as a way to write code, but as a transferrable framework for building social solutions that don't just work once, but work reliably at scale. `
  //     }
  //   ]

  const anecdotes = [
    {
      title: 'The Multiplier Effect',
      category: 'Scale',
      excerpt: 'For decades, we scaled logic. Now, we are scaling reasoning.',
      fullStory: `I chose to build software because it is the only medium where a team of five can effectively serve five million. For decades, we scaled logic - automating deterministic tasks. Now, with LLMs, we are scaling reasoning.

This unlocks the ability to decouple "intelligence" from "biological time." By digitizing reasoning, we can deploy expert level decision making to the "long tail" of problems previously too expensive to address manually.`
    },
    {
      title: 'Democratizing Execution',
      category: 'Impact',
      excerpt: 'The internet solved distribution. AI is solving creation.',
      fullStory: `The internet revolutionized the world by solving the distribution problem - moving bits became free. Now, AI is solving the creation problem - execution is becoming free.

My goal is to remove the friction between "thought" and "artifact." By using LLMs to bridge raw input and final product, we are building systems where the cost of entry for complex solution-building drops to near-zero.`
    },
    {
      title: 'Systemic Leverage',
      category: 'Engineering',
      excerpt: 'Direct intervention is linear. Software systems are exponential.',
      fullStory: `Direct intervention is linear; a well-architected system is exponential. I am drawn to the specific complexity of AI engineering because it requires taming probabilistic models to create reliable infrastructure. 

I focus on the "hard engineering" - latency, context management, and fault tolerance - because building the engine is the only way to solve the problem at a scale that actually matters.`
    }
  ];

  return (
    <section ref={ref} className="px-4 sm:px-6 bg-[#886458] lg:px-0 py-24">


      <div className="max-w-6xl mx-auto">
        <div className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-block mb-8">
            <span className="text-sm font-semibold text-[#f4f3ef] tracking-widest uppercase">Engineering Ethos</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-serif font-bold text-[#f4f3ef] mb-8 leading-tight">
            Why I build AI systems
          </h2>

          {/* <div className="border-l-2 border-accent pl-8 py-6 my-20">
            <p className="text-2xl font-serif text-[#f4f3ef] italic leading-relaxed">
              "Give me a lever long enough and a fulcrum on which to place it, and I shall move the world."
            </p>
            <footer className="text-[#f4f3ef]/80 text-sm mt-4">
              — Archimedes
            </footer>
          </div>

          <p className="text-lg text-[#f4f3ef]/90 mb-12 leading-relaxed">
            There is a common misconception that to be great at your craft, you must sacrifice being good to the world, with the implication that someone who devotes their life to being a master at something often has to sacrifice kindness, loyalty and compassion to get ahead of the curve. However, I reject this notion. I want to be GREAT at being good - I want to become a master at solving systemic issues that plague our communities.
            <br />
            <br />
            Then ... why software and AI?
          </p> */}

          <div className="grid md:grid-cols-3 gap-4 mb-12">
            {anecdotes.map((anecdote, idx) => (
              <button
                key={idx}
                onClick={() => setActiveAnecdote(idx)}
                className={`text-left p-6 border transition-all rounded ${activeAnecdote === idx
                  ? 'border-[#8ccca0] border-2 bg-[#8ccca0]/10'
                  : 'border-[#f4f3ef]/20 hover:border-[#f4f3ef]/40'
                  }`}
              >
                <div className="text-xs font-semibold text-[#f4f3ef] mb-2 uppercase tracking-wider">
                  {anecdote.category}
                </div>
                <h3 className="font-semibold text-[#f4f3ef] text-base">{anecdote.title}</h3>
              </button>
            ))}
          </div>

          <div className="rounded p-8 border border-border">
            <div className="mb-2 text-xs font-semibold text-[#f4f3ef] uppercase tracking-wider">
              {anecdotes[activeAnecdote].category}
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#f4f3ef] mb-4">
              {anecdotes[activeAnecdote].title}
            </h3>
            <p className="text-[#f4f3ef]/90 leading-relaxed whitespace-pre-wrap">
              {anecdotes[activeAnecdote].fullStory}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
