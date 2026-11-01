# Thulana De Silva — Portfolio

Personal portfolio of **Thulana De Silva**: Data Analytics & AI first, with software engineering as a supporting strength.

Built with Next.js 16 (App Router), React 19, JavaScript, plain CSS + CSS Modules, Framer Motion and Lucide icons. No TypeScript, no Tailwind.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

Node.js 20.9 or newer is required.

## Project structure

```
app/
  layout.js                 Root layout: fonts, metadata, theme, nav, footer
  page.js                   Home page (all sections)
  globals.css               Design tokens, Liquid Glass surfaces, buttons, tags
  projects/[slug]/          Case-study pages (+ per-project Open Graph image)
  api/contact/route.js      Contact form delivery (Resend)
  opengraph-image.js        Generated social preview image
  icon.svg, apple-icon.js   Favicons
  sitemap.js, robots.js     SEO
components/
  layout/                   Navbar, ThemeToggle, Footer, ambient background
  sections/                 Hero, About, Expertise, Experience, Projects, Skills, Education, Certifications, Contact
  projects/                 Project covers (abstract SVG compositions)
  ui/                       Reveal animation, section headers, brand icons
data/                       ← All editable content lives here
lib/                        Helpers (asset detection, contact validation, site URL)
public/                     Photo, CV, screenshots, certificates
```

## Editing your content

Everything visitors read lives in `data/`. You shouldn't need to touch components to update it.

| What | File |
| --- | --- |
| Name, logo text (`brand`), headline, introduction, location, availability label, email, socials, SEO text | `data/site.js` (`site`) |
| About section copy, facts, "Currently exploring", personal interests | `data/site.js` (`about`) |
| Areas of expertise (priority order) | `data/expertise.js` |
| Internship / experience | `data/experience.js` |
| Projects and case studies | `data/projects.js` |
| Skills | `data/skills.js` |
| Education | `data/education.js` |
| Certifications | `data/certifications.js` |

### Profile photo

Add a square photo (800×800 or larger) at `public/images/profile.jpg`. It appears in the hero and About section automatically. Until then a monogram is shown. To use another file name, change `site.photo`.

### CV

Add your CV at `public/cv/Thulana-De-Silva-CV.pdf`. Every "Download CV" button then works. Until the file exists, those buttons say **Request CV** and link to the contact section instead, so visitors never hit a broken download.

### Projects

Each entry in `data/projects.js` drives a card on the home page and a case study at `/projects/<slug>`.

- **Order** in the array is the order on the site (Data & AI first).
- **`status`**: `'in-progress'` shows an animated "In progress" badge. Keep the final-year project on `'in-progress'` until it is finished, then change it to `'completed'`.
- **`links.github` / `links.demo`**: leave empty to hide the button.
- **`cover`**: path to a real image in `/public` to replace the abstract cover art.
- **Case-study fields** (`overview`, `problem`, `objectives`, `dataSources`, `methodology`, `architecture`, `implementation`, `progress`, `results`, `challenges`, `screenshots`): all optional. Empty fields are hidden, along with their entry in the "On this page" menu.
- **`results`**: only add outcomes you have verified.
- **`progress`** (final-year project): add milestones as `{ label: 'Literature review', state: 'done' | 'active' | 'next' }`.
- **`screenshots`**: `{ src, alt, caption, width, height }` with the image in `/public`. Missing files are skipped automatically.

### Education and certifications

Fill in `period`, `coursework`, `examinations`, `achievements` and `activities` in `data/education.js`. Empty fields stay hidden. Add an institution `logo` only if you have permission to use it; otherwise the monogram is used.

The certifications section is hidden until `data/certifications.js` has at least one entry with a `name`. The file contains a commented example entry.

## Contact form

The form validates input in the browser and again on the server, and never shows a fake success message.

- **Without configuration** (default): submitting opens the visitor's email app with the message pre-filled and addressed to `site.email`.
- **With [Resend](https://resend.com)**: set these environment variables (locally in `.env.local`, or in Vercel → Project → Settings → Environment Variables):

  ```
  RESEND_API_KEY=re_...
  CONTACT_TO_EMAIL=you@example.com
  CONTACT_FROM_EMAIL=Portfolio <hello@your-verified-domain.com>   # optional
  ```

  Messages are then sent through `/api/contact`, with real loading, success and error states. Rebuild or redeploy after changing these variables.

## Deploying to Vercel

1. Push this folder to its own GitHub repository.
2. Import it at [vercel.com/new](https://vercel.com/new). The framework is detected automatically.
3. Optionally set `NEXT_PUBLIC_SITE_URL` to your custom domain (for canonical URLs, Open Graph and the sitemap). Without it, Vercel's production URL is used.
4. Add the contact form variables above if you want server-side delivery.

## Design system notes

- **Tokens**: colours, radii, spacing and fonts are CSS variables at the top of `app/globals.css`. The light theme overrides them under `[data-theme='light']`.
- **Liquid Glass**: `.glass` is the shared translucent surface. Browsers without `backdrop-filter` get a solid fallback. Add `data-glow` to any `.glass` element to get the pointer-following light reflection.
- **Theme**: dark by default. The toggle remembers the visitor's choice and uses a circular View Transition where supported.
- **Motion**: Framer Motion with `reducedMotion="user"`. Visitors with reduced motion get fades instead of movement, the hero network renders as a still frame, and CSS animations are disabled.
- **Fonts**: Space Grotesk (headings) and Inter (body), self-hosted via `next/font`.
