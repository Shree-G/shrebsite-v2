'use client'

import { useInView } from '@/hooks/use-in-view'

export default function Journey() {
  const [ref, isInView] = useInView()

  const milestones = [
    {
      year: '2021',
      title: 'Started at UCSD',
      description: 'Began my journey at the University of California, San Diego, majoring in Computer Science.'
    },
    {
      year: '2022',
      title: 'Machine Learning Internship',
      description: 'Built a KNN-based resume classifier, that classified over 450+ resumes (and counting!) into best-fit jobs.'
    },
    {
      year: '2024',
      title: 'Machine Learning Internship',
      description: 'Built a weekly call volume forecaster, achieving 9% MAPE to improve staffing decisions for 500+ support agents.'
    },
    {
      year: '2024',
      title: 'Software Engineering Internship',
      description: 'Architected 15+ relational schemas and refactored 10+ front end components for NoSQL to PostgreSQL migration.'
    },
    {
      year: '2025',
      title: 'Graduated from UCSD!',
      description: 'Graduated from UCSD as a computer science major!'
    },
    {
      year: '2025 - Present',
      title: 'Full Stack Engineer @ iFrog',
      description: 'Joined iFrog Marketing Solutions as a Full Stack Software Engineer, building end-to-end AI systems and web applications.'
    }
  ]

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(to bottom, rgba(244, 243, 239, 0.3), rgba(244, 243, 239, 0.1))' }}>
      <div className="max-w-6xl mx-auto">
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
                  <div className={`w-3 h-3 rounded-full ${idx % 2 === 0 ? 'bg-[#8ccca0]' : 'bg-[#886458]'}`}></div>
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
        {/* Decorative Separator */}
        <div className="section-separator mt-12"></div>
      </div>
    </section>
  )
}
