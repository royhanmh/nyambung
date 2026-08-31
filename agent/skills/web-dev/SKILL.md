---
name: web-dev
description: "Web development workflow for HTML/CSS/JS projects. Use when building, editing, or debugging frontend code, styling with Tailwind, testing pages in a browser, or improving UI/UX."
---

# Web Development

## When to Use

- Building or editing HTML, CSS, JavaScript
- Styling with Tailwind CSS (this project uses the Tailwind CDN)
- Testing pages in the browser, capturing screenshots
- Debugging layout, responsiveness, or dark mode issues

## Procedure

1. Read `prd.md` for product requirements before making feature changes.
2. Edit `index.html` — this is a single-file app (HTML + Tailwind + vanilla JS).
3. Validate changes by opening the page in the browser (`file://` or Laragon vhost) and checking:
   - Layout at desktop and mobile widths
   - Light/dark mode toggle behavior
   - Console errors
4. Keep design consistent with the existing `tempo` color palette defined in the Tailwind config.

## Conventions

- No build step — plain static files.
- Prefer utility classes over custom CSS; use the configured theme colors (`tempo-*`, `accent-*`).
- Fonts: Inter (sans), Space Mono / JetBrains Mono (mono).
