'use client'

import { useInView } from '@/hooks/use-in-view'

export default function ThinkingSpace() {
  const [ref, isInView] = useInView()

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-8 leading-tight">
            Thoughts & Insights
          </h2>

          <p className="text-lg text-foreground/80 mb-12 leading-relaxed">
            Ideas, observations, and evolving thoughts on AI engineering and technology.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                slug: 'welcome-to-my-site',
                date: 'November 2024',
                title: 'Welcome to My Personal Website',
                preview: 'A look into why I built this site, my philosophy on technology, and what you can expect to find here.'
              }
            ].map((thought, idx) => (
              <a
                key={idx}
                href={`/blog/${thought.slug}`}
                className="glass-effect rounded p-6 border border-border hover:border-accent/30 transition-all cursor-pointer group block"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="text-xs font-semibold text-accent mb-3 uppercase tracking-wider">
                  {thought.date}
                </div>
                <h3 className="font-semibold text-foreground mb-3 text-base group-hover:text-accent transition-colors">
                  {thought.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {thought.preview}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
