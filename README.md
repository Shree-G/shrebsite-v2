# Personal Portfolio Website

A modern, full-stack personal portfolio website featuring an integrated RAG (Retrieval-Augmented Generation) chatbot, built with Next.js 16 and deployed on Vercel.

## Overview

This is a personal website for Shree Gopalakrishnan, a Full Stack Software Engineer. The site showcases professional work, projects, philosophy, and career timeline, with a unique interactive AI chatbot ("Shrag") that can answer questions about the owner's background and experience.

## Key Features

### 🤖 AI-Powered Chatbot
- **Custom RAG System**: Integrated chatbot using Assistant UI that connects to a backend RAG API
- **Persistent Chat**: Chat interface embedded in the Hero section with expandable full-screen mode
- **Suggested Questions**: Pre-populated questions to guide user interaction
- **Custom Loading States**: Animated loading phrases ("Reading Shree's Mind", "Picking Shree's Brain", etc.)
- **Markdown Support**: Full markdown rendering for chatbot responses
- **Streaming Responses**: Real-time streaming of AI responses from the backend

### 📱 Responsive Design
- Mobile-first approach with Tailwind CSS
- Smooth animations using Framer Motion
- Glass-morphism effects and modern UI patterns
- Dark mode support via `next-themes`

### 🎨 Content Sections

#### Hero Section
- Two-column layout: Bio/info on left, persistent chatbot on right
- Social links (GitHub, LinkedIn)
- Smooth scroll animations

#### Projects Showcase
- Horizontal scrollable gallery of 8 projects
- Each project includes:
  - Title and description
  - Technology tags
  - GitHub and live demo links
- Projects include: Personal RAG Chatbot, Shrocial Media, Restaurant Ordering System, Pokédex, Social Compass App, and more

#### Contact
- Formspree integration for contact form
- Email: shree.hridai@gmail.com
- Quick access to chatbot

### 🛠️ Technical Architecture

#### Frontend Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.1.9
- **Animations**: Framer Motion 12.23.24
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **State Management**: Zustand (for chat state)

#### Chat System
- **Assistant UI**: `@assistant-ui/react` (v0.11.41)
- **Markdown Rendering**: `react-markdown` + `@assistant-ui/react-markdown`
- **Runtime**: Custom local runtime with streaming support
- **Backend**: API route at `/api/chat` that proxies to external RAG service
- **State**: Global chat store using Zustand

#### Blog System
- Dynamic routes: `/blog/[slug]`
- Markdown rendering with custom styling
- Blog index at `/blog`

#### Form Handling
- **Contact Form**: Formspree integration (`@formspree/react`)
- Form ID: `xyzvedwd`

## Project Structure

```
shrebsite-v2/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # Chat API endpoint
│   ├── blog/
│   │   ├── [slug]/
│   │   │   └── page.tsx          # Dynamic blog post pages
│   │   └── page.tsx              # Blog index
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/
│   ├── chat/
│   │   ├── assistant-ui-chat.tsx # Chat UI component
│   │   └── chat-runtime.tsx      # Chat runtime logic
│   ├── anecdotes.tsx             # Stories section
│   ├── contact.tsx               # Contact form
│   ├── footer.tsx                # Footer
│   ├── hero.tsx                  # Hero section with chat
│   ├── journey.tsx               # Timeline
│   ├── navbar.tsx                # Navigation
│   ├── philosophy.tsx            # Philosophy section
│   ├── projects.tsx              # Projects showcase
│   ├── theme-provider.tsx        # Theme context
│   └── thinking-space.tsx        # Blog preview
├── hooks/
│   └── use-in-view.ts            # Intersection observer hook
├── lib/
│   ├── chat-store.ts             # Zustand chat state
│   └── utils.ts                  # Utility functions
├── public/
│   ├── prof-photo.JPG            # Profile photo
│   └── Resume.pdf                # Resume file
└── styles/
    └── assistant-ui.css          # Assistant UI styles
```

## Key Dependencies

### Core
- `next`: ^16.0.3
- `react`: ^18.3.1
- `typescript`: ^5

### UI & Styling
- `tailwindcss`: ^4.1.9
- `framer-motion`: ^12.23.24
- `lucide-react`: ^0.454.0
- `@radix-ui/*`: Various UI primitives

### Chat & AI
- `@assistant-ui/react`: ^0.11.41
- `@assistant-ui/react-markdown`: ^0.11.5
- `react-markdown`: Latest

### Forms & Data
- `@formspree/react`: ^3.0.0
- `zustand`: ^5.0.8

### Analytics
- `@vercel/analytics`: Latest

## Environment Variables

```bash
# Required for chat functionality
# Backend RAG API endpoint (not included in repo)
```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment

- **Frontend**: Deployed on Vercel
- **Chatbot Backend**: Deployed on HuggingFace
- **Forms**: Handled by Formspree

## Design Decisions

### Layout Consistency
All main content sections use `max-w-6xl` for consistent width across the site.

### Chat Integration
The chatbot is persistently visible in the Hero section, allowing users to interact immediately without navigation. It expands to full-screen when clicked for focused conversation.

### Performance
- Image optimization with Next.js Image component
- Lazy loading for sections using Intersection Observer
- Streaming responses for chat to improve perceived performance

### Accessibility
- Semantic HTML throughout
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus management in chat interface

## Future Enhancements

- Add more blog posts
- Implement blog categories and tags
- Add project filtering
- Enhance chatbot with more context
- Add analytics dashboard

## License

All rights reserved © 2024 Shree Gopalakrishnan

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.
