# DevSnippets AI

An offline-first mobile app for developers to save, organize, and understand code snippets. Everything — snippets, tags, attachments, AI history — lives locally in SQLite on the device. AI features are bring-your-own-key against OpenRouter, so the app stays free to run.

Built with Expo Router, React Native, TypeScript, SQLite, AsyncStorage, SecureStore, and the new `expo-file-system` API.

## Demo Video Url: https://drive.google.com/file/d/1fpUbdI-N0iTbaDVp7GkImQH3t2lyxtDQ/view?usp=drivesdk

## Screenshots:
<img width="250" height="520" alt="image" src="https://github.com/user-attachments/assets/2388b4c5-f0bb-4a34-970f-85fcde34b50e" />
<img width="250" height="520" alt="image" src="https://github.com/user-attachments/assets/e69d3b0d-db16-4c7d-86a0-83209d8712d9" />
<img width="250" height="520" alt="image" src="https://github.com/user-attachments/assets/940ae89e-fe2e-4b69-9a91-5538aa38df43" />
<img width="250" height="520" alt="image" src="https://github.com/user-attachments/assets/e60d5c9e-563d-4136-9239-ae5743d75a4f" />
<img width="250" height="520" alt="image" src="https://github.com/user-attachments/assets/d5813419-ba07-4040-bb43-031a553a63ca" />
<img width="250" height="520" alt="image" src="https://github.com/user-attachments/assets/4694b428-3ab7-4860-ab90-44af1d7080a4" />
<!-- <img width="250" height="520" alt="image" src="https://github.com/user-attachments/assets/86c35dfe-d204-4fcf-ad36-5ff56f7f1c12" /> -->
<img width="250" height="520" alt="image" src="https://github.com/user-attachments/assets/da54f09f-5758-4381-81e0-7fddacc243c7" />
<img width="250" height="520" alt="image" src="https://github.com/user-attachments/assets/c065b801-4cae-458e-a31c-b71eba62cb34" />
<img width="250" height="520" alt="image" src="https://github.com/user-attachments/assets/8daad5cc-0709-4d0c-9c66-544de3c0e13b" />

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

Open it in a [development build](https://docs.expo.dev/develop/development-builds/introduction/), the [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/), the [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/), or [Expo Go](https://expo.dev/go).

## App structure

```
src/app/
├── _layout.tsx                  (root Stack)
├── search.tsx                   /search
├── (tabs)/
│   ├── _layout.tsx              (Tabs)
│   ├── index.tsx                /
│   ├── favorites.tsx            /favorites
│   ├── add.tsx                  /add
│   ├── files.tsx                /files
│   └── settings.tsx             /settings
└── snippets/
    ├── _layout.tsx              (nested Stack)
    ├── new.tsx                  /snippets/new
    └── [id]/
        ├── index.tsx            /snippets/[id]
        └── edit.tsx             /snippets/[id]/edit
```

A root `Stack` in `src/app/_layout.tsx` provides theming, fonts, and DB migration, then hosts three siblings: the `(tabs)` group (Home, Favorites, Add, Files, Settings rendered by `Tabs` in `(tabs)/_layout.tsx`), a nested `snippets` `Stack` for snippet creation, detail, and editing, and a top-level `search` route that slides in from the right. The "+" tab is a visual stub whose button intercepts presses and pushes `/snippets/new`, while snippet cards across tabs push into the nested `snippets/[id]` stack.

- `src/app/_layout.tsx` → root layout → Wraps the app in providers (React Query, Theme) and declares the root `Stack` containing `(tabs)`, `snippets`, and `search`.
- `src/app/(tabs)/_layout.tsx` → `(tabs)` group layout → Configures the bottom `Tabs` bar, themed header with Brand, and a custom gradient "+" tab button.
- `src/app/(tabs)/index.tsx` → `/` → Home feed listing all snippets filtered by a language tab strip.
- `src/app/(tabs)/favorites.tsx` → `/favorites` → Favorites-only snippet list with the same language filter.
- `src/app/(tabs)/add.tsx` → `/add` → Placeholder screen for the "+" tab button, which actually navigates to `/snippets/new`.
- `src/app/(tabs)/files.tsx` → `/files` → Attachments and exports manager showing managed files, templates, and share actions.
- `src/app/(tabs)/settings.tsx` → `/settings` → Settings screen for API key, default language, theme, and font size preferences.
- `src/app/snippets/_layout.tsx` → `snippets` stack layout → Headerless nested `Stack` for the snippet detail/edit/new flow.
- `src/app/snippets/new.tsx` → `/snippets/new` → Form to create a new snippet, then replaces back to Home.
- `src/app/snippets/[id]/index.tsx` → `/snippets/[id]` → Snippet detail view with code, attachments, AI generation history, and actions.
- `src/app/snippets/[id]/edit.tsx` → `/snippets/[id]/edit` → Pre-populated form for editing an existing snippet.
- `src/app/search.tsx` → `/search` → Top-level search screen with query input and language filter over all snippets.

## Architecture

### Database structure

The local store is a single SQLite database (`snippets.db`) opened synchronously via `expo-sqlite` and accessed through the shared `db` client. All schema lives in `src/db/schema.ts` and runs on every launch.

**Tables**

| Table | Columns | Stores |
|---|---|---|
| `snippets` | `id` (TEXT PK), `title`, `code`, `language`, `is_favorite`, `created_at`, `updated_at` | The user's code snippet — the root entity everything else hangs off. |
| `tags` | `id` (INTEGER PK AUTOINCREMENT), `name` (UNIQUE, NOCASE) | Distinct, case-insensitive tag labels, deduped at the DB layer. |
| `snippet_tags` | `snippet_id` + `tag_id` (composite PK, both FKs) | Many-to-many join between snippets and tags. |
| `attachments` | `id` (TEXT PK), `snippet_id` (FK), `uri`, `name`, `kind`, `size`, `created_at` | File references (images/docs) attached to a snippet; the `uri` points at the filesystem copy. |
| `ai_generations` | `id` (TEXT PK), `snippet_id` (FK), `kind`, `content`, `model`, `created_at` | Cached AI outputs (explanations, refactors, etc.) per snippet, tagged by `kind` and model. |

**ON DELETE CASCADE**

`snippet_tags`, `attachments`, and `ai_generations` all declare `REFERENCES snippets(id) ON DELETE CASCADE`, and `snippet_tags.tag_id` cascades from `tags`. Deleting a snippet wipes its join rows, attachments, and AI history in one statement — no orphan cleanup needed in app code. Cascades only fire when `PRAGMA foreign_keys = ON` is set (see below).

**Indexes**

- `idx_snippets_updated_at (updated_at DESC)` — powers the default "recently edited" home list.
- `idx_snippets_is_favorite` — fast filter for the favorites view.
- `idx_snippet_tags_tag` — reverse lookup "which snippets have tag X" (the composite PK already covers the forward direction).
- `idx_attachments_snippet` — load all attachments for a snippet detail view.
- `idx_ai_gen_snippet_kind_time (snippet_id, kind, created_at DESC)` — fetch the latest generation of a given kind for a snippet without a sort.

**Migration model**

- `ensureSchema()` is a single `CREATE TABLE IF NOT EXISTS` / `CREATE INDEX IF NOT EXISTS` block, called on every app launch. New tables and indexes are added here — it's idempotent and safe to re-run.
- `PRAGMA user_version` is bumped via `DATABASE_VERSION` (currently `4`) and reserved for future one-off `ALTER TABLE` steps that can't be expressed idempotently. The gate in `migrate()` runs them once per version bump.

**Pragmas**

- `journal_mode = 'wal'` — set in `ensureSchema()` for concurrent reads during writes and durable, faster commits.
- `foreign_keys = ON` — set at the top of `migrate()` on every launch; SQLite defaults this off per-connection, and without it the `ON DELETE CASCADE` rules above are silently inert.

### Offline storage approach

DevSnippets AI is offline-first by design: every read and write path touches local storage only, and the network is required exclusively for AI generation calls to OpenRouter.

- **SQLite (`expo-sqlite`, sync open via `openDatabaseSync`)** — the source of truth for all snippet data, including snippets, tags, attachments rows, and join tables. Queries use joins and `EXISTS` subqueries for filtering and search. Chosen because relational data with tag filters and full-text-style lookups belongs in a real query engine, not key-value blobs.
- **AsyncStorage via `zustand/persist`** — user settings only (`themeMode`, `defaultLanguage`, `fontSize`, `aiModel`), serialized through `createJSONStorage(() => AsyncStorage)` with a `partialize` allowlist. Chosen because settings are small, flat, frequently read on render, and benefit from zustand's synchronous in-memory cache.
- **SecureStore (`expo-secure-store`)** — exclusively the per-user OpenRouter API key under `ai.openrouter.key`. Chosen because the key is a credential and belongs in the OS keychain, never in AsyncStorage's unencrypted plaintext on disk.
- **FileSystem (`expo-file-system` class-based `Directory` / `File` / `Paths.document` API)** — binary blobs and generated artifacts: image and document attachments under `Paths.document/attachments/<snippetId>/`, and exported snippet files under `Paths.document/exports/`. Chosen because binary payloads do not belong in SQLite rows, and persisted document-directory paths survive app restarts so SQLite can store stable URIs.

**Offline-first guarantee:** snippet CRUD, search, settings changes, attachment capture, file export, and sharing all complete with the device in airplane mode. Only the AI generation endpoint (OpenRouter) requires connectivity; everything else is local I/O.

### File management

Attachments and exports are stored on disk under the app's document directory and tracked (for attachments) by SQLite rows:

- **Attachments**: `documentDirectory/attachments/<snippetId>/<uuid>.<ext>` — one folder per snippet, files named by a generated UUID with the source extension (defaulting to `.jpg` for images without one).
- **Exports**: `documentDirectory/exports/<sanitized-title>.<ext>` — title is lowercased, non-alphanumeric chars become `-`, and it's clamped to 50 chars (falling back to `snippet`).

**Pick vs persist split.** `pickImageFromLibrary`, `captureImageDraft`, and `pickDocument` return a `DraftAttachment` pointing at the picker's cache URI without touching the database — this is what the create screen uses before a snippet ID exists. Once the snippet is saved, `persistDraftAttachments(snippetId, drafts)` copies each draft into the snippet's folder and inserts an `attachments` row.

**Combined attach helpers.** On the detail/edit screens (where a `snippetId` already exists), `attachImageFromLibrary`, `captureImage`, and `attachDocument` are just `pick` + persist in one call.

**Export formats** (`exportSnippet`):
- `txt` — raw code, `.txt` extension.
- `source` — language-aware extension via `extensionForLanguage` (`.js`, `.ts`, `.py`, `.go`, `.rs`, `.swift`, `.kt`; falls back to `.txt`), contents are the raw code.
- `json` — `.json` backup containing `{ title, language, tags, code }`.

**Sharing.** `shareFile` wraps `expo-sharing`. `exportAndShareSnippet` passes an explicit MIME type — `application/json` for JSON exports, `text/plain` for `txt`/`source` — so the OS share sheet surfaces "Save to Files" / Drive targets instead of just messaging apps.

**File Manager screen** (`(tabs)/files.tsx`) has two sections backed by `useAllAttachments` and `useExports`:
- **Attachments** — grid of tiles across all snippets; tap to view, jump to the owning snippet, or delete via `useDeleteAttachment` (which also deletes the underlying file).
- **Exports** — list of files in the exports folder; tap to share via `shareFile`, or delete via `useDeleteManagedFile`.

**Cleanup on snippet delete.** `deleteSnippetFiles(snippetId)` removes the entire `attachments/<snippetId>` folder; the corresponding `attachments` rows are removed automatically by the foreign-key cascade when the snippet row is deleted.

**Text file viewing.** `readTextFile(uri)` (exposed via the `useFileText` query) reads a file as a string. `isTextFileName` gates which files are safe to read this way — recognized extensions (`js`, `ts`, `py`, `go`, `rs`, `swift`, `kt`, `json`, `md`, `yml`/`yaml`, `html`, `css`, `xml`, `sh`, `txt`, `csv`, `log`) open in `CodeEditor` in read-only mode with the highlighter language picked by `languageFromFileName`. Anything else falls back to `shareFile` so the user can open it in another app.

### AI integration workflow

DevSnippets AI uses **OpenRouter** as its LLM provider, talking to the OpenAI-compatible `/v1/chat/completions` endpoint. The default model is `deepseek/deepseek-chat-v3-...:free` and is user-overridable in Settings (persisted in `settingsStore.aiModel`).

**BYOK (bring your own key).** Each user pastes their own OpenRouter key into Settings. The key is stored in the OS keychain via `expo-secure-store` — never in zustand/AsyncStorage. `services/secrets.ts` exposes `getOpenRouterKey` / `setOpenRouterKey` / `clearOpenRouterKey`, and a `validateOpenRouterKey` helper hits OpenRouter's `/auth/key` endpoint behind the Settings "Validate" button.

**Two operations.** `generate(snippet, kind)` in `services/ai.ts` runs one of:
- `explain` → `{ explanation, summary, suggestions[] }`
- `improve` → `{ summary, improvedCode, notes[] }`

Both are forced into strict JSON via a system prompt (`"respond with valid JSON only"`) plus a schema embedded in the user message.

**Defensive JSON parsing.** Free models love to add preambles and stray fences, so `parseJsonResponse` tries three strategies in order:
1. `JSON.parse` the raw response directly.
2. Strip ```` ```json ```` / ```` ``` ```` fences if the whole payload is fenced, then parse.
3. Pluck the substring from the first `{` to the last `}` and parse that.

If all three fail, it throws `AiError("INVALID_RESPONSE", ...)` with a short preview for the user.

**AiError taxonomy.** A single `AiError` class carries a typed `code`:
- `MISSING_KEY` — no OpenRouter key in SecureStore.
- `NETWORK_ERROR` — `fetch` rejected (offline, DNS, etc.).
- `INVALID_RESPONSE` — empty content or unparseable / malformed JSON.
- `PROVIDER_ERROR` — non-2xx from OpenRouter (rate limit, auth, server error).

`isAiError(err)` is the canonical type guard. It first tries `instanceof AiError`, then falls back to a structural name+code check — Metro fast-refresh frequently ends up with two copies of the class in memory, so `instanceof` alone is not reliable across hot reloads.

**History.** Every successful generation is appended to an `ai_generations` SQLite table (columns: `id`, `snippet_id`, `kind`, `content` as JSON, `model`, `created_at`). The table is append-only — old generations are kept until the user deletes them, and `ON DELETE CASCADE` from the parent snippet cleans them up when a snippet is removed.

**UI flow.**
- `AIBox` (rendered inside `SnippetExtras` on the detail screen) shows **Explain** and **Improve** buttons. While `useGenerate` is pending it swaps the buttons for an inline `ActivityIndicator` + "Generating…" label. On success it fires `onGenerated`, which the parent uses to auto-open the bottom-sheet on the new entry.
- `LatestResponseCard` sits **above** `SnippetExtras` and shows the summary of the most recent generation for the snippet with a **Read more** link that opens the sheet.
- `AISheet` is a slide-up modal (`presentationStyle="formSheet"`) that renders the full history newest-first via `useGenerationHistory`. Each card is tagged `EXPLAIN` or `IMPROVE` and includes the model name and relative timestamp.
- For `improve` entries the sheet also renders a read-only `CodeEditor` preview of `improvedCode` (syntax-highlighted in the snippet's language with line numbers) and a **Replace code** button. The button is hidden — replaced by a green "Applied" row — whenever `content.improvedCode.trim() === snippet.code.trim()`, so users can tell at a glance which suggestion is already live.

**Applying improvements.** Tapping Replace confirms via `Alert` then calls `useApplyImprovement`, which runs `updateSnippet(snippetId, { code: improvedCode })` and invalidates `snippetsKeys.detail(snippetId)` and `snippetsKeys.lists()`, so the detail screen and list re-render with the new code and the "Applied" badge appears on that history entry.

**Error handling.** `AIBox.handleError` routes `AiError` codes to friendly alerts — `MISSING_KEY` deep-links to Settings, `NETWORK_ERROR` becomes an "Offline" alert, `INVALID_RESPONSE` / `PROVIDER_ERROR` surface the underlying message. Non-`AiError` exceptions (DB failures, unexpected JS errors) are surfaced verbatim so they don't get silently swallowed.

### Bonus features

- **Custom CodeEditor** with a real gutter that line-numbers wrapped lines (invisible mirror `<Text>` + `onTextLayout` to count visual rows), syntax highlighting via `react-native-syntax-highlighter` (atomOneDark/atomOneLight), shared `read`/`edit` modes, configurable font size, and CRLF normalization on paste.
- **Three export formats per snippet** picked via bottom-sheet: plain text, true source file with the right extension per language (`extensionForLanguage` maps JS to `.js`, Rust to `.rs`, etc.), and a JSON backup — written into a managed `exports/` directory and handed to the OS share sheet with a matching MIME type.
- **AI generations history** persisted in SQLite per snippet with `EXPLAIN`/`IMPROVE` kinds, a latest-response preview card with "Read more", a full history sheet, per-entry delete, and an idempotent **Replace code** action that hides itself and shows an "Applied" check when the snippet already matches the suggestion.
- **Defensive AI JSON parsing** — direct parse, code-fence stripping, and largest-`{...}`-span fallback so free OpenRouter models that add preambles still work; schema-validated `explain`/`improve` shapes with a typed `AiError` (MISSING_KEY / NETWORK_ERROR / INVALID_RESPONSE / PROVIDER_ERROR) that drives contextual alerts (e.g. "Open Settings" deep-link when the key is missing).
- **BYOK API-key UX** — key stored in `expo-secure-store` (OS keychain, not AsyncStorage), show/hide toggle, paste-from-clipboard button, **Validate & Save** that hits OpenRouter's `auth/key` endpoint before persisting, configurable model id field with free-model hint, and an in-app **Get your key** link via `expo-web-browser`.
- **SnippetCard indicator icons** for AI / image / file presence computed in a single SQL `SELECT` via `EXISTS` subqueries (`has_ai`, `has_image`, `has_file`) alongside `GROUP_CONCAT` tag aggregation — no N+1 queries.
- **Tag system** with case-insensitive uniqueness (`COLLATE NOCASE`), live autocomplete from existing tags, "Add #newtag" inline-create row, and chip-style removal.
- **Per-snippet attachment grouping** — files copied into `documents/attachments/{snippetId}/` so snippet deletion can cascade DB rows (FK `ON DELETE CASCADE`) and physically remove the folder in one call.
- **File content viewer** with extension-based language detection (`.ts`, `.py`, `.json`, `.md`, `.yaml`, etc.) that renders text files in the same CodeEditor with syntax highlighting, and falls back to the system share sheet ("Open in app") for binary types like PDF.
- **Shared FullScreenViewer** with paging arrows, counter, optional add/delete bottom bar — powers the image gallery, multi-file viewer, and the fullscreen code modal from one component.
- **Bottom-sheet modals** (`PickerModal` for theme/language/font-size/export, `AISheet` for history) using `presentationStyle="formSheet"` with grab-handle bars.
- **Haptics** on copy success, favorite toggle, export tap, and a warning haptic on destructive delete.
- **Themed system UI background** — `expo-system-ui` paints the real Android window background on theme changes so the stack slide animation doesn't flash white between routes.
- **Files tab** that lists all attachments across snippets plus generated exports, with name/type search, deep-link from an attachment back to its parent snippet, and per-file delete.
- **Persistent settings** via Zustand + AsyncStorage (theme, default language, editor font size, AI model), with `system`/`light`/`dark` theme mode that respects the OS scheme.
- **Custom Google Fonts** (Hanken Grotesk + JetBrains Mono) coordinated with a manual splash-screen hold until both fonts and SQLite migration finish.
- **SQLite migration scaffold** with `PRAGMA user_version` gating, WAL journal mode, foreign keys on, and indexes on hot columns (`updated_at`, `is_favorite`, `snippet_tags.tag_id`, `ai_generations(snippet_id, kind, created_at)`).
- **TanStack Query** caching layer over every DB/AI mutation for instant UI invalidation across screens.
