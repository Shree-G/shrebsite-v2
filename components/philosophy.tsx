'use client'

import { useInView } from '@/hooks/use-in-view'

export default function Philosophy() {
  const [ref, isInView] = useInView()

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-20">
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-8 leading-tight">
              My Philosophy
            </h2>
            
            <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
              I believe the future of AI isn't just about building bigger models or more data—it's about building systems that understand nuance, context, and human intent. Every system I build is designed with intentionality and precision.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  title: 'Intentional Design',
                  description: 'AI should amplify human capability, not replace human judgment.'
                },
                {
                  title: 'Transparent Systems',
                  description: 'Explainability matters. I build systems where decisions are understood, not just made.'
                },
                {
                  title: 'Continuous Learning',
                  description: 'The field evolves daily. I experiment, fail, and learn from each iteration.'
                }
              ].map((principle, idx) => (
                <div 
                  key={idx} 
                  className={`p-8 border-b border-border pb-8 transition-all delay-${idx * 100}`}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <h3 className="text-lg font-semibold text-foreground mb-3">{principle.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-l-2 border-accent pl-8 py-6 my-20">
            <p className="text-2xl font-serif text-foreground italic leading-relaxed">
              "The best algorithms are the ones that know their limitations."
            </p>
            <footer className="text-muted-foreground text-sm mt-4">
              — A lesson learned in production
            </footer>
          </div>
        </div>
      </div>
    </section>
  )
}
