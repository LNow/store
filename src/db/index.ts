import { Pool } from "pg";

export const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "password123",
    min: 10,
    max: 50,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

export const query = (queryText: string, args: any[]) => {
  return pool.query(queryText, args);
};
