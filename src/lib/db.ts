import process from "node:process";

import { createPool, type Pool, type ResultSetHeader } from "mysql2/promise";

export class Database {
    private readonly db: Pool;

    constructor() {
        const uri = process.env.DB_URL;
        if (typeof uri !== "string") {
            throw new Error("Environment variable DB_URL must be set");
        }
        this.db = createPool({
            uri,
            namedPlaceholders: true,
        });
    }

    close(): Promise<void> {
        return this.db.end();
    }

    async ping(): Promise<void> {
        const connection = await this.db.getConnection();
        await connection.ping();
        connection.release();
    }

    async query<T extends object>(
        query: string,
        values?: Record<string, unknown>,
    ): Promise<T[]> {
        const [rows] = await this.db.query(query, values);
        return rows as T[];
    }

    async execute(
        query: string,
        values?: Record<string, unknown>,
    ): Promise<number> {
        const [result] = await this.db.execute<ResultSetHeader>(query, values);
        return result.affectedRows;
    }
}
