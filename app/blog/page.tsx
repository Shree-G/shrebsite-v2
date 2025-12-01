import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Link from 'next/link'

const blogPosts = [
  {
    id: 1,
    title: 'Building "Shrag": From Concept to a Production-Grade Personal RAG Chatbot',
    excerpt: 'The engineering journey of building a full-stack Retrieval-Augmented Generation (RAG) system, from a blank Python script to a production deployment.',
    date: 'December 1, 2024',
    author: 'Shree Gopalakrishnan',
    readTime: '8 min read',
    category: 'Engineering',
    slug: 'building-shrag'
  },
  {
    id: 2,
    title: 'Welcome to My Personal Website',
    excerpt: 'A look into why I built this site, my philosophy on technology, and what you can expect to find here.',
    date: 'November 21, 2024',
    author: 'Shree Gopalakrishnan',
    readTime: '2 min read',
    category: 'Personal',
    slug: 'welcome-to-my-site'
  }
]

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-4">
              Articles & Insights
            </h1>
            <p className="text-lg text-foreground/80">
              Exploring AI engineering, LLMs, and building intelligent systems
            </p>
          </div>

          <div className="space-y-4">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <article className="glass-effect rounded p-6 md:p-8 border border-border hover:border-accent/30 transition-all group cursor-pointer">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="text-xl md:text-2xl font-semibold text-foreground group-hover:text-accent transition-colors mb-3">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground line-clamp-2 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 text-sm">
                        <span className="px-3 py-1 bg-accent/10 text-accent rounded border border-accent/20">
                          {post.category}
                        </span>
                        <span className="text-muted-foreground">{post.date}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
