# Agent Instructions — Simple Design System

## Overview

This is a static HTML/CSS design system sourced from a Figma file. All components, tokens, and examples live in a single-page showcase (`index.html`) with styles split across CSS files. There is no build step — just static files served via Netlify.

**GitHub repo:** `henryfreel/starter-project-ds`
**Figma file key:** `cpFzRo9We3lWcBNjwvI6iN`
**Live URL:** https://starter-project-ds.netlify.app/

This design system is consumed via CDN by other projects. The web project template lives at `henryfreel/starter-project-template-web`. Changes here affect all downstream projects.

## File Map

| File | Purpose |
|---|---|
| `css/tokens.css` | Design tokens as CSS custom properties (colors, spacing, typography, radii, shadows). Light mode under `:root`, dark mode under `[data-theme="dark"]`. Also contains primitive color tokens (e.g. `--blue-100`). |
| `css/components.css` | All component CSS. Each component gets a labeled section header comment. |
| `css/styles.css` | Global body/font styles. Rarely changes. |
| `css/reset.css` | CSS reset. Do not modify. |
| `index.html` | Single-page component showcase. Contains every component example with labels. Has a sidebar nav with scroll-spy and a hamburger menu on mobile. |
| `js/main.js` | Interactive behavior (theme toggle, overlays, accordion, tabs, scroll-spy, custom selects, hamburger menu, etc.). |
| `icons/` | Individual SVG files for all Feather icons (24x24 viewBox). |
| `icons.svg` | Combined SVG sprite sheet. Auto-injected into the DOM by `main.js`; reference icons via `<use href="#icon-name">`. |
| `netlify.toml` | Netlify deploy config with CORS (`Access-Control-Allow-Origin: *`) and caching headers for CDN usage. |
| `starter/index.html` | Minimal template showing how to consume the design system via CDN. |

## Dark Mode

Dark mode is controlled by a `data-theme` attribute on `<html>`:
- `data-theme="light"` — light mode (default)
- `data-theme="dark"` — dark mode

The theme toggle button in `js/main.js` switches this attribute. All semantic tokens in `tokens.css` have both light and dark values. When adding or modifying tokens, always provide both modes.

## Current Component List

### Foundations
Color Tokens, Typography, Spacing, Border Radius, Stroke, Drop Shadows, Inner Shadows, Blur Effects

### Layout
Header (`.ds-header`), Hero (`.ds-hero`), Panel (`.ds-panel`), Card Grid (`.ds-card-grid`), Page Section (`.ds-page-section`), Footer (`.ds-footer`)

### Components
- **Buttons:** `.btn` (`.btn-brand`, `.btn-neutral`, `.btn-subtle`, `.btn-danger`, `.btn-sm`, `.disabled`)
- **Icon Button:** `.btn-icon` (`.btn-brand`, `.btn-neutral`, `.btn-subtle`, `.btn-sm`)
- **Avatars:** `.avatar` (`.avatar-sm`, `.avatar-lg`)
- **Tags:** `.tag` (`.tag-brand`, `.tag-danger`, `.tag-positive`, `.tag-warning`, `.tag-neutral`, `.secondary`)
- **Tag Toggle:** `.tag-toggle` (`.on`, `.off`), `.tag-toggle-group`
- **Tabs:** `.ds-tabs`, `.tab`
- **Tooltips:** `.tooltip`
- **Notifications:** `.notification` (`.alert`, `.positive`, `.warning`)
- **Dialog:** `.dialog-overlay`, `.dialog`
- **Modal:** `.modal-overlay`, `.modal`
- **Blade:** `.blade-overlay`, `.blade-container`
- **Sheet:** `.sheet-overlay`, `.sheet-container` (full-screen overlay)
- **List Row:** `.list-row` (with `.list-row-left`, `.list-row-text`, `.list-row-title`, `.list-row-subtitle`)
- **Table:** `.ds-table`, `.ds-table-header`, `.ds-table-section`
- **Checkbox:** `.checkbox-field`
- **Radio:** `.radio-field`
- **Select:** `.select-field` (custom popover-based dropdown, not native `<select>`). The popover is portaled to `document.body` when open so it escapes `overflow` containers (modals, blades, etc.).
- **Switch:** `.switch-field`
- **Search:** `.search-input`
- **Menu:** `.menu`, `.menu-item`
- **Popover:** `.popover`, `.popover-item`
- **Pagination:** `.pagination`
- **Accordion:** `.ds-accordion`, `.accordion-item`

### Icons
Full Feather icon set. `main.js` auto-injects the sprite into the DOM, so use local refs: `<use href="#icon-name">`.

### Examples
Full-page compositions: Page Newsletter, Page Product, Page Product Results, AI Chatbot.

## How to Update an Existing Component

Follow these steps whenever the user says a component has been changed in Figma.

### 1. Inspect the Figma component

Use the Figma MCP tools to get the latest design context and a screenshot:

```
search_design_system(query="<component name>", fileKey="cpFzRo9We3lWcBNjwvI6iN", includeVariables=false, includeStyles=false)
```

This returns component keys. Then find the node ID using `use_figma`:

```js
// In use_figma — find component nodes by name
const results = [];
for (const page of figma.root.children) {
  await figma.setCurrentPageAsync(page);
  page.findAll(n => {
    if ((n.type === 'COMPONENT' || n.type === 'COMPONENT_SET') && n.name === '<Component Name>') {
      results.push(`[${page.name}] ${n.name} (${n.type}) id=${n.id}`);
    }
    return false;
  });
}
return results.join('\n');
```

Then call:

```
get_design_context(nodeId="<id>", fileKey="cpFzRo9We3lWcBNjwvI6iN")
get_screenshot(nodeId="<id>", fileKey="cpFzRo9We3lWcBNjwvI6iN")
```

### 2. Compare with current CSS

Read the component's CSS section in `css/components.css`. Each section is marked with a comment block:

```css
/* ========================================
   Component Name
   ======================================== */
```

Compare these properties against the Figma design context output:
- Padding, gap, margin
- Border (width, color, radius)
- Background and text colors (should reference `--token` variables, not raw hex)
- Font size, weight, line-height
- Any new variants or states (hover, disabled, active)

### 3. Update CSS

Edit `css/components.css` to match Figma. Always use design token variables from `tokens.css` — never hardcode hex values. Common token patterns:

| Property | Token pattern |
|---|---|
| Background | `var(--bg-default)`, `var(--bg-brand)`, `var(--bg-secondary)` |
| Text color | `var(--text-default)`, `var(--text-secondary)`, `var(--text-brand)` |
| Icon color | `var(--icon-default)`, `var(--icon-on-brand)`, `var(--icon-on-warning)` |
| Border color | `var(--border-default)`, `var(--border-brand)` |
| Border width | `var(--stroke-border)` (1px), `var(--stroke-focus-ring)` (2px) |
| Border radius | `var(--radius-100)` through `var(--radius-full)` |
| Spacing/padding | `var(--space-100)` (4px) through `var(--space-1600)` (160px) |
| Font size | `var(--text-body-small)`, `var(--text-body)`, `var(--text-heading)`, etc. |
| Font weight | `var(--weight-regular)`, `var(--weight-semibold)` |

Note: Icon colors use separate `--icon-*` tokens, not `--text-*` tokens. They often resolve to the same value, but Figma binds them to distinct variables. Always use the icon token for SVG icon colors inside components (e.g., `.tag-warning .tag-dismiss { color: var(--icon-on-warning); }`).

### 4. Update HTML examples

Update the matching examples in `index.html`. Every component section follows this structure:

```html
<div class="section-divider" id="<kebab-id>">
  <h2>Component Name <code class="ref-class">{.css-class}</code></h2>
  <p>Brief description</p>
</div>
<section class="ds-page-section gap-sm" style="max-width: 800px;">
  <p class="variant-label"><span class="ref-class">.class-name</span> — variant description</p>
  <!-- example HTML -->
</section>
```

Each example must have a `.variant-label` paragraph describing the classes/properties used.

### 5. Validate visually

Compare the rendered output against the Figma screenshot. Check spacing, borders, colors, typography, hover states, and responsive behavior.

## How to Add a New Component

### 1. Inspect in Figma

Search for the component, get its node ID, then fetch design context and screenshot (same as update step 1 above).

### 2. Extract design properties

From the `get_design_context` output, identify:
- All variants and their property combinations
- Padding, gap, border, radius, background, text styling
- Which design tokens each value maps to
- Interactive states (hover, active, disabled, focus)
- Child component structure

### 3. Add CSS to `components.css`

Add a new section at the appropriate location in `css/components.css`:

```css
/* ========================================
   New Component Name
   ======================================== */

.new-component { ... }
```

Place it near related components (e.g. form components together, overlays together).

### 4. Add examples to `index.html`

Add a new `section-divider` with a unique `id`, then a `<section>` with labeled examples. Place it in the appropriate group (foundations, layout, components, etc.).

```html
<div class="section-divider" id="new-component">
  <h2>New Component <code class="ref-class">{.new-component}</code></h2>
  <p>Brief description of the component</p>
</div>
<section class="ds-page-section gap-sm" style="max-width: 800px;">
  <p class="variant-label"><span class="ref-class">.new-component</span> — default variant</p>
  <!-- example -->
</section>
```

### 5. Add to sidebar nav

Add a `<a class="menu-item">` link in the appropriate group inside the `<nav class="sidebar-nav">` in `index.html`:

```html
<a class="menu-item" href="#new-component">New Component</a>
```

**Important:** The sidebar nav order must match the scroll order of content on the page. If you add a new section, place the nav link so it appears in the same position relative to other links as the section appears relative to other sections in the page content.

### 6. Add JS behavior (if interactive)

If the component has interactive behavior (toggles, dismissals, overlays), add event listeners in `js/main.js` inside the `DOMContentLoaded` handler.

### 7. Update the README

If the component represents a new category, add it to `README.md` under the appropriate section.

## Token Conventions

- Semantic tokens (e.g. `--bg-brand`, `--text-default`) reference primitive tokens (e.g. `--blue-500`, `--slate-900`)
- Light mode values are under `:root`, dark mode under `[data-theme="dark"]`
- If Figma adds a new token, add both light and dark values to `tokens.css`
- Spacing uses a scale: 100=4px, 200=8px, 300=12px, 400=16px, 500=20px, 600=24px, 800=40px, 1000=56px, 1200=80px, 1400=120px, 1600=160px

## Component Naming Conventions

- CSS classes use kebab-case: `.ds-table`, `.list-row`, `.btn-brand`
- Layout components use `.ds-` prefix: `.ds-header`, `.ds-hero`, `.ds-table`
- Primitive components use short names: `.btn`, `.tag`, `.avatar`
- Variant modifiers are chained: `.btn.btn-brand`, `.tag.tag-brand`
- State classes: `.active`, `.open`, `.disabled`, `.error`
- Utility sub-classes: `.align-right`, `.cell-subtitle`, `.gap-sm`

## Documentation Color-Coding

The showcase page uses color-coded references in headings and example labels:

- `.ref-class` — class name references, colored `--blue-500` (e.g., `.btn-brand`)
- `.ref-token` — token/variable references, colored `--yellow-600` (e.g., `--space-400`)
- `.ref-other` — other code references, colored `--green-500` (e.g., `tokens.css`)

In `<h2>` headings, wrap the `<code>` tag with the appropriate class: `<code class="ref-class">{.btn}</code>`.
In `.variant-label` paragraphs, wrap class names in `<span class="ref-class">`.
Token showcase labels (`.color-swatch-var`, `.spacing-label`, `.radius-meta`, `.shadow-card-value`, `.stroke-meta`, `.blur-meta`) are automatically colored `--yellow-600`.

## Sidebar Nav

The sidebar in `index.html` uses the `.menu-item` component with scroll-spy behavior (via `IntersectionObserver` in `js/main.js`). Clicking a nav link scrolls instantly (not smooth) to the section.

On mobile (under 768px), the sidebar is hidden behind a hamburger menu button (`.hamburger`). Tapping it opens the sidebar as a fixed overlay with a `.sidebar-overlay` backdrop. Tapping a link or the backdrop closes it.

Sections are grouped under headings:

- **Getting Started** — CDN usage, Header
- **Foundations** — Tokens (colors, typography, spacing, radii, shadows, etc.)
- **Layout** — Heroes, panels, card grids, page sections
- **Components** — Buttons, inputs, overlays, lists, tables, etc.
- **Icons** — Full icon grid
- **Examples** — Full-page compositions, Footer

**The sidebar link order must match the content scroll order on the page.** If they get out of sync, users will see confusing behavior when scrolling vs clicking nav items.

## CDN Usage

Other projects consume this design system via CDN links:

```html
<link rel="stylesheet" href="https://starter-project-ds.netlify.app/css/reset.css">
<link rel="stylesheet" href="https://starter-project-ds.netlify.app/css/tokens.css">
<link rel="stylesheet" href="https://starter-project-ds.netlify.app/css/components.css">
<script src="https://starter-project-ds.netlify.app/js/main.js"></script>
```

Icons via SVG sprite (the sprite is auto-injected into the DOM by `main.js`):
```html
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <use href="#heart"></use>
</svg>
```

**Important:** `main.js` fetches `icons.svg` from the CDN and injects it into the page DOM on load. This means consumers use local fragment references (`<use href="#heart">`) instead of cross-origin URLs. External `<use href="https://...icons.svg#name">` is blocked by browsers as a fundamental SVG security restriction — not a CORS issue. Always use `#icon-name` syntax and ensure `main.js` is loaded.

The `netlify.toml` file configures CORS headers (`Access-Control-Allow-Origin: *`) so these assets can be loaded from any domain. Changes pushed to main auto-deploy and immediately affect all consuming projects.
