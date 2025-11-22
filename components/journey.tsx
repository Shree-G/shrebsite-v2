'use client'

import { useInView } from '@/hooks/use-in-view'

export default function Journey() {
  const [ref, isInView] = useInView()

  const milestones = [
    {
      year: '2020',
      title: 'Started at UCSD',
      description: 'Began my journey at the University of California, San Diego, majoring in Computer Science. Started exploring ML fundamentals.'
    },
    {
      year: '2022',
      title: 'Software Engineering Intern',
      description: 'Gained industry experience building production-grade applications and learning about the gap between research and practice.'
    },
    {
      year: '2023',
      title: 'Machine Learning Intern',
      description: 'Deepened expertise in fine-tuning techniques and RAG systems, working on real-world AI challenges.'
    },
    {
      year: '2024',
      title: 'Graduated from UCSD',
      description: 'Earned my Bachelor\'s degree in Computer Science, capping off 4 years of intense learning and building.'
    },
    {
      year: '2024 - Present',
      title: 'Full Stack Engineer @ iFrog',
      description: 'Joined iFrog Marketing Solutions as a Full Stack Software Engineer, building end-to-end AI systems and web applications.'
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
