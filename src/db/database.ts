import type { SQLiteDatabase } from 'expo-sqlite';

export async function migrateDb(db: SQLiteDatabase) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS budget_totals (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      total REAL NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS budget_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      percent REAL NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
}
