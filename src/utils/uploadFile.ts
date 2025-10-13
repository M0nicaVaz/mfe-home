import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./s3Client";

const BUCKET_NAME = "fiap2files";

export async function uploadToS3(file: File) {
  const fileKey = `uploads/${crypto.randomUUID()}-${file.name}.${file.type}`;
  const fileArrayBuffer = await file.arrayBuffer();

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: fileKey,
    Body: new Uint8Array(fileArrayBuffer),
    ContentType: file.type,
  });

  await s3Client.send(command);

  const fileUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${fileKey}`;

  return {
    key: fileKey,
    url: fileUrl,
  };
}


export async function downloadFromS3(key: string) {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  const response = await s3Client.send(command);

  if (!response.Body) {
    throw new Error("O objeto retornado não contém conteúdo");
  }

  const bytes = await response.Body.transformToByteArray();

  const blob = new Blob([new Uint8Array(bytes)], { type: response.ContentType });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = crypto.randomUUID() || "arquivo";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
