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
              I love deeply understanding a system to the extent where I understand how every single piece fits together. But if there's one thing I really want to devote my life to, it's to help disadvantaged people solve problems with technology.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  title: 'Problem Solving',
                  description: 'I love solving challenging problems or cracking difficult bugs and understanding exactly why the bug actually took place.'
                },
                {
                  title: 'Efficiency',
                  description: 'I love building systems that streamline and make processes efficient.'
                },
                {
                  title: 'Impact',
                  description: 'I want to use my skills to create products that actively help people, whether through entrepreneurship or impactful roles.'
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
              "I realized I could use this nerdy knowledge to help people streamline processes they didn't know they could."
            </p>
            <footer className="text-muted-foreground text-sm mt-4">
              — Shree Gopalakrishnan
            </footer>
          </div>
        </div>
      </div>
    </section>
  )
}
