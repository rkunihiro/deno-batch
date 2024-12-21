import { Database } from "./lib/db.ts";

interface User {
    id: number;
    name: string;
    created: Date;
    modified: Date;
}

const db = new Database();

const name = `User${new Date().getTime()}`;
await db.execute("INSERT INTO User (name) VALUES (:name)", { name });

const users = await db.query<User>(`
    SELECT id, name, created, modified
    FROM User
    ORDER BY id ASC
`);
console.log(users);

await db.close();
