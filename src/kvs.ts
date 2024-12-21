import { KVS } from "./lib/kvs.ts";

const client = new KVS();

await client.ping();
console.log("Connected to KVS");

const lastAccess = await client.get("lastAccess");
console.log(`Get lastAccess: ${lastAccess}`);

const result = await client.set("lastAccess", new Date().toISOString(), 60);
console.log(`Update lastAccess: ${result}`);

client.close();
