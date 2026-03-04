# Slimane Rhaytou — Portfolio

Personal portfolio website. Built with React + Vite. Deployed on GitHub Pages.

🌐 [rhaytou.github.io](https://rhaytou.github.io)

---

## Stack

- **React 19** + **Vite 6**
- Plain CSS with custom design tokens
- No UI framework, no external dependencies

## Structure

```
src/
├── components/       # NavBar, Hero, Skills, Projects, Services, About, Contact
├── components/styles/ # One CSS file per component
├── data/
│   └── content.json  # All site content — edit here to update the site
└── pages/
    └── Portfolio.jsx  # Single page, assembles all sections
```

## Running locally

```bash
npm install
npm run dev
```

## Building for production

```bash
npm run build
npm run preview
```

Output goes to `dist/`. Deploy the contents of `dist/` to GitHub Pages.

## Updating content

All text, projects, skills, services, and contact info live in `src/data/content.json`. Edit that file — no component changes needed.



























