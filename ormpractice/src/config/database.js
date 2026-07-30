import {Pool} from "pg"
import "dotenv/config";

import {drizzle} from "drizzle-orm/node-postgres";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on("error", error => {
    console.error("Unexpected Postgres error", error.message);
});

export const db = drizzle(pool);

export const closeDatabaseConnection = async () => {
    await pool.end();
}