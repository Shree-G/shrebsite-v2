'use client'

import { useInView } from '@/hooks/use-in-view'

export default function ThinkingSpace() {
  const [ref, isInView] = useInView()

  const thoughts = [
    {
      date: 'November 2024',
      title: 'On the Future of RAG',
      preview: 'RAG systems today are static pipelines. Tomorrow they\'ll be adaptive, learning from each query to improve future retrieval.'
    },
    {
      date: 'October 2024',
      title: 'Why Prompt Engineering Matters',
      preview: 'Prompt engineering isn\'t a band-aid solution—it\'s a fundamental interface between human intent and AI capability.'
    },
    {
      date: 'September 2024',
      title: 'Building for Scale',
      preview: 'The difference between a working prototype and production-ready AI is discipline: monitoring, testing, and humility.'
    }
  ]

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-block mb-8">
            <span className="text-sm font-semibold text-accent tracking-widest uppercase">Thoughts & Insights</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            What I'm thinking about
          </h2>
          
          <p className="text-lg text-muted-foreground mb-12">
            Ideas, observations, and evolving thoughts on AI engineering and technology.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {thoughts.map((thought, idx) => (
              <div
                key={idx}
                className="glass-effect rounded-xl p-6 border border-accent/10 hover:border-accent/30 transition-all hover:bg-accent/5 cursor-pointer group"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="text-xs font-semibold text-secondary mb-3 uppercase tracking-wider">
                  {thought.date}
                </div>
                <h3 className="font-semibold text-foreground mb-3 text-lg group-hover:text-accent transition-colors">
                  {thought.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {thought.preview}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
