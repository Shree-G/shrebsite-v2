'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'

const projectsData = [
  {
    id: 1,
    title: 'Personal RAG Chatbot',
    description: 'Full-stack conversational AI chatbot built from scratch using RAG to answer questions about my experience.',
    tags: ['Python', 'Next.js', 'LangChain', 'FastAPI', 'ChromaDB'],
    github: 'https://github.com/Shree-G/shrag',
    live: 'https://shrebsite-v2.vercel.app'
  },
  {
    id: 2,
    title: 'Shrocial Media',
    description: 'Full-stack social media app with real-time feed, secure auth, and mobile-first design.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'WebSockets'],
    github: 'https://github.com/Shree-G/shrocial_media',
    live: 'https://shrocial-media.vercel.app/'
  },
  {
    id: 3,
    title: 'Restaurant Ordering System',
    description: 'Real-time order accuracy system using Raspberry Pi and custom hardware. Won 2nd place in UCSD MVP competition.',
    tags: ['IoT', 'Raspberry Pi', 'React', 'Hardware', 'Real-time'],
    github: 'https://docs.google.com/presentation/d/1-sTj9QGiLtZRVMBctdWr9pBKAUZ4Sr2-bYvnh19LB0g/edit',
    live: 'https://docs.google.com/presentation/d/1-sTj9QGiLtZRVMBctdWr9pBKAUZ4Sr2-bYvnh19LB0g/edit'
  },
  {
    id: 4,
    title: "Shree's Pokédex",
    description: 'Responsive web app to browse and search Pokémon data using the PokeAPI.',
    tags: ['React', 'Vite', 'JavaScript', 'CSS3', 'REST API'],
    github: 'https://github.com/Shree-G/pokedex',
    live: 'https://shreespokedex.netlify.app/'
  },
  {
    id: 5,
    title: 'Social Compass App',
    description: 'Android app to track friends\' location and orientation with built-in messaging.',
    tags: ['Android', 'Java', 'SQL', 'Agile', 'Design Patterns'],
    github: 'https://github.com/CSE-110-Winter-2023/cse-110-project-cse110-team-16/tree/main',
    live: 'https://github.com/CSE-110-Winter-2023/cse-110-project-cse110-team-16/tree/main'
  },
  {
    id: 6,
    title: 'Lambertian Photometric Stereo',
    description: 'ML project implementing photometric stereo to estimate surface normals and albedo.',
    tags: ['Python', 'NumPy', 'Computer Vision', 'Linear Algebra'],
    github: 'https://github.com/Shree-G/Lambertian-Photometric-Stereo',
    live: 'https://github.com/Shree-G/Lambertian-Photometric-Stereo'
  },
  {
    id: 7,
    title: '3D Image Rendering',
    description: 'Rendering 3D images using Lambertian Reflectance Model and convolution operations.',
    tags: ['Python', 'SciPy', 'Computer Vision', '3D Rendering'],
    github: 'https://github.com/Shree-G/3D-Image-Rendering',
    live: 'https://github.com/Shree-G/3D-Image-Rendering'
  },
  {
    id: 8,
    title: 'Image Classification (BoW)',
    description: 'Image classification using Bag of Words model, SIFT features, and KMeans clustering.',
    tags: ['Python', 'OpenCV', 'Scikit-learn', 'Machine Learning'],
    github: 'https://github.com/Shree-G/Image-Classification-using-Bag-of-Words',
    live: 'https://github.com/Shree-G/Image-Classification-using-Bag-of-Words'
  }
]

export default function Projects() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [ref, isInView] = useInView()

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
      setTimeout(checkScroll, 300)
    }
  }

  return (
    <section ref={ref} id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-12">
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-4">
              Selected Work
            </h2>
            <p className="text-base text-muted-foreground">
              Explore my recent AI and full-stack projects
            </p>
          </div>

          {/* Scrollable Projects Container */}
          <div className="relative group">
            {canScrollLeft && (
              <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-foreground text-background p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Scroll left"
              >
                <ChevronLeft size={20} />
              </button>
            )}

            <div
              ref={scrollContainerRef}
              onScroll={checkScroll}
              className="flex gap-6 overflow-x-auto pb-4 px-2 snap-x snap-mandatory scroll-smooth"
              style={{ scrollBehavior: 'smooth' }}
            >
              {projectsData.map((project) => (
                <div
                  key={project.id}
                  className="flex-shrink-0 w-full md:w-96 snap-start glass-effect rounded border border-border p-6 hover:border-accent/40 transition-all hover:shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-foreground mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-muted text-foreground/70 rounded border border-border text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 bg-muted hover:bg-muted/70 text-foreground rounded transition-colors text-sm font-medium"
                    >
                      <Github size={16} />
                      GitHub
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded transition-colors text-sm font-medium"
                    >
                      <ExternalLink size={16} />
                      Live
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {canScrollRight && (
              <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-foreground text-background p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Scroll right"
              >
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
