# Agent Instructions — Simple Design System

## Overview

This is a static HTML/CSS design system sourced from a Figma file. All components, tokens, and examples live in a single-page showcase (`index.html`) with styles split across CSS files. There is no build step — just static files served via Netlify.

**Figma file key:** `cpFzRo9We3lWcBNjwvI6iN`
**Live URL:** https://starter-project-ds.netlify.app/

## File Map

| File | Purpose |
|---|---|
| `css/tokens.css` | Design tokens as CSS custom properties (colors, spacing, typography, radii, shadows). Light mode under `:root`, dark mode under `[data-theme="dark"]`. Also contains primitive color tokens (e.g. `--blue-100`). |
| `css/components.css` | All component CSS. Each component gets a labeled section header comment. |
| `css/styles.css` | Global body/font styles. Rarely changes. |
| `css/reset.css` | CSS reset. Do not modify. |
| `index.html` | Single-page component showcase. Contains every component example with labels. Has a sidebar nav with scroll-spy. |
| `js/main.js` | Interactive behavior (theme toggle, overlays, accordion, tabs, scroll-spy, etc.). |
| `icons/` | Individual SVG files for all Feather icons. |
| `icons-sprite.svg` | Combined SVG sprite sheet. |
| `netlify.toml` | Netlify deploy config with CORS and caching headers for CDN usage. |
| `starter/index.html` | Minimal template showing how to consume the design system via CDN. |

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
| Border color | `var(--border-default)`, `var(--border-brand)` |
| Border width | `var(--stroke-border)` (1px), `var(--stroke-focus-ring)` (2px) |
| Border radius | `var(--radius-100)` through `var(--radius-full)` |
| Spacing/padding | `var(--space-100)` (4px) through `var(--space-1600)` (160px) |
| Font size | `var(--text-body-small)`, `var(--text-body)`, `var(--text-heading)`, etc. |
| Font weight | `var(--weight-regular)`, `var(--weight-semibold)` |

### 4. Update HTML examples

Update the matching examples in `index.html`. Every component section follows this structure:

```html
<div class="section-divider" id="<kebab-id>">
  <h2>Component Name <code>{.css-class}</code></h2>
  <p>Brief description</p>
</div>
<section class="ds-page-section gap-sm" style="max-width: 800px;">
  <p class="variant-label">.class-name — variant description</p>
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
  <h2>New Component <code>{.new-component}</code></h2>
  <p>Brief description of the component</p>
</div>
<section class="ds-page-section gap-sm" style="max-width: 800px;">
  <p class="variant-label">.new-component — default variant</p>
  <!-- example -->
</section>
```

### 5. Add to sidebar nav

Add a `<a class="menu-item">` link in the appropriate group inside the `<nav class="sidebar-nav">` in `index.html`:

```html
<a class="menu-item" href="#new-component">New Component</a>
```

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

## Sidebar Nav

The sidebar in `index.html` uses the `.menu-item` component with scroll-spy behavior. Sections are grouped under headings:

- **Getting Started** — CDN usage
- **Foundations** — Tokens (colors, typography, spacing, radii, shadows, etc.)
- **Layout** — Header, heroes, panels, card grids, page sections, footer
- **Components** — Buttons, inputs, overlays, lists, tables, etc.
- **Icons** — Full icon grid
- **Examples** — Full-page compositions

When adding a new section, always add both the `id` on the section-divider and the corresponding `<a class="menu-item">` in the sidebar.
