'use client'

import { useInView } from '@/hooks/use-in-view'

export default function Journey() {
  const [ref, isInView] = useInView()

  const milestones = [
    {
      year: '2020',
      title: 'First AI Project',
      description: 'Started exploring ML fundamentals and built my first classifier. Learned that most of ML is data preparation.'
    },
    {
      year: '2021',
      title: 'RAG Discovery',
      description: 'Discovered retrieval-augmented generation and realized how to make LLMs actually useful for specific domains.'
    },
    {
      year: '2022',
      title: 'Production Deployment',
      description: 'Deployed first LLM-powered application to production. Learned about latency, cost, and the gap between research and practice.'
    },
    {
      year: '2023',
      title: 'Fine-tuning Mastery',
      description: 'Developed expertise in fine-tuning techniques, learning when and how to adapt models for specific use cases.'
    },
    {
      year: '2024',
      title: 'Full-Stack AI Engineering',
      description: 'Now building end-to-end AI systems from data pipeline to deployment, focusing on production-grade reliability.'
    }
  ]

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-16 leading-tight">
            A Timeline of Learning
          </h2>

          <div className="space-y-12">
            {milestones.map((milestone, idx) => (
              <div 
                key={idx} 
                className="flex gap-8 pb-8 border-b border-border last:border-0"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="flex flex-col items-center min-w-fit">
                  <div className="w-3 h-3 rounded-full bg-accent"></div>
                  {idx !== milestones.length - 1 && (
                    <div className="w-0.5 h-20 bg-border mt-4"></div>
                  )}
                </div>
                <div className="pb-0">
                  <div className="text-xs font-bold text-accent mb-2 uppercase tracking-wider">{milestone.year}</div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{milestone.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
