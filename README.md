# Mohini Asthana — Personal Portfolio

Personal portfolio site built with Next.js, Tailwind CSS, and Framer Motion.

## Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS + inline styles
- **Animation**: Framer Motion
- **Language**: TypeScript
- **Deployment**: Vercel

## Structure

```
/app                   — Next.js app directory (layout, page)
/components            — Section components
  Hero.tsx             — Animated hero with rotating words + canvas background
  HeroBackground.tsx   — Bokeh + constellation canvas animation
  About.tsx            — About section with typographic highlight list
  Experience.tsx       — Interactive experience section with expandable detail panels
  Awards.tsx           — Awards and recognition
  Research.tsx         — Research work
  Skills.tsx           — Skills
  Testimonials.tsx     — Testimonials
  Contact.tsx          — Contact section
  Navigation.tsx       — Site navigation
  Footer.tsx           — Footer
/public                — Static assets (headshot, etc.)
```

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Building for production

```bash
npm run build
npm run start
```
