import { KMS } from "./lib/kms.ts";

const kms = new KMS();

const encrypted = await kms.encrypt("Hello,World!");
console.log(`encrypted: ${encrypted}`);

const decrypted = await kms.decrypt(encrypted);
console.log(`decrypted: ${decrypted}`);
