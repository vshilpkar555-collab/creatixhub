# CreatixHub – IT Company Website

A production-grade React website for **CreatixHub**, a future-forward IT solutions company.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view in your browser.

### Build for Production

```bash
npm run build
```

Outputs optimized files to the `/build` folder.

---

## 📁 Project Structure

```
creatixhub/
├── public/
│   └── index.html              # HTML entry point
├── src/
│   ├── components/             # All React components
│   │   ├── Navbar.jsx          # Sticky nav with mobile menu
│   │   ├── Navbar.module.css
│   │   ├── Hero.jsx            # Animated hero + particle canvas
│   │   ├── Hero.module.css
│   │   ├── Marquee.jsx         # Auto-scrolling tech ticker
│   │   ├── Marquee.module.css
│   │   ├── Services.jsx        # 6-card services grid
│   │   ├── Services.module.css
│   │   ├── WhyUs.jsx           # Split layout + floating metrics
│   │   ├── WhyUs.module.css
│   │   ├── Process.jsx         # 4-step process timeline
│   │   ├── Process.module.css
│   │   ├── Testimonials.jsx    # 3-column testimonial cards
│   │   ├── Testimonials.module.css
│   │   ├── Contact.jsx         # Contact form + info
│   │   ├── Contact.module.css
│   │   ├── Footer.jsx          # Full footer with links
│   │   └── Footer.module.css
│   ├── hooks/
│   │   └── useAnimations.js    # useScrollReveal, useMouseGlow, useCountUp
│   ├── data/
│   │   └── siteData.js         # All site content (easy to edit)
│   ├── styles/
│   │   └── globals.css         # CSS variables + resets
│   ├── App.jsx                 # Root component
│   └── index.js                # React DOM entry
└── package.json
```

---

## ✨ Features

- **Animated Hero** – Particle canvas, floating orbs, animated grid, count-up stats
- **Sticky Navbar** – Blur on scroll, smooth anchor links, mobile hamburger menu
- **Services Grid** – Mouse-tracking glow effect, 6 animated cards
- **Why Us** – Floating metric cards with CSS keyframe animations
- **Process** – 4-step connected timeline with hover interactions
- **Testimonials** – Hover lift cards with gradient avatars
- **Contact Form** – Functional form with validation and success state
- **Marquee Ticker** – Auto-scrolling technology list (pauses on hover)
- **Scroll Reveal** – Every section animates in using IntersectionObserver
- **Fully Responsive** – Mobile-first breakpoints throughout
- **CSS Modules** – Scoped styles, zero conflicts

---

## 🎨 Design System

| Token | Value |
|---|---|
| Primary Accent | `#00e5ff` (cyan) |
| Secondary | `#7c3aed` (violet) |
| Tertiary | `#ff5c8a` (rose) |
| Background | `#050a14` |
| Display Font | Syne (Google Fonts) |
| Body Font | DM Sans (Google Fonts) |

---

## ✏️ Customization

All site content lives in **`src/data/siteData.js`** — edit services, stats, testimonials, and nav links there without touching component code.

CSS design tokens are defined in **`src/styles/globals.css`** — change colors and fonts in one place.
