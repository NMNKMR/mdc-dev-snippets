import { db } from "./client";

// Bump this when schema changes; add a matching `if (current < N)` block below.
const DATABASE_VERSION = 2;

type VersionRow = { user_version: number };

export async function migrate(): Promise<void> {
  // Enforce ON DELETE CASCADE. This is a per-connection pragma and must run
  // outside a transaction, so set it on every launch before anything else.
  await db.execAsync("PRAGMA foreign_keys = ON;");

  const row = await db.getFirstAsync<VersionRow>("PRAGMA user_version");
  const current = row?.user_version ?? 0;

  if (current >= DATABASE_VERSION) return;

  if (current < 1) {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';

      CREATE TABLE IF NOT EXISTS snippets (
        id          TEXT    PRIMARY KEY NOT NULL,
        title       TEXT    NOT NULL,
        code        TEXT    NOT NULL,
        language    TEXT    NOT NULL,
        is_favorite INTEGER NOT NULL DEFAULT 0,
        created_at  INTEGER NOT NULL,
        updated_at  INTEGER NOT NULL
      );

      CREATE INDEX IF NOT EXISTS idx_snippets_updated_at
        ON snippets(updated_at DESC);

      CREATE INDEX IF NOT EXISTS idx_snippets_is_favorite
        ON snippets(is_favorite);
    `);
  }

  if (current < 2) {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS tags (
        id   INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE COLLATE NOCASE
      );

      CREATE TABLE IF NOT EXISTS snippet_tags (
        snippet_id TEXT    NOT NULL REFERENCES snippets(id) ON DELETE CASCADE,
        tag_id     INTEGER NOT NULL REFERENCES tags(id)     ON DELETE CASCADE,
        PRIMARY KEY (snippet_id, tag_id)
      );

      CREATE INDEX IF NOT EXISTS idx_snippet_tags_tag
        ON snippet_tags(tag_id);
    `);
  }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
