# Product Requirements Document (PRD)
# Future Corporation — Flagship Website

**Version:** 1.0  
**Date:** February 21, 2026  
**Author:** Future Corporation Engineering  
**Status:** Production / Live

---

## 1. Overview

### 1.1 Product Summary
A cinematic, industrial-grade website for **Future Corporation**, a robotics and AI education company. The site serves as the company's digital storefront — designed to impress investors, partner schools, and prospective students with Apple-level polish and a futuristic robotics lab aesthetic.

### 1.2 Business Objectives
| Objective | Metric |
|-----------|--------|
| Establish brand credibility | Premium visual impression within 3 seconds |
| Generate partnership inquiries | Contact form submission rate |
| Showcase services & impact | Time-on-page, scroll depth |
| Mobile accessibility | Fully responsive across all viewports |

### 1.3 Target Audience
- **Primary:** School administrators, education decision-makers
- **Secondary:** Investors, corporate partners
- **Tertiary:** Students, parents, tech enthusiasts

---

## 2. Technical Architecture

### 2.1 Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | Next.js 14 (App Router) | SSR, routing, performance |
| Language | TypeScript / TSX | Type safety |
| Styling | Tailwind CSS v4 | Utility-first styling with `@theme` directives |
| Animation | Framer Motion | Page transitions, entrance animations |
| 3D Graphics | React Three Fiber + Drei | Interactive robotic arm in hero section |
| Theming | next-themes | Dark/light mode with CSS variables |
| Icons | Lucide React | Consistent icon system |
| Deployment | Vercel (recommended) | Edge hosting, CI/CD |

### 2.2 Architecture Pattern

```
Server Components (page.tsx)
├── HomeClient (Client) ─── LoadingScreen → Hero + Hero3D (Canvas)
├── Navbar (Client) ─────── Navigation + ThemeToggle
├── ServicesOverview ─────── Service cards
├── ImpactStatistics ─────── Animated counters
├── WhyFutureCorp ────────── Mission timeline
├── ContactPreview ────────── Contact info + ContactForm
└── Footer ───────────────── Links + Newsletter
```

- **Server-rendered:** Static content sections for SEO and fast initial paint
- **Client-rendered:** Loading screen, Hero with 3D canvas, interactive components

### 2.3 File Structure

```
future-corp/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Server component — assembles sections
│   └── globals.css         # CSS variables, theme tokens, animations
├── components/
│   ├── layout/
│   │   ├── HomeClient.tsx  # Client orchestrator (loading → hero)
│   │   ├── LoadingScreen.tsx # Cinematic loading with progress ring
│   │   ├── Hero.tsx        # Hero section with editorial layout
│   │   ├── Navbar.tsx      # Responsive navbar with scroll effects
│   │   └── Footer.tsx      # Footer with logo, links, newsletter
│   ├── sections/
│   │   ├── ServicesOverview.tsx   # Skeuomorphic service cards
│   │   ├── ImpactStatistics.tsx   # Animated stat counters
│   │   ├── WhyFutureCorp.tsx      # Mission & timeline
│   │   └── ContactPreview.tsx     # Contact details + form
│   ├── features/
│   │   └── ContactForm.tsx        # Multi-state form with rocket animation
│   ├── three/
│   │   ├── Hero3D.tsx      # 3D robotic arm scene (R3F Canvas)
│   │   └── WebGLFallback.tsx # Fallback for unsupported browsers
│   ├── ui/
│   │   ├── Button.tsx      # Reusable motion button component
│   │   └── ErrorBoundary.tsx # Error catching wrapper
│   └── theme-toggle.tsx    # View Transitions API theme switcher
├── lib/
│   └── utils.ts            # cn() utility (clsx + tailwind-merge)
└── public/
    ├── logo.jpg            # Company logo
    └── [assets]            # Static images
```

---

## 3. Features & Requirements

### 3.1 Loading Screen
| Requirement | Specification |
|-------------|--------------|
| Logo | 120px, centered within progress ring |
| Progress ring | SVG circle, animated stroke-dashoffset |
| Percentage counter | Real-time numeric display (0–100%) |
| Status text | "System Initializing" with pulsing dot indicator |
| Progress bar | Gradient bar (electric-blue → cyan) below text |
| Radial glow | Ambient blue glow behind logo |
| Rotating ring | Outer decorative ring, continuous rotation |
| Exit animation | Scale-up + fade-out (0.8s, cubic-bezier) |
| No CLS | Hero renders behind loading screen (z-[100]) |

### 3.2 Hero Section
| Requirement | Specification |
|-------------|--------------|
| Layout | 12-column grid, text left (col-span-7), 3D right |
| Headline | "AUTONOMOUS INTELLIGENCE" with gradient text |
| Sub-headline | "PIONEERING THE FUTURE OF ROBOTICS & AI" |
| CTA buttons | "Explore Our Lab" (primary) + "Watch Reel" (outline) |
| 3D Scene | Interactive robotic arm (React Three Fiber) |
| Mobile 3D | Positioned right, scale 0.75, pointer-events disabled |
| Desktop 3D | Float animation, contact shadows, full fidelity |

### 3.3 Navigation
| Requirement | Specification |
|-------------|--------------|
| Style | Fixed top, glassmorphism backdrop blur |
| Scroll behavior | Shrinks on scroll, adds border + shadow |
| Links | Home, About, Services, Impact, Contact |
| Hover effect | bg-electric-blue/15, scale-105, shadow-sm |
| Theme toggle | View Transitions API circle-expand effect |
| Mobile menu | Full-screen overlay with staggered link animations |
| Logo | Company logo image with border + shadow |

### 3.4 Services Overview
| Requirement | Specification |
|-------------|--------------|
| Card style | Skeuomorphic with glassmorphism |
| Services | Robotics Lab Setup, AI & Coding Bootcamp, STEM Workshops, Competition Prep |
| Animation | Scroll-triggered entrance (staggered) |
| Interaction | Hover glow, border highlight |

### 3.5 Impact Statistics
| Requirement | Specification |
|-------------|--------------|
| Counters | Animated number counting on scroll into view |
| Metrics | Students, Schools, Awards, Success Rate |
| Style | Large bold numbers with descriptive labels |

### 3.6 Why Future Corp (Mission Section)
| Requirement | Specification |
|-------------|--------------|
| Heading | "BUILDING THE INNOVATORS OF TOMORROW" |
| Content | Mission storytelling with timeline |
| Theme support | Uses `text-foreground` for dark/light contrast |

### 3.7 Contact Section
| Requirement | Specification |
|-------------|--------------|
| Contact info | Phone (+91 7319677613), WhatsApp, Email |
| Contact form | Name, Email, Message fields |
| Form states | idle → loading → success (with rocket animation) |
| Rocket animation | 80px rocket launches northeast, exhaust trail from thruster |
| Success state | Checkmark + "Message Sent!" + "Send Another" button |
| Light mode | All text uses `var(--foreground)` for guaranteed visibility |

### 3.8 Footer
| Requirement | Specification |
|-------------|--------------|
| Brand | Company logo image (matches navbar) + "FUTURECORP" |
| Links | Company links, Service links |
| Newsletter | Email input + "Join" button |
| Email input | Visible border in both light/dark modes |

---

## 4. Design System

### 4.1 Color Tokens

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| `--background` | `#f8fafc` | `#0f172a` |
| `--foreground` | `#0f172a` | `#f1f5f9` |
| `--surface` | `#f1f5f9` | `#1e293b` |
| `--electric-blue` | `#2596be` | `#2596be` |
| `--border` | `#e2e8f0` | `rgba(255,255,255,0.1)` |

### 4.2 Typography
- **Font family:** System sans-serif (Inter / Outfit via Google Fonts)
- **Mono font:** JetBrains Mono (loading screen, eyebrows)
- **Scale:** text-sm → text-8xl (responsive clamp)

### 4.3 Effects
| Effect | Usage |
|--------|-------|
| Glassmorphism | Navbar, cards, mobile menu (`backdrop-blur`, semi-transparent bg) |
| Glow shadows | CTAs, active elements (`box-shadow` with electric-blue) |
| Gradient text | Hero headline (`bg-clip-text`, blue → purple gradient) |
| View Transitions | Theme toggle (circle clip-path expansion from button) |

---

## 5. Performance Requirements

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Cumulative Layout Shift | < 0.1 |
| Time to Interactive | < 3.5s |
| Mobile scroll FPS | 60fps |

### 5.1 Optimizations Implemented
- **DPR capping:** `[1, 1.5]` mobile, `[1, 1.25]` desktop
- **3D mobile:** `pointer-events: none` on Canvas, no contact shadows
- **Server-rendered sections:** All static content is SSR (zero client JS)
- **Dynamic imports:** Hero3D lazy-loaded with `next/dynamic`, no SSR
- **GPU hints:** `will-change`, `contain: layout style paint`
- **Scroll throttling:** Intersection Observer for lazy animations

---

## 6. Accessibility

| Requirement | Implementation |
|-------------|---------------|
| Color contrast | WCAG AA (4.5:1 minimum for text) |
| Keyboard navigation | All interactive elements focusable |
| Screen readers | Proper ARIA labels, sr-only text |
| Reduced motion | `prefers-reduced-motion` respected |
| Semantic HTML | `<main>`, `<section>`, `<nav>`, `<footer>` |
| Form labels | All inputs have associated `<label>` elements |

---

## 7. Browser Support

| Browser | Support Level |
|---------|--------------|
| Chrome 90+ | Full (incl. View Transitions) |
| Edge 90+ | Full (incl. View Transitions) |
| Firefox 100+ | Full (instant theme switch fallback) |
| Safari 16+ | Full (instant theme switch fallback) |
| Mobile Chrome | Full |
| Mobile Safari | Full |

---

## 8. Deployment

| Item | Details |
|------|---------|
| Hosting | Vercel (recommended) |
| Repository | `github.com/ustrobotix/futurecorporation` |
| Branch | `main` |
| Build command | `npm run build` |
| Framework preset | Next.js |
| Node version | 18+ |

---

## 9. Known Limitations & Future Work

| Item | Status |
|------|--------|
| Logo PNG (background-removed) | ⏳ Awaiting asset from client |
| View Transitions API | Chrome/Edge only; Safari/Firefox instant fallback |
| 3D on low-end mobile | Reduced quality but still rendered |
| Form backend | Frontend-only; needs API integration for actual email delivery |
| SEO metadata | Basic; can be enhanced with structured data (JSON-LD) |
| Analytics | Not yet integrated (recommend Google Analytics or Plausible) |

---

## 10. Revision History

| Version | Date | Changes |
|---------|------|---------|
| 0.1 | Feb 18, 2026 | Initial website build — all sections |
| 0.2 | Feb 19, 2026 | Final polish pass — shadows, gradients, animations |
| 0.3 | Feb 21, 2026 | Loading screen overhaul, light mode fixes |
| 0.4 | Feb 21, 2026 | Theme toggle ripple, mobile 3D, rocket trail, newsletter input |
| **1.0** | **Feb 21, 2026** | **Production release — all fixes applied** |
