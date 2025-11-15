import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Link from 'next/link'

export default function BlogPost({ params }: { params: { slug: string } }) {
  const blogContent = {
    'building-effective-rag-systems': {
      title: 'Building Effective RAG Systems in Production',
      date: 'November 15, 2024',
      author: 'AI Engineer',
      readTime: '8 min read',
      category: 'AI/ML',
      content: `
        Retrieval-Augmented Generation (RAG) has become a cornerstone technology for building AI applications that can leverage external knowledge sources. In this post, I'll share insights from building production RAG systems at scale.

        ## Why RAG Matters

        RAG systems combine the power of large language models with the ability to retrieve and incorporate external information. This approach offers several advantages:
        - Reduced hallucinations through grounding in real data
        - Access to up-to-date information beyond training data
        - Better transparency and traceability in AI responses

        ## Key Components

        A production RAG system typically consists of:
        
        1. **Document Processing Pipeline**: Converting various document formats into processable chunks
        2. **Embedding Generation**: Creating semantic representations of documents
        3. **Vector Storage**: Efficiently storing and retrieving embeddings
        4. **Retrieval Logic**: Finding the most relevant documents for a query
        5. **LLM Integration**: Generating responses based on retrieved context

        ## Best Practices

        Based on my experience, here are critical practices:
        
        - **Chunk Size Matters**: Finding the right balance between granularity and context
        - **Embedding Quality**: Choose embeddings optimized for your specific domain
        - **Relevance Scoring**: Implement hybrid search combining BM25 and semantic similarity
        - **Context Ordering**: Carefully order retrieved documents for optimal LLM processing

        ## Performance Optimization

        When scaling RAG systems, I recommend:
        
        - Implement caching for frequently accessed documents
        - Use batch processing for document embedding
        - Monitor and optimize retrieval latency
        - Implement reranking to refine initial retrieval results

        ## Conclusion

        Building production-grade RAG systems requires attention to both the retrieval and generation components. By following these practices, you can build systems that are both powerful and reliable.
      `
    },
    'llm-fine-tuning-guide': {
      title: 'LLM Fine-tuning: From Theory to Practice',
      date: 'November 10, 2024',
      author: 'AI Engineer',
      readTime: '12 min read',
      category: 'AI/ML',
      content: `
        Fine-tuning large language models on custom datasets is one of the most practical ways to adapt LLMs for specific use cases. This comprehensive guide covers everything you need to know.

        ## When to Fine-tune

        Before fine-tuning, consider:
        - Do you have sufficient training data? (Generally, at least 100-500 examples)
        - Is prompt engineering sufficient for your use case?
        - Do you have compute resources available?

        ## Preparation

        Data preparation is critical:
        1. Gather and label your training data
        2. Format data correctly for your chosen framework
        3. Split into train/validation/test sets
        4. Check for data quality and balance

        ## Implementation

        Using Hugging Face Transformers:
        - Load pre-trained model
        - Prepare tokenized datasets
        - Configure training arguments
        - Train with monitoring

        ## Common Pitfalls

        Avoid these mistakes:
        - Overfitting on small datasets
        - Ignoring data imbalance
        - Not monitoring validation loss
        - Using learning rates that are too high

        ## Results and Evaluation

        Always evaluate your fine-tuned model thoroughly with metrics relevant to your task, comparing against baseline performance.
      `
    },
    'vector-databases-guide': {
      title: 'Vector Databases and Semantic Search',
      date: 'November 5, 2024',
      author: 'AI Engineer',
      readTime: '10 min read',
      category: 'AI/ML',
      content: `
        Vector databases have revolutionized how we handle semantic search and similarity matching. Let's explore what makes them powerful and how to use them effectively.

        ## Understanding Vectors

        Vectors are high-dimensional representations of text, images, or other data. They capture semantic meaning in a way that enables similarity search.

        ## Vector Database Options

        Popular choices include:
        - Pinecone: Fully managed, serverless
        - Weaviate: Open-source, flexible
        - Milvus: High-performance open-source
        - Qdrant: Modern vector database

        ## Search Techniques

        Beyond simple similarity search:
        - Hybrid search combining keyword and semantic
        - Filtering with metadata
        - Reranking for improved relevance
        - Approximate nearest neighbor search

        ## Performance Considerations

        - Vector dimensionality affects performance
        - Index type selection is critical
        - Scaling requires careful architecture planning
        - Query optimization is essential

        ## Practical Tips

        - Monitor query latency regularly
        - Implement batch operations where possible
        - Use appropriate distance metrics
        - Consider cost and performance tradeoffs
      `
    },
    'prompt-engineering-techniques': {
      title: 'Prompt Engineering Techniques That Work',
      date: 'October 28, 2024',
      author: 'AI Engineer',
      readTime: '7 min read',
      category: 'AI/ML',
      content: `
        Prompt engineering is an art and science. By mastering key techniques, you can significantly improve LLM output quality.

        ## Core Principles

        1. **Clarity**: Be specific about what you want
        2. **Context**: Provide necessary background information
        3. **Format**: Specify output format when needed
        4. **Examples**: Few-shot examples improve consistency

        ## Effective Techniques

        ### Chain of Thought
        Ask the model to think step-by-step for better reasoning.

        ### Role-playing
        Assign the LLM a role to guide its response style.

        ### Structured Output
        Request specific formats (JSON, markdown, etc.)

        ### Decomposition
        Break complex tasks into simpler subtasks.

        ## Advanced Strategies

        - Temperature and top-k tuning
        - System message optimization
        - Dynamic prompting based on context
        - Prompt versioning and A/B testing

        ## Common Mistakes

        - Vague instructions
        - Contradictory constraints
        - Ignoring token limits
        - Not iterating on prompts

        ## Conclusion

        Great prompts are developed iteratively. Test, measure, and refine continuously.
      `
    }
  }

  const post = blogContent[params.slug as keyof typeof blogContent] || {
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
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="px-3 py-1 bg-accent/10 text-accent rounded-lg border border-accent/20 font-medium">
                  {post.category}
                </span>
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.author}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
            </div>

            <div className="prose-like space-y-6">
              {post.content.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('##')) {
                  return (
                    <h2 key={idx} className="text-3xl md:text-4xl font-bold text-foreground mt-12 mb-6 pt-8">
                      {paragraph.replace('## ', '')}
                    </h2>
                  )
                }
                if (paragraph.startsWith('###')) {
                  return (
                    <h3 key={idx} className="text-2xl font-semibold text-accent mt-8 mb-4">
                      {paragraph.replace('### ', '')}
                    </h3>
                  )
                }
                if (paragraph.startsWith('- ')) {
                  return (
                    <ul key={idx} className="space-y-3 pl-6">
                      {paragraph.split('\n').map((item, i) => (
                        <li key={i} className="text-foreground text-lg leading-relaxed flex gap-3">
                          <span className="text-accent flex-shrink-0 mt-1">•</span>
                          <span>{item.replace('- ', '')}</span>
                        </li>
                      ))}
                    </ul>
                  )
                }
                if (paragraph.startsWith('1.') || paragraph.match(/^\d+\./)) {
                  return (
                    <ol key={idx} className="space-y-3 pl-6">
                      {paragraph.split('\n').map((item, i) => (
                        <li key={i} className="text-foreground text-lg leading-relaxed">
                          <span className="text-accent font-semibold">{i + 1}.</span> {item.replace(/^\d+\.\s*/, '')}
                        </li>
                      ))}
                    </ol>
                  )
                }
                return (
                  <p key={idx} className="text-foreground text-lg leading-relaxed">
                    {paragraph}
                  </p>
                )
              })}
            </div>
          </article>
        </div>
      </div>
      <Footer />
    </main>
  )
}
