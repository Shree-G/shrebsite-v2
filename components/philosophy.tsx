'use client'

import { useInView } from '@/hooks/use-in-view'

export default function Philosophy() {
  const [ref, isInView] = useInView()

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-20">
            <div className="inline-block mb-8">
              <span className="text-sm font-semibold text-accent tracking-widest uppercase">My Philosophy</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 leading-tight">
              Building AI that <span className="text-transparent bg-gradient-to-r from-accent to-secondary bg-clip-text">thinks with intention</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              I believe the future of AI isn't just about building bigger models or more data—it's about building systems that understand nuance, context, and human intent. Every system I build is designed with three principles in mind.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  title: 'Intentional Design',
                  description: 'AI should amplify human capability, not replace human judgment. Every architectural decision is made with purpose.'
                },
                {
                  title: 'Transparent Systems',
                  description: 'Explainability matters. I build AI systems where you understand why decisions are made, not just what they are.'
                },
                {
                  title: 'Continuous Learning',
                  description: 'The field evolves daily. I stay ahead by experimenting, failing fast, and learning from each iteration.'
                }
              ].map((principle, idx) => (
                <div 
                  key={idx} 
                  className={`glass-effect rounded-2xl p-8 border border-accent/10 hover:border-accent/30 transition-all delay-${idx * 100}`}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <h3 className="text-xl font-semibold text-foreground mb-4">{principle.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-effect rounded-2xl p-12 border border-accent/20 my-20">
            <blockquote className="text-center">
              <p className="text-2xl md:text-3xl font-light text-foreground italic mb-6">
                "The best algorithms are the ones that know their limitations."
              </p>
              <footer className="text-muted-foreground">
                — A lesson learned in production
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
