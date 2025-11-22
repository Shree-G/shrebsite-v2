import ReactMarkdown from 'react-markdown'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Link from 'next/link'

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const blogContent = {
    'welcome-to-my-site': {
      title: 'Welcome to My Personal Website',
      date: 'November 21, 2024',
      author: 'Shree Gopalakrishnan',
      readTime: '2 min read',
      category: 'Personal',
      content: `
Welcome to my personal corner of the internet! I'm Shree Gopalakrishnan, a Full Stack Software Engineer with a passion for building systems that help people.

## About This Site

This website is a reflection of my work, my philosophy, and my journey in tech. I built it to showcase not just what I can do, but why I do it.

### The Chatbot

You might have noticed the chatbot on the home page. That's "Shrag" (Shree's RAG), a custom-built AI assistant that knows all about my professional background. Feel free to ask it anything about my projects, skills, or experience!

## My Focus

I'm currently working as a Full Stack Software Engineer at iFrog Marketing Solutions. My recent work involves everything from AI engineering to full-stack web development.

## Get in Touch

I'm always open to connecting with fellow developers, potential collaborators, or anyone interested in technology. Feel free to reach out via LinkedIn or check out my code on GitHub.

Thanks for stopping by!
      `
    }
  }

  const post = blogContent[slug as keyof typeof blogContent] || {
    title: 'Post not found',
    date: 'N/A',
    author: 'N/A',
    readTime: 'N/A',
    category: 'N/A',
    content: 'This blog post could not be found.'
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-3xl mx-auto">
          {/* Back Link */}
          <Link href="/blog" className="inline-flex items-center text-accent hover:text-secondary transition-colors mb-8 text-sm font-medium">
            ← Back to Blog
          </Link>

          <article className="space-y-8">
            <div className="space-y-6 mb-12">
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-b border-border pb-6">
                <span className="px-3 py-1 bg-accent/10 text-accent rounded border border-accent/20 font-medium">
                  {post.category}
                </span>
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.author}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-serif prose-headings:font-bold prose-a:text-accent prose-a:no-underline hover:prose-a:underline">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </article>
        </div>
      </div>
      <Footer />
    </main>
  )
}
