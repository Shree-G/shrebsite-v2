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
    },
    'building-shrag': {
      title: 'Building "Shrag": From Concept to a Production-Grade Personal RAG Chatbot',
      date: 'December 1, 2024',
      author: 'Shree Gopalakrishnan',
      readTime: '8 min read',
      category: 'Engineering',
      content: `
# Building "Shrag": From Concept to a Production-Grade Personal RAG Chatbot

I've always wanted to build a personal website, but just building a static "about me" page didn't feel that fun. I wanted my portfolio to be interactive, intelligent, and a demonstration of my ability to build modern, complex systems.

So i decided to create a **chatbot that knows my professional history and can answer visitor questions about my skills, experience, and projects.**

This post details the engineering journey of building "Shrag" (Shree's RAG), a full-stack Retrieval-Augmented Generation (RAG) system, from a blank Python script to a production deployment on Hugging Face Spaces. I'm pleased to say I learnt a lot about architecture, evaluation, and the messy reality of building with LLMs!

## The Vision: Beyond the Tutorial Bot

Most RAG tutorials that I found end with a simple script that reads a PDF and prints an answer. For a production-grade system, I realized I needed a lot more actual software engineering.

After some research, I put together a list of requirements that would ensure I created something production-grade:

- **Decoupled Architecture:** A standalone API (built with FastAPI) separate from the frontend, allowing for independent scaling and flexibility. Also allows me to stick this in any website I choose to!
    
- **High-Quality Retrieval:** Depending on my initial evaluation metrics, I realized naive text-splitting may not be enough and that I'd need to explore more complex retrieval strategies.
    
- **Rigorous Evaluation:** I couldn't just "eyeball" the answers. I needed a formal way to measure the bot's accuracy and prevent hallucinations.
    
- **Modern Frontend:** Integration with a polished chat UI like \`assistant-ui\` for a seamless user experience without hiccups!
    
- **Containerized Deployment:** A reproducible environment using Docker, hosted reliably in the cloud.

## Phase 1: The Core RAG Pipeline

The heart of the system is built with **LangChain** and **FastAPI**.

### The Data Ingestion Challenge

My first major hurdle was the "garbage in, garbage out" problem. My resume is a dense PDF, and my GitHub profile is a collection of markdown files. Feeding this raw text into an LLM resulted in fragmented and confusing context.

The breakthrough was moving from a simple \`RecursiveCharacterTextSplitter\` to **Semantic Chunking**. By using an embedding model (\`sentence-transformers/all-MiniLM-L6-v2\`) to calculate the cosine similarity between sentences, the ingestion script could intelligently identify where one topic ended and another began. This resulted in self-contained, meaningful chunks of information that vastly improved the quality of the retrieved context.

### The Retrieval and Generation Chain

I implemented a standard Conversational Retrieval Chain pattern. When a user asks a question:

1. **Rephrasing:** A fast, lightweight LLM (Llama 3 8B via **Groq**) takes the user's query and the conversation history to generate a standalone, search-optimized question.
    
2. **Vector Search:** This query is used to search a **ChromaDB** vector store, retrieving the top-k most semantically relevant chunks.
    
3. **Synthesis:** The original question and the retrieved context are sent to a more powerful LLM (Llama 3.3 70B) to generate the final, accurate response.
    

## Phase 2: The "Engineering" Part (Evaluation & Testing)

This is where the project moved from a hobby to engineering - and where I arguably learnt the most throughout the entire process.

I implemented an automated evaluation pipeline using **DeepEval** to generate unit tests for my LLM, and **LangSmith** to trace and visualize the performance of every run.

I ran three distinct experiments to optimize the pipeline. Here is the story the data told me:

![Deep Eval Results](/deep_eval_results.png)

### Experiment 1: The Baseline (Naive RAG)

I started with a standard \`RecursiveCharacterTextSplitter\`. It chopped my resume and READMEs into 1,000-character blocks.
    
**Metrics:**
- **Faithfulness:** 1.00 (The model didn't lie - yay).
- **Answer Relevancy:** 0.78 (The answers were okay, but sometimes completely missed the mark).
- **Latency (p50):** 0.43s.

The naive RAG didn't perform awfully, but I definitely wanted to improve my answer relevancy. The model was exceedingly bad at fishing out specific pieces of data. For example, one of the questions in my golden dataset was "What was the MAPE value for the weekly volume forecaster Shree built at ServiceMob?" This model couldn't begin to find the answer, it just defaulted to my "information not found" response.

### Experiment 2: The Latency/Accuracy Trade-off

I did some research and hypothesized that adding a **Reranker (Flashrank)** and switching to **Semantic Chunking** would improve relevancy. I configured the retriever to fetch 20 documents and let the reranker filter them down to the best 5.

**Metrics:**
- **Faithfulness:** 1.00
- **Answer Relevancy:** 0.84 (Improved!).
- **Latency (p50):** **7.49s**
- **Latency (p99):** **14.42s**

While accuracy improved, the user experience was destroyed. Running a Cross-Encoder reranker on a CPU-based container caused a massive latency spike. A 7-second wait for a portfolio chatbot is just unacceptable. This taught me a valuable lesson: **More complexity $\\neq$ better product.**

### Experiment 3: Finding the Sweet Spot

I analyzed the traces in **LangSmith** and realized the Reranker was the bottleneck. However, the **Semantic Chunking** was providing excellent, self-contained context. I removed the reranker but kept the Semantic Chunking strategy.

**Metrics:**
- **Faithfulness:** 1.00
- **Answer Relevancy:** **0.90**
- **Latency (p50):** **0.39s**
- **Latency (p99):** 1.07s

This was the winner. By removing the reranker bottleneck and relying on high-quality semantic chunks, I achieved the highest relevancy score _and_ the fastest response times.
## Phase 3: Frontend Integration & Deployment

### The Frontend: \`assistant-ui\`

For the user interface, I integrated **\`assistant-ui\`** into my personal Next.js website. This provided a polished, ChatGPT-like experience out of the box. The challenge was bridging the gap between the frontend's expectations and my FastAPI backend's responses.

This required creating a custom runtime adapter in Next.js to manage session IDs, format the request payload correctly, and handle the streaming response from the API. A critical lesson learned was the importance of generating unique session IDs on the server-side to prevent different users from accidentally sharing the same conversation history—a bug that was both hilarious and terrifying to discover.

### Deployment: Docker & Hugging Face Spaces

To ensure a consistent environment from development to production, I containerized the entire backend API using **Docker**. This solved the "it works on my machine" problem, especially with the complex Python dependencies for machine learning libraries.

For hosting, I chose **Hugging Face Spaces**. Their Docker runtime support, ease of use, and generous free tier made it an excellent platform. The deployment process wasn't without its trials—I had to learn the nuances of Git LFS for handling large vector database files and navigate the specific configuration requirements for Hugging Face's environment. But after resolving merge conflicts and configuring secrets, the "Building" badge turned to "Running," and "Shrag" was live!

## Conclusion

Building "Shrag" was a challenging and immensely rewarding project. It pushed me to look beyond the surface of Generative AI and dive into the engineering principles required to build a reliable, production-ready system.

From designing semantic ingestion pipelines to implementing automated evaluation and deploying containerized microservices, this project trained my ability to tackle complex, full-stack engineering challenges.

I invite you to try it out on my website. Ask it anything related to my professional experiences and it should give you accurate responses! If you do manage to break it or have it give you bad responses, please email me the results! I want to keep refining, iterating and maintaining this project as long as I can:)

Thanks for reading!
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
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => <h1 className="text-4xl font-bold mt-8 mb-4" {...props} />,
                  h2: ({ node, ...props }) => <h2 className="text-3xl font-bold mt-6 mb-3" {...props} />,
                  h3: ({ node, ...props }) => <h3 className="text-2xl font-semibold mt-4 mb-2" {...props} />,
                  p: ({ node, ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
                  ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4 ml-4" {...props} />,
                  ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-4 ml-4" {...props} />,
                  li: ({ node, ...props }) => <li className="mb-2" {...props} />,
                  a: ({ node, ...props }) => <a className="text-accent underline underline-offset-2 hover:text-secondary" {...props} />,
                  code: ({ node, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || '')
                    return match ? (
                      <div className="rounded-md bg-muted p-4 my-4 overflow-x-auto">
                        <code className={className} {...props}>
                          {children}
                        </code>
                      </div>
                    ) : (
                      <code className="bg-muted px-2 py-1 rounded text-sm font-mono" {...props}>
                        {children}
                      </code>
                    )
                  }
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </article>
        </div>
      </div>
      <Footer />
    </main>
  )
}
