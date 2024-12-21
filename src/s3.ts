import { S3 } from "./lib/s3.ts";

const s3 = new S3();

console.log(await s3.listBuckets());
