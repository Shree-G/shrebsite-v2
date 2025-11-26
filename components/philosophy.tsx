'use client'

import { useInView } from '@/hooks/use-in-view'

export default function Philosophy() {
  const [ref, isInView] = useInView()

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-20">
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-8 leading-tight">
              My Philosophy
            </h2>

            <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
              There is a common misconception that to be great at your craft, you must sacrifice being good to the world, with the implication that someone who devotes their life to being a master at something often has to sacrifice kindness, loyalty and compassion to get ahead of the curve. However, I reject this notion. I want to be GREAT at being good - I want to become a master at solving systemic issues that plague our communities.
              <br />
              <br />
              Then ... why software and AI?
            </p>

            <div className="grid md:grid-cols-3 gap-8 mt-4">
              {[
                {
                  title: 'The Multiplier Effect:',
                  description: `I chose software because it is the highest-leverage tool in human history. It is the only medium where a team of five can effectively serve five million. For decades, we scaled _logic_—automating deterministic tasks. Now, with LLMs, we are scaling _reasoning_. 

This unlocks the ability to decouple "intelligence" from "biological time." Previously, high- quality reasoning—like medical diagnosis, legal counsel, or personalized tutoring—was a scarce resource limited by human hours. By digitizing reasoning, we can deploy personalized expertise to the "long tail" of societal problems that were previously too expensive or complex to address manually.

I aim to build the infrastructure that allows this new form of leverage to reach the problems that need it most.`
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
