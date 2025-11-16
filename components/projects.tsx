'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'

const projectsData = [
  {
    id: 1,
    title: 'Intelligent Document Retriever',
    description: 'RAG system for enterprise document analysis with semantic search',
    tags: ['Python', 'LangChain', 'Pinecone', 'FastAPI'],
    github: 'https://github.com',
    live: 'https://example.com'
  },
  {
    id: 2,
    title: 'LLM Fine-tuning Pipeline',
    description: 'Automated pipeline for fine-tuning open-source LLMs on custom datasets',
    tags: ['PyTorch', 'Transformers', 'Hugging Face', 'AWS'],
    github: 'https://github.com',
    live: 'https://example.com'
  },
  {
    id: 3,
    title: 'Real-time Chat Analytics',
    description: 'Dashboard for analyzing conversation patterns and sentiment',
    tags: ['React', 'Node.js', 'WebSocket', 'PostgreSQL'],
    github: 'https://github.com',
    live: 'https://example.com'
  },
  {
    id: 4,
    title: 'AI-Powered Code Review',
    description: 'Automated code review assistant using GPT-4 with context awareness',
    tags: ['Python', 'GitHub API', 'OpenAI', 'Flask'],
    github: 'https://github.com',
    live: 'https://example.com'
  },
  {
    id: 5,
    title: 'Vector Database Optimizer',
    description: 'Tool for optimizing vector embeddings and improving search performance',
    tags: ['Python', 'NumPy', 'Faiss', 'Scikit-learn'],
    github: 'https://github.com',
    live: 'https://example.com'
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
      <div className="max-w-7xl mx-auto">
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
