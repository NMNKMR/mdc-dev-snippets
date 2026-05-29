# DevSnippets AI — UI Requirements for Google Stitch

> Purpose of this document: brief Google Stitch (or any UI design tool) with the **what** of the app — screens, content, interactions, constraints — without prescribing the exact visual layout. Suggestions are flagged as such; everything else is a requirement.

---

## 1. App Identity

- **Name:** DevSnippets AI
- **Type:** Mobile app (iOS + Android), built with Expo / React Native
- **Tagline (suggestion):** "Your offline code library, with AI."
- **One-liner:** An offline-first developer utility to save, organize, search, and understand code snippets — with optional AI explanations.

## 2. Audience

- Developers, from junior to senior
- People who collect reusable code patterns
- Devs who want a mobile reference during commute, meetings, or away from their laptop

## 3. Design Direction (suggestions, not mandates)

These are starting points. Stitch is free to push back.

- **Dark theme primary** — devs live in dark editors; light theme should still exist for accessibility
- **Monospace font for all code areas** (e.g., JetBrains Mono, Fira Code, or system monospace)
- **Sans-serif for UI chrome** (titles, labels, buttons)
- **Accent color:** a single bright accent on a near-black background — open suggestions: electric blue, neon green, neon purple
- **Information density:** generous breathing room in lists, but dense and editor-like inside code views
- **Native feel:** platform-appropriate navigation, gestures, haptics — not a web app on a phone

## 4. Navigation Shell

- **Bottom tab bar with 4 tabs:** Home · Favorites · Files · Settings
- **Modal / bottom sheet presentation** for: Create snippet, AI Explain, action menus
- **Stack navigation** for: Snippet Details → Edit
- Bottom sheets should feel native on both iOS and Android

---

## 5. Screen Requirements

### 5.1 Home Screen

**Purpose:** Entry point. List all snippets, search, filter, create new.

**Must include:**
- List or grid of all snippets (Stitch's call which one — could also support both, toggleable)
- Each snippet preview shows: title, language badge, short code preview (first 2–3 lines), tags, favorite indicator
- Search bar (filters by title, code content, tags)
- Filter mechanism for language and tags (chips, dropdown — designer's call)
- Primary action to create a new snippet (FAB or top-right "+", designer's call)
- Empty state when no snippets exist (illustration + CTA)

**Suggested interactions:**
- Long-press a card → quick action menu (favorite, share, export, delete)
- Tap card → snippet details
- Swipe actions (left/right) as a power-user shortcut

---

### 5.2 Create / Edit Snippet Screen

**Purpose:** Add a new snippet or edit an existing one.

**Must include:**
- Title input
- Language selector (picker / dropdown)
- Multiline code input area (monospace)
- Tag input (add/remove tags, autocomplete from existing)
- Favorite toggle
- Attach image / screenshot button
- Save and Cancel actions

**Suggested:**
- Live syntax highlighting inside the code input
- Auto-detect language from code
- Save as draft if the user backs out

---

### 5.3 Snippet Details Screen

**Purpose:** View a single snippet, take actions on it.

**Must include:**
- Title, language badge, tags
- Full syntax-highlighted code block (with copy button)
- Created / updated timestamps
- Attached images (thumbnail row, tap to expand)
- Action set: Copy, Share, Export, **Explain with AI**, Edit, Delete, Favorite toggle

**Suggested:**
- Persistent action bar (top or bottom)
- Long code = scrollable, not truncated
- "Explain with AI" should feel like a hero action — it's a differentiator

---

### 5.4 AI Explain (Bottom Sheet)

**Purpose:** Show AI-generated content for the currently viewed snippet.

**Must include:**
- Three sections (tabs, segments, or stacked — designer's call):
  1. **Explanation** — detailed breakdown of what the code does
  2. **Summary** — one-paragraph TL;DR
  3. **Suggestions** — improvements / refactors / gotchas
- Loading state (skeleton or shimmer)
- Error states: offline, no API key set, API error
- Regenerate button
- Dismiss via swipe-down gesture

**Suggested:**
- Stream tokens as they arrive (typewriter feel)
- Copy button per section
- "Open in Settings" deep-link when no API key is set

---

### 5.5 Favorites Screen

**Purpose:** Quick access to starred snippets.

- Same card design as Home, filtered to favorites
- Empty state when none are favorited

---

### 5.6 File Manager Screen

**Purpose:** Browse local files — attachments, exports, templates.

**Must include:**
- Sectioned list: Attachments · Exports · Templates
- File type icons (image, `.txt`, `.js`, `.json`)
- File name, size, date
- Per-file actions: open, share, delete
- Empty state per section

**Suggested:**
- Grid view for images, list view for code files
- Bulk-select mode

---

### 5.7 Settings Screen

**Purpose:** App config and AI setup.

**Must include:**
- **Appearance:** theme (System / Light / Dark)
- **Editor:** default language for new snippets, font size
- **AI section:**
  - API key input (masked by default, show/hide toggle, paste button, validate/test button)
  - Provider/model selector
  - Link out: "Get your API key" (opens provider dashboard in browser)
- **Data section:** export all snippets, import snippets, clear AI cache
- **About:** version, links, credits

---

### 5.8 Empty & Error States

Stitch should design dedicated states for:
- No snippets yet (Home)
- No favorites yet
- Search returned no results
- No internet (AI features)
- No API key configured
- AI request failed

---

## 6. Reusable Components Stitch Should Design

These show up across multiple screens — design them once, use them everywhere:

- **Snippet card** — compact (list) and expanded (detail) variants
- **Language badge** — color-coded per language (suggestion: JS yellow, TS blue, Python yellow/blue, Go cyan, Rust orange, etc.)
- **Tag chip** — selectable, removable variants
- **Code block** — with line numbers, language label, copy button
- **Tab bar** — bottom navigation
- **Floating action button** (if FAB is chosen)
- **Search bar** — with embedded filter button
- **API key input** — masked, with show/hide, paste, and validate affordances
- **Bottom sheet shell** — for AI Explain and action menus
- **Toast / snackbar** — for "Saved", "Copied", "Deleted with undo"
- **Empty state template** — illustration + heading + CTA

---

## 7. Cross-Cutting UX Requirements

- Haptic feedback on key actions: favorite, delete, copy
- Toast confirmations on destructive actions (with undo where reasonable)
- Native-feeling transitions (push/modal/sheet)
- Accessible: minimum 44pt tap targets, sufficient contrast in both themes
- All copy in **English**, concise, dev-friendly tone (avoid corporate-speak)

---

## 8. Out of Scope (do NOT design)

- Login / sign-up flows — the app is offline-first, no accounts
- Cloud sync UI
- Social / sharing-to-feed features
- Payment / subscription screens

---

## 9. Optional / Stretch

If Stitch has bandwidth, design ideas for:
- **Onboarding** (2–3 screens introducing snippets, offline use, AI)
- **Collections / folders** to group snippets
- **Markdown notes** attached to a snippet
- **Snippet templates** marketplace

---

## 10. Reference Vibes (for moodboard)

- GitHub mobile (clean, code-first)
- Raycast (dense but readable, command-driven feel)
- Linear (precise typography, restrained color)
- Obsidian mobile (offline-first power user app)
- VS Code dark theme palette
