import { Buffer } from "node:buffer";

import { DecryptCommand, EncryptCommand, KMSClient } from "@aws-sdk/client-kms";

const keyId = "alias/test-key";

export class KMS {
    private readonly client: KMSClient;

    constructor() {
        this.client = new KMSClient();
    }

    async encrypt(value: string): Promise<string> {
        const { CiphertextBlob } = await this.client.send(
            new EncryptCommand({
                KeyId: keyId,
                Plaintext: Buffer.from(value, "utf8"),
            }),
        );
        return CiphertextBlob ? Buffer.from(CiphertextBlob).toString("base64") : "";
    }

    async decrypt(value: string): Promise<string> {
        const { Plaintext } = await this.client.send(
            new DecryptCommand({
                CiphertextBlob: Buffer.from(value, "base64"),
            }),
        );
        return Plaintext ? Buffer.from(Plaintext).toString("utf8") : "";
    }
}
