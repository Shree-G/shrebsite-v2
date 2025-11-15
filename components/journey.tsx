'use client'

export default function Journey() {
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
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="max-w-4xl mx-auto">
        <div className="inline-block mb-8">
          <span className="text-sm font-semibold text-accent tracking-widest uppercase">My Journey</span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-16 leading-tight">
          A timeline of learning and growth
        </h2>

        <div className="space-y-12">
          {milestones.map((milestone, idx) => (
            <div key={idx} className="flex gap-8">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-accent mt-2 relative z-10"></div>
                {idx !== milestones.length - 1 && (
                  <div className="w-1 h-24 bg-gradient-to-b from-accent to-transparent mt-2"></div>
                )}
              </div>
              <div className="pb-8">
                <div className="text-sm font-bold text-accent mb-2 uppercase tracking-wider">{milestone.year}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{milestone.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
