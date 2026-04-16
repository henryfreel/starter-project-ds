# Simple Design System

A static HTML/CSS component library based on a Figma design system, deployed via Netlify.

## Project Structure

```
├── index.html              # Component showcase page
├── starter/index.html      # Minimal template for consuming the DS via CDN
├── css/
│   ├── reset.css           # CSS reset / normalize
│   ├── tokens.css          # Design tokens (colors, spacing, typography)
│   ├── components.css      # All component styles
│   └── styles.css          # Global styles + Inter font import
├── js/
│   └── main.js             # Interactive behavior + SVG icon sprite loader
├── icons.svg               # Combined SVG sprite sheet (all icons)
├── icons/                  # Individual SVG files (287 Feather icons)
├── assets/
│   ├── images/             # Image files
│   └── fonts/              # Custom font files
├── netlify.toml            # Netlify deployment config
└── .gitignore
```

## Components

### Layout
- **Header** — Navigation with logo, pill links, and auth buttons
- **Footer** — Branding, social links, and link columns

### Hero Sections
- **Hero Basic** — Centered title + subtitle
- **Hero Actions** — Title + subtitle + button group
- **Hero Newsletter** — Title + subtitle + email form
- **Hero Form** — Title + subtitle + contact form
- **Hero Image** — Background image with scrim overlay

### Panel Sections
- **Panel Image Content** — Image left, text right
- **Panel Image Content Reverse** — Text left, image right
- **Panel Image** — Full-width image
- **Panel Image Double** — Two side-by-side images

### Card Grids
- **Card Grid Pricing** — Pricing tiers with toggle
- **Card Grid Icon** — Icon + title + body cards
- **Card Grid Content List** — Horizontal cards with image

### Page Sections
- **Page Accordion** — FAQ-style expandable items
- **Page Newsletter** — Heading + newsletter form

## Icons

287 Feather icons are available via an SVG sprite sheet. `main.js` automatically fetches `icons.svg` and injects it into the page DOM, so icons work cross-origin for all consumers.

Use local fragment references — **not** full CDN URLs:

```html
<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <use href="#heart"></use>
</svg>
```

Change `width` and `height` to render at any size (16, 20, 24, 32, 48). The `viewBox` always stays `0 0 24 24`.

You can also use individual SVG files directly (fixed at 24px):

```html
<img src="https://starter-project-ds.netlify.app/icons/heart.svg" alt="heart">
```

> **Note:** `<use href="https://...icons.svg#name">` pointing to an external origin is blocked by all browsers as a fundamental SVG security restriction. Always use `<use href="#name">` and ensure `main.js` is loaded.

## Design Tokens

All design tokens are defined as CSS custom properties in `css/tokens.css`. Update these values to theme the entire library:

- Colors (background, text, border)
- Spacing scale (4px–160px)
- Typography (Inter font, sizes, weights)
- Border radius and stroke

## Changelog

A machine-readable changelog is published at:

```
https://starter-project-ds.netlify.app/changelog.json
```

It lists every version with breaking changes (markup that consumers need to update) and additions (new components). Consuming projects can fetch this to detect when their DS-dependent markup is stale.

## Local Development

Open `index.html` directly in a browser, or use a local server:

```bash
python3 -m http.server 8000
# or
npx serve .
```

## Deployment

Deploys automatically to Netlify on push to `main`.
