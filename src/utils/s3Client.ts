import { S3Client } from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";

const REGION = "us-east-2";
const IDENTITY_POOL_ID = "us-east-2:7aef9abe-15f6-41ec-a73d-50e85594d86b";

export const s3Client = new S3Client({
  region: REGION,
  runtime: "browser",
  credentials: fromCognitoIdentityPool({
    identityPoolId: IDENTITY_POOL_ID,
    clientConfig: { region: REGION },
  }),
});
