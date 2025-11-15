import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Link from 'next/link'

const blogPosts = [
  {
    id: 1,
    title: 'Building Effective RAG Systems in Production',
    excerpt: 'Learn best practices for building retrieval-augmented generation systems that scale and perform reliably in production environments.',
    date: 'November 15, 2024',
    author: 'AI Engineer',
    readTime: '8 min read',
    category: 'AI/ML',
    slug: 'building-effective-rag-systems'
  },
  {
    id: 2,
    title: 'LLM Fine-tuning: From Theory to Practice',
    excerpt: 'A comprehensive guide to fine-tuning large language models on custom datasets, including practical tips and common pitfalls.',
    date: 'November 10, 2024',
    author: 'AI Engineer',
    readTime: '12 min read',
    category: 'AI/ML',
    slug: 'llm-fine-tuning-guide'
  },
  {
    id: 3,
    title: 'Vector Databases and Semantic Search',
    excerpt: 'Understanding vector embeddings, similarity search, and how to optimize your vector database for production use cases.',
    date: 'November 5, 2024',
    author: 'AI Engineer',
    readTime: '10 min read',
    category: 'AI/ML',
    slug: 'vector-databases-guide'
  },
  {
    id: 4,
    title: 'Prompt Engineering Techniques That Work',
    excerpt: 'Practical prompt engineering strategies to get better results from language models, with real-world examples.',
    date: 'October 28, 2024',
    author: 'AI Engineer',
    readTime: '7 min read',
    category: 'AI/ML',
    slug: 'prompt-engineering-techniques'
  }
]

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4">
              Articles & Insights
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Exploring AI engineering, LLMs, and building intelligent systems
            </p>
          </div>

          <div className="space-y-4">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <article className="glass-effect rounded-2xl p-6 md:p-8 border border-accent/10 hover:border-accent/30 transition-all group cursor-pointer">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="text-xl md:text-2xl font-semibold text-foreground group-hover:text-accent transition-colors mb-3">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground line-clamp-2 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 text-sm">
                        <span className="px-3 py-1 bg-accent/10 text-accent rounded-lg border border-accent/20">
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
