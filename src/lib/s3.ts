import { ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";

export class S3 {
    private readonly client: S3Client;

    constructor() {
        this.client = new S3Client();
    }

    async listBuckets(): Promise<string[]> {
        const { Buckets } = await this.client.send(new ListBucketsCommand());
        if (!Buckets) {
            return [];
        }
        return Buckets.map<string>((bucket) => bucket.Name ?? "").filter((name) => name !== "");
    }
}
