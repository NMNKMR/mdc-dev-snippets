import * as SQLite from "expo-sqlite";

export const DATABASE_NAME = "snippets.db";

export const db = SQLite.openDatabaseSync(DATABASE_NAME);
