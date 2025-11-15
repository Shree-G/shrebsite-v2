'use client'

import Link from 'next/link'
import { Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-accent/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">AI.Dev</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Building intelligent systems and AI applications
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground text-sm uppercase tracking-wide">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#projects" className="text-muted-foreground hover:text-accent transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-accent transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-muted-foreground hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground text-sm uppercase tracking-wide">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/resume.pdf" className="text-muted-foreground hover:text-accent transition-colors">
                  Resume
                </a>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground text-sm uppercase tracking-wide">Social</h4>
            <div className="flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-accent/10 hover:bg-accent/20 rounded-lg transition-colors border border-accent/20"
                aria-label="GitHub"
              >
                <Github size={18} className="text-accent" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-accent/10 hover:bg-accent/20 rounded-lg transition-colors border border-accent/20"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} className="text-accent" />
              </a>
              <a
                href="mailto:your-email@example.com"
                className="p-2 bg-accent/10 hover:bg-accent/20 rounded-lg transition-colors border border-accent/20"
                aria-label="Email"
              >
                <Mail size={18} className="text-accent" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} AI Engineer. All rights reserved.</p>
          <p className="mt-4 md:mt-0">Designed & Built • Hosted on Vercel</p>
        </div>
      </div>
    </footer>
  )
}
