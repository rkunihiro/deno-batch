import process from "node:process";

import { Redis } from "ioredis";

export class KVS {
    private readonly client: Redis;

    constructor() {
        const url = process.env.KVS_URL;
        if (typeof url !== "string") {
            throw new Error("Environment variable KVS_URL must be set");
        }
        this.client = new Redis(url);
    }

    ping(): Promise<string> {
        return this.client.ping();
    }

    get(key: string): Promise<string | null> {
        return this.client.get(key);
    }

    set(key: string, value: string, seconds = 60): Promise<string> {
        return this.client.setex(key, seconds, value);
    }

    close(): void {
        this.client.disconnect();
    }
}
