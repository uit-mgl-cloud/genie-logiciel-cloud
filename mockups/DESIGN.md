```markdown
# Design System Specification: The Algorithmic Manuscript

## 1. Overview & Creative North Star
**Creative North Star: The Technical Monolith**

This design system is built on the intersection of 18th-century editorial prestige and 21st-century terminal logic. It rejects the "app-like" fluidity of the modern web in favor of the permanence and authority of a high-end engineering handbook. 

The aesthetic is "Zero-JS"—it should feel fast, lightweight, and intellectually dense. We achieve a premium feel not through shadows or animations, but through **hyper-precise alignment, exaggerated typographic scale, and intentional asymmetry.** This is a system for content that demands to be read, not scrolled past.

---

## 2. Colors & Surface Architecture

The palette is anchored by a deep, technical charcoal (`#121315`), punctuated by high-visibility accents that evoke the phosphor-glow of early monochromatic monitors and architectural drafting pens.

### The "No-Line" Rule
Traditional 1px solid borders are strictly prohibited for sectioning. Structural boundaries must be defined solely through background color shifts. 
- To separate a sidebar, use `surface-container-low` against a `surface` background.
- To highlight a code block or pull-quote, use `surface-container-high`.
- **Logic:** Lines are for data; surfaces are for structure.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical plates. Use the following tiers to create depth without shadows:
- **Base:** `surface` (#121315) - The foundation.
- **Level 1:** `surface-container-low` (#1b1c1e) - Sub-sections and secondary navigation.
- **Level 2:** `surface-container-high` (#292a2c) - Active cards, emphasized content, or modal-like overlays.

### Signature Textures
While the system is minimal, we avoid "flatness" through color-soul.
- **The Accents:** Use `primary-container` (#c8f080) for technical highlights and `secondary` (#7ed2ee) for interactive navigational cues.
- **Subtle Gradients:** For large hero areas or primary CTAs, use a 45-degree linear gradient from `primary` to `primary-container`. This adds a "machined" metallic quality to the flat lime green.

---

## 3. Typography: Editorial Authority

The soul of this system lies in the tension between the organic, high-contrast serifs of **Fraunces** (Display) and the rigid, monospaced rhythm of **DM Mono** (UI/Body).

- **Display & Headlines (Fraunces):** These are your "Editorial Voice." Use `display-lg` and `headline-lg` for titles. These should feel like a masthead—large, authoritative, and slightly decorative.
- **Body & Labels (DM Mono):** This is your "Technical Voice." DM Mono provides the engineering edge. Use `body-md` for long-form reading. The monospaced nature ensures that columns of text align vertically, reinforcing the grid.
- **Hierarchy through Scale:** Create "Information Densities." A page might feature a massive `display-lg` headline followed immediately by a tiny, monospaced `label-sm` metadata string in `primary-container`.

---

## 4. Elevation & Depth: Tonal Layering

Traditional shadows and rounded corners are abolished. All elements use a `0px` radius. Depth is achieved through "Tonal Stacking."

- **The Layering Principle:** To "lift" an element, change its surface token. An "elevated" card is simply a `surface-container-highest` box sitting on a `surface` background.
- **The "Ghost Border" Fallback:** If a container requires definition against a similar background (e.g., a search input), use a "Ghost Border": the `outline-variant` token at **15% opacity**. It should be felt rather than seen.
- **Brutal Glassmorphism:** For floating elements like sticky headers or tooltips, use `surface-container` with a `backdrop-filter: blur(12px)`. This creates a "frosted technical glass" effect that allows content to bleed through without breaking the grid.

---

## 5. Components

### Buttons
- **Primary:** Solid `primary-container` (#c8f080) with `on-primary-container` text. Hard edges (0px).
- **Secondary:** Ghost style. `outline` color text with a Ghost Border.
- **Tertiary:** Monospaced text with an underscore or a `secondary` (#7ed2ee) chevron.
- **State:** On hover, primary buttons should shift to `primary-fixed-dim`. No transition timing; it should feel instantaneous.

### Cards & Lists
- **Prohibition:** No divider lines between list items.
- **Implementation:** Use `spacing-4` or `spacing-6` to create clear vertical separation. For lists, use a subtle background shift (`surface-container-low`) on hover to indicate interactivity.

### Input Fields
- Avoid four-sided boxes. Use a bottom-only border (`outline`) or a solid `surface-container-highest` background. 
- Labels must use `label-sm` in DM Mono, positioned strictly above the input.

### Technical Callouts (The "Handbook" Component)
A custom component for this system: A box with a `primary-container` left-hand accent bar (4px wide), using `surface-container-low` for the background. Used for "Notes," "Warnings," or "Technical Specifications."

---

## 6. Do’s and Don’ts

### Do:
- **Use "Mathematical" Spacing:** Every margin and padding must be a direct multiple of the Spacing Scale (e.g., `1rem`, `2rem`).
- **Embrace Asymmetry:** Align a headline to the far left and the body text to a narrow column on the right. Leave empty space (white space) to let the content breathe.
- **Hard Edges Only:** Every element must be a perfect rectangle.

### Don't:
- **Don't use Shadows:** Shadows imply a light source; this system is a digital document, not a 3D environment.
- **Don't use Sans-Serif:** Stick strictly to the Serif/Mono pairing. Introducing a sans-serif like Roboto or Inter will break the "Engineering Handbook" aesthetic.
- **Don't Over-Animate:** Avoid "bouncing" or "sliding." If an element must appear, use a simple 0ms opacity flip.

---

## 7. Spacing & Grid Logic

Use a **12-column rigid grid**. 
- Content should typically occupy the center 8 columns for readability. 
- Use the **gutter** (Spacing-4) as a strict "no-fly zone" for text. 
- Elements should "snap" to the grid. If a card spans 4 columns, it must align exactly to the grid lines. This mathematical precision is what creates the "Technical Edge."```