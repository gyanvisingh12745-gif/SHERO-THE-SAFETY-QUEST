import initSqlJs, { Database } from 'sql.js';
import fs from 'fs';
import path from 'path';
import { SCHEMA_SQL } from './db/schema';
import { seedDatabase } from './db/seed';

let db: Database | null = null;
const dbDir = path.resolve(process.cwd(), 'data');
const dbFilePath = path.join(dbDir, 'shero.sqlite');

export async function initDatabase(): Promise<Database> {
  if (db) return db;

  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  const SQL = await initSqlJs();

  if (fs.existsSync(dbFilePath)) {
    const fileBuffer = fs.readFileSync(dbFilePath);
    db = new SQL.Database(fileBuffer);
  } else {
    db = new SQL.Database();
  }

  // Execute schema DDL
  db.run(SCHEMA_SQL);

  // Seed default 12 missions, characters, achievements, and safety resources
  seedDatabase(db);

  persistDatabase();
  return db;
}

export function getDatabase(): Database {
  if (!db) {
    throw new Error('Database is not initialized. Call initDatabase() first.');
  }
  return db;
}

export function persistDatabase() {
  if (!db) return;
  try {
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(dbFilePath, buffer);
  } catch (err) {
    console.error('[DB Persist Error]', err);
  }
}

/**
 * Executes a parameterized SELECT query returning an array of row objects
 */
export function queryAll<T = any>(sql: string, params: any[] = []): T[] {
  const database = getDatabase();
  const stmt = database.prepare(sql);
  if (params.length > 0) {
    stmt.bind(params);
  }
  const results: T[] = [];
  while (stmt.step()) {
    results.push(stmt.getAsObject() as unknown as T);
  }
  stmt.free();
  return results;
}

/**
 * Executes a parameterized SELECT query returning a single row object or null
 */
export function queryOne<T = any>(sql: string, params: any[] = []): T | null {
  const rows = queryAll<T>(sql, params);
  return rows.length > 0 ? rows[0] : null;
}

/**
 * Executes an INSERT, UPDATE, or DELETE query with parameters and triggers database persistence
 */
export function execute(sql: string, params: any[] = []): void {
  const database = getDatabase();
  database.run(sql, params);
  persistDatabase();
}

/**
 * Legacy support: recordGameResult
 */
export function recordGameResult(
  missionId: string,
  score: number,
  status: 'completed' | 'lost',
  decisionsCompleted: number
) {
  const database = getDatabase();

  database.run(
    `INSERT INTO game_results (mission_id, score, status, decisions_completed) VALUES (?, ?, ?, ?)`,
    [missionId, score, status, decisionsCompleted]
  );

  if (status === 'completed') {
    const existing = queryOne<{ best_score: number; completed_count: number }>(
      `SELECT best_score, completed_count FROM mission_completions WHERE mission_id = ?`,
      [missionId]
    );

    if (existing) {
      const currentBest = Number(existing.best_score);
      const newBest = Math.max(currentBest, score);
      database.run(
        `UPDATE mission_completions SET best_score = ?, completed_count = completed_count + 1, last_completed_at = CURRENT_TIMESTAMP WHERE mission_id = ?`,
        [newBest, missionId]
      );
    } else {
      database.run(
        `INSERT INTO mission_completions (mission_id, best_score, completed_count) VALUES (?, ?, 1)`,
        [missionId, score]
      );
    }
  }

  persistDatabase();
}

/**
 * Legacy support: getAggregateStats
 */
export function getAggregateStats() {
  const database = getDatabase();

  const totalRunsRes = database.exec(`SELECT COUNT(*) FROM game_results`);
  const totalRuns = totalRunsRes.length > 0 && totalRunsRes[0].values.length > 0 ? Number(totalRunsRes[0].values[0][0]) : 0;

  const successfulRunsRes = database.exec(`SELECT COUNT(*) FROM game_results WHERE status = 'completed'`);
  const successfulRuns = successfulRunsRes.length > 0 && successfulRunsRes[0].values.length > 0 ? Number(successfulRunsRes[0].values[0][0]) : 0;

  const failedRuns = totalRuns - successfulRuns;

  const completionsRes = database.exec(`SELECT mission_id, best_score, completed_count FROM mission_completions`);
  const missionStats: Record<string, { bestScore: number; completions: number }> = {};
  if (completionsRes.length > 0) {
    completionsRes[0].values.forEach(row => {
      missionStats[String(row[0])] = {
        bestScore: Number(row[1]),
        completions: Number(row[2])
      };
    });
  }

  return {
    totalRuns,
    successfulRuns,
    failedRuns,
    missionStats
  };
}
