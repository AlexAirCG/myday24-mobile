import type { SQLiteDatabase } from 'expo-sqlite';

export type BudgetItemRow = {
  id: number;
  title: string;
  percent: number;
};

export type BudgetState = {
  totalBudget: number;
  items: BudgetItemRow[];
};

export async function loadBudget(db: SQLiteDatabase): Promise<BudgetState> {
  const totalRow = await db.getFirstAsync<{ total: number }>(
    'SELECT total FROM budget_totals WHERE id = 1',
  );

  const items = await db.getAllAsync<BudgetItemRow>(
    'SELECT id, title, percent FROM budget_items ORDER BY created_at ASC, id ASC',
  );

  return {
    totalBudget: totalRow?.total ?? 0,
    items,
  };
}

export async function setTotalBudget(db: SQLiteDatabase, total: number) {
  await db.runAsync(
    `INSERT INTO budget_totals (id, total) VALUES (1, ?)
     ON CONFLICT (id) DO UPDATE SET total = excluded.total`,
    total,
  );
}

export async function addBudgetItem(
  db: SQLiteDatabase,
  title: string,
): Promise<BudgetItemRow> {
  const result = await db.runAsync(
    'INSERT INTO budget_items (title, percent) VALUES (?, 0)',
    title,
  );

  return { id: result.lastInsertRowId, title, percent: 0 };
}

export async function updateBudgetItemPercent(
  db: SQLiteDatabase,
  id: number,
  percent: number,
) {
  await db.runAsync(
    'UPDATE budget_items SET percent = ? WHERE id = ?',
    percent,
    id,
  );
}

export async function deleteBudgetItem(db: SQLiteDatabase, id: number) {
  await db.runAsync('DELETE FROM budget_items WHERE id = ?', id);
}
