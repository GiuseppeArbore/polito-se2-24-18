import sqlite3 from 'sqlite3';
import { Database } from 'sqlite';

const env = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : "development"
const dbFilePath = env === "test" ? "./src/db/testdb.db" : "./src/db/db.db"

const db = new Database({
    filename: dbFilePath,
    driver: sqlite3.Database
});

export default db;