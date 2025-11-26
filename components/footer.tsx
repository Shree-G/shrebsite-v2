'use client'

import Link from 'next/link'
import { Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border py-16 px-4 sm:px-6 lg:px-8" style={{ background: '#886458', color: '#f4f3ef' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <h3 className="text-lg font-serif font-bold" style={{ color: '#f4f3ef' }}>Shree</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(244, 243, 239, 0.8)' }}>
              AI Engineer building intelligent systems
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm" style={{ color: '#f4f3ef' }}>Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-[#8ccca0] transition-colors" style={{ color: 'rgba(244, 243, 239, 0.8)' }}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#projects" className="hover:text-[#8ccca0] transition-colors" style={{ color: 'rgba(244, 243, 239, 0.8)' }}>
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#8ccca0] transition-colors" style={{ color: 'rgba(244, 243, 239, 0.8)' }}>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-[#8ccca0] transition-colors" style={{ color: 'rgba(244, 243, 239, 0.8)' }}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm" style={{ color: '#f4f3ef' }}>Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/resume.pdf" className="hover:text-[#8ccca0] transition-colors" style={{ color: 'rgba(244, 243, 239, 0.8)' }}>
                  Resume
                </a>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#8ccca0] transition-colors" style={{ color: 'rgba(244, 243, 239, 0.8)' }}>
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#8ccca0] transition-colors" style={{ color: 'rgba(244, 243, 239, 0.8)' }}>
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm" style={{ color: '#f4f3ef' }}>Social</h4>
            <div className="flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:text-[#8ccca0] transition-colors"
                aria-label="GitHub"
              >
                <Github size={18} style={{ color: '#f4f3ef' }} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:text-[#8ccca0] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} style={{ color: '#f4f3ef' }} />
              </a>
              <a
                href="mailto:shree.hridai@gmail.com"
                className="p-2 hover:text-[#8ccca0] transition-colors"
                aria-label="Email"
              >
                <Mail size={18} style={{ color: '#f4f3ef' }} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center text-sm" style={{ borderColor: 'rgba(244, 243, 239, 0.2)', color: 'rgba(244, 243, 239, 0.8)' }}>
          <p>&copy; {currentYear} Shree Gopalakrishnan. All rights reserved.</p>
          <p className="mt-4 md:mt-0">Website Hosted on Vercel | Chatbot Deployed on HuggingFace</p>
        </div>
      </div>
    </footer>
  )
}
