'use client'

import Link from 'next/link'
import { Github, Linkedin, FileText } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full bg-background/75 backdrop-blur-sm border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold font-serif text-foreground">
            Shree 
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-accent transition-colors text-sm font-medium">
              Home
            </Link>
            <Link href="/#projects" className="text-foreground hover:text-accent transition-colors text-sm font-medium">
              Projects
            </Link>
            <Link href="/blog" className="text-foreground hover:text-accent transition-colors text-sm font-medium">
              Blog
            </Link>
            <Link href="/#contact" className="text-foreground hover:text-accent transition-colors text-sm font-medium">
              Contact
            </Link>
          </div>

          {/* Quick Access Buttons */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:text-accent transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} className="text-foreground" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:text-accent transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} className="text-foreground" />
            </a>
            <a
              href="/resume.pdf"
              className="p-2 hover:text-accent transition-colors"
              aria-label="Resume"
            >
              <FileText size={20} className="text-foreground" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 ml-4"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`h-0.5 bg-foreground transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`h-0.5 bg-foreground ${isOpen ? 'opacity-0' : ''}`}></span>
              <span className={`h-0.5 bg-foreground transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/" className="block px-4 py-2 text-foreground hover:text-accent">
              Home
            </Link>
            <Link href="/#projects" className="block px-4 py-2 text-foreground hover:text-accent">
              Projects
            </Link>
            <Link href="/blog" className="block px-4 py-2 text-foreground hover:text-accent">
              Blog
            </Link>
            <Link href="/#contact" className="block px-4 py-2 text-foreground hover:text-accent">
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
