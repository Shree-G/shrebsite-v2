import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import Philosophy from '@/components/philosophy'
import Anecdotes from '@/components/anecdotes'
import Journey from '@/components/journey'
import ThinkingSpace from '@/components/thinking-space'
import Projects from '@/components/projects'
import Contact from '@/components/contact'
import Footer from '@/components/footer'
import FloatingChatButton from '@/components/floating-chat-button'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Projects />
      <Journey />
      {/* <ThinkingSpace /> */}
      {/* <Anecdotes /> */}
      <Contact />
      <Footer />
      <FloatingChatButton />
    </main>
  )
}
