# TeddyPups — Website Recreation

A responsive, multi-page website recreation of the [TeddyPups](https://puppy.instabizweb.com/) experience, built with **Next.js and React**.

The project focuses on recreating the original website's visual experience, page structure, navigation, interactive elements, and animated storytelling — with particular attention to the interactive puppy journey that guides visitors through the homepage.

**Live Demo:** [blutech-teddypups-clone.vercel.app](https://blutech-teddypups-clone.vercel.app/)

---

## Overview

TeddyPups is a frontend recreation of a puppy-focused website, developed as part of a technical assignment for Blutec AI.

The goal was to reproduce the reference experience as closely as possible while maintaining a structured, reusable, and maintainable codebase.

Rather than treating each page as an isolated implementation, the application uses shared components, organised page routes, dedicated animation logic, and centralised content data.

## Features

- **Multi-page experience** — Separate pages for the homepage, puppy catalogue, individual puppy profiles, How It Works, Happy Families, FAQ, Contact, and Gone Home.
- **Interactive homepage journey** — An animated puppy guides visitors through the homepage, with movement and transitions connected to the scrolling experience.
- **Puppy catalogue** — Browse available puppies and explore individual puppy detail pages.
- **Reusable components** — Shared layout elements and modular page components for consistent implementation.
- **Interactive navigation** — Page navigation, menus, and transitions.
- **Responsive layouts** — Designed to provide a consistent experience across different screen sizes.
- **Animation-focused interactions** — Dedicated animation logic for visual movement, transitions, and interactive sections.

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | Application framework and routing |
| React | Component-based UI development |
| JavaScript | Application logic and interactions |
| CSS | Styling, layouts, and responsive presentation |
| Vercel | Deployment and hosting |

## Project Structure

The project follows a modular structure that separates routes, reusable components, animation logic, and application data.

```text
src/
├── app/
│   ├── contact/
│   ├── faq/
│   ├── gone-home/
│   ├── happy-families/
│   ├── how-it-works/
│   ├── puppies/
│   │   └── [slug]/
│   ├── layout.js
│   └── page.js
│
├── components/
│   ├── home/
│   │   ├── FamilyWall.jsx
│   │   ├── HomePage.jsx
│   │   └── PuppyShowroom.jsx
│   │
│   ├── layout/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── PuppyJourney.jsx
│   │   ├── PuppyFlight.jsx
│   │   └── ...
│   │
│   └── puppies/
│
├── animations/
│   ├── puppy-journey.js
│   ├── puppy-model.js
│   ├── flight-motion.js
│   ├── smooth-scroll.js
│   └── ...
│
└── data/
    ├── puppies.js
    ├── families.js
    ├── gone-home-puppies.js
    └── site-pages.js

public/
└── Static assets and visual resources
```

### Architecture

The codebase is organised around a few main responsibilities:

- **App Router (`src/app`)** — Handles application routes and page-level structure.
- **Components (`src/components`)** — Contains reusable UI elements and page-specific components.
- **Animations (`src/animations`)** — Keeps animation-related behaviour separate from the presentation layer.
- **Data (`src/data`)** — Holds structured content used throughout the application.
- **Public (`public`)** — Stores static assets used by the website.

This separation helps keep individual features easier to understand, modify, and maintain.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/Yuvrajsinh-chauhan5/BluTech-Technical-Assesment.git
```

Navigate to the project directory:

```bash
cd BluTech-Technical-Assesment
```

Install dependencies:

```bash
npm install
```

### Run Locally

Start the development server:

```bash
npm run dev
```

Open the application at:

```text
http://localhost:3000
```

### Production Build

To create a production build:

```bash
npm run build
```

## Development Approach

The implementation followed an iterative development process:

1. **Reference analysis** — Explored the original website's pages, layouts, interactions, and animations.
2. **Application setup** — Established the Next.js application and organised the project structure.
3. **Component development** — Built reusable layout components and individual page sections.
4. **Animation implementation** — Worked on interactive movement, scroll-based behaviour, and visual transitions.
5. **Iterative refinement** — Compared the local implementation against the reference and refined the UI and interactions.
6. **Deployment** — Published the application using Vercel.

AI-assisted development tools were used during implementation to support requirement analysis, prompt refinement, and iterative coding. Generated changes were reviewed and tested against the running application.

## Deployment

The application is deployed on **Vercel**.

**Live Application:** [https://blutech-teddypups-clone.vercel.app/](https://blutech-teddypups-clone.vercel.app/)

## Acknowledgement

This project was developed as a technical assignment for **Blutec AI**, using the original TeddyPups website as its visual and functional reference.

It is an independent recreation created for evaluation and demonstration purposes and is not affiliated with or endorsed by the original website.
