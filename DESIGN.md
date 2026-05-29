---
name: DevSnippets AI
colors:
  surface: "#121316"
  surface-dim: "#121316"
  surface-bright: "#38393c"
  surface-container-lowest: "#0d0e11"
  surface-container-low: "#1b1b1f"
  surface-container: "#1f1f23"
  surface-container-high: "#292a2d"
  surface-container-highest: "#343538"
  on-surface: "#e3e2e6"
  on-surface-variant: "#b9cacb"
  inverse-surface: "#e3e2e6"
  inverse-on-surface: "#303034"
  outline: "#849495"
  outline-variant: "#3b494b"
  surface-tint: "#00dbe9"
  primary: "#dbfcff"
  on-primary: "#00363a"
  primary-container: "#00f0ff"
  on-primary-container: "#006970"
  inverse-primary: "#006970"
  secondary: "#c7c6ca"
  on-secondary: "#2f3033"
  secondary-container: "#48494c"
  on-secondary-container: "#b9b8bc"
  tertiary: "#f4f5ff"
  on-tertiary: "#2c3039"
  tertiary-container: "#d6d9e5"
  on-tertiary-container: "#5b5f69"
  error: "#FF4D4D"
  on-error: "#690005"
  error-container: "#93000a"
  on-error-container: "#ffdad6"
  primary-fixed: "#7df4ff"
  primary-fixed-dim: "#00dbe9"
  on-primary-fixed: "#002022"
  on-primary-fixed-variant: "#004f54"
  secondary-fixed: "#e3e2e6"
  secondary-fixed-dim: "#c7c6ca"
  on-secondary-fixed: "#1a1b1e"
  on-secondary-fixed-variant: "#46474a"
  tertiary-fixed: "#dfe2ee"
  tertiary-fixed-dim: "#c3c6d2"
  on-tertiary-fixed: "#181c24"
  on-tertiary-fixed-variant: "#434750"
  background: "#121316"
  on-background: "#e3e2e6"
  surface-variant: "#343538"
  lang-js: "#F7DF1E"
  lang-ts: "#3178C6"
  lang-python: "#3776AB"
  lang-go: "#00ADD8"
  lang-rust: "#DEA584"
  lang-swift: "#F05138"
  lang-kotlin: "#7F52FF"
  success: "#4CAF50"
  warning: "#FF9800"
  ai-gradient-start: "#00F0FF"
  ai-gradient-end: "#7000FF"
typography:
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: "700"
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: "600"
    lineHeight: 28px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 24px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 20px
  code-block:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: "400"
    lineHeight: 20px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: "600"
    lineHeight: 16px
    letterSpacing: 0.05em
  badge:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: "700"
    lineHeight: 12px
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 22px
    fontWeight: "700"
    lineHeight: 28px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  margin-mobile: 16px
  gutter: 12px
  stack-sm: 4px
  stack-md: 8px
  stack-lg: 16px
  container-padding: 12px
---

## Brand & Style

The design system is engineered for high-performance developers who demand precision, speed, and a tool that feels like a native extension of their IDE. The brand personality is **technical, focused, and utilitarian**, prioritizing information density and readability over decorative elements.

The aesthetic follows a **High-Density Corporate/Modern** approach, blending the sleekness of _Linear_ with the technical utility of _GitHub_. It utilizes a "Dark Mode Primary" strategy to reduce eye strain during long coding sessions. The visual language is defined by crisp lines, subtle borders, and a singular high-vibrancy accent that guides the user's focus toward primary actions and AI-driven insights.

The emotional goal is to evoke a sense of **uninterrupted flow** and **professional competence**. Every interaction must feel snappy and deliberate, using haptics and precise transitions to reinforce the app’s offline-first reliability.

## Colors

The palette is anchored in a near-black neutral (`#0D0E11`) to provide maximum depth and contrast. The **Primary Accent** is an "Electric Cyan" (`#00F0FF`), used sparingly for interactive elements, status indicators, and the "Explain with AI" hero action.

Surface levels are established using secondary and tertiary grays to create a clear hierarchy of containers without relying on heavy drop shadows. Language-specific badges use their industry-standard hex codes to ensure instant recognition for developers. AI-related features are distinguished by a subtle gradient transition from the primary cyan to a deep purple, signaling a "smart" layer above the standard UI.

## Typography

This system employs a dual-font strategy. **Hanken Grotesk** is used for the UI chrome—titles, buttons, and descriptions—providing a modern, clean, and highly legible interface. **JetBrains Mono** is reserved for code blocks, language badges, and metadata labels, reinforcing the developer-centric nature of the tool.

Code views use a slightly reduced font size (`13px`) to maximize horizontal space on mobile devices, ensuring that nested logic is visible without excessive horizontal scrolling. All labels for technical metadata (timestamps, file sizes, tags) are set in monospaced caps to provide a "system readout" aesthetic.

## Layout & Spacing

The layout utilizes a **fluid grid** model optimized for high information density. On mobile, we maintain a standard 16px side margin, but internal component spacing (gutters and stack-spacing) is tightened to 12px and 8px to allow more content to be visible on screen.

Lists use a "Tight Stack" philosophy where snippet cards have minimal vertical margins, separated by subtle 1px dividers or tonal shifts. Inside code views, we transition to an "Editor Model" with zero horizontal padding for the code block itself, allowing line numbers to sit flush against the left edge to maximize the character-per-line count.

## Elevation & Depth

Depth is conveyed through **Tonal Layers** rather than traditional shadows. In the dark theme, "higher" surfaces are represented by lighter shades of gray:

- **Level 0 (Background):** `#0D0E11`
- **Level 1 (Cards/Inputs):** `#1A1B1E`
- **Level 2 (Modals/Sheets):** `#2F333C`

We use **Low-Contrast Outlines** (`rgba(255,255,255,0.08)`) to define element boundaries. For the AI Bottom Sheet, a **Backdrop Blur** (Glassmorphism) is applied to the background to maintain context of the underlying code while focusing the user on the AI explanation. High-vibrancy glows are reserved exclusively for the "Explain with AI" hero action to make it feel like an energized, premium feature.

## Shapes

The shape language is **Soft (0.25rem)**, leaning toward a more rigid, architectural feel.

- Standard UI elements (Buttons, Inputs) use **4px (0.25rem)** radius.
- Larger containers (Cards, Snippet Previews) use **8px (0.5rem)** radius.
- Language badges and tags use a slightly more rounded **12px** or pill-shape to distinguish them as discrete, removable metadata units.

This slight rounding prevents the UI from feeling "sharp" or aggressive while maintaining the precision of a professional developer tool.

## Components

### Snippet Cards

Cards feature a 1px border. The language badge sits in the top right. The code preview is limited to 3 lines with a fade-out mask. Interaction is indicated by a subtle fill color change on press.

### Language Badges

Small, high-contrast labels using the `badge` typography. The background color corresponds to the language's brand color with a 15% opacity fill and a solid 1px border of the same color.

### Code Blocks

Syntax highlighting should use a theme similar to "One Dark" or "VS Code Dark". Line numbers are rendered in a muted gray (`tertiary_color_hex`). A "Copy" floating action button appears in the top-right corner upon scroll.

### Buttons

- **Primary:** Solid `primary_color_hex` with black text.
- **Secondary:** Transparent with a 1px `tertiary_color_hex` border.
- **AI Hero:** Gradient background with a subtle outer glow (neon cyan).

### Input Fields

Inputs are dark-filled (`secondary_color_hex`) with a bottom-only border that turns primary cyan on focus. The API key input includes a "visibility" toggle and a "Paste" icon button within the field suffix.

### Bottom Sheets

Sheets use a grabber handle at the top center. The "AI Explain" sheet features a typewriter animation for incoming text tokens to simulate real-time processing.
