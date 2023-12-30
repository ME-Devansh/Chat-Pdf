import { Pinecone } from "@pinecone-database/pinecone";
import { downloadFromS3 } from "./s3-server";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
  environment: process.env.PINECONE_ENVIRONMENT!,
});

export async function loadS3IntoPinecone(fileKey: string) {
  //1. Obtain the PDF -> Download and read from PDF
  console.log(
    "%c Line:11 🥓",
    "color:#93c0a4",
    "Dowloading S3 into file system."
  );
  const file_name = await downloadFromS3(fileKey);
  console.log("%c Line:18 🥃 file_name", "color:#4fff4B", file_name);
  if (!file_name) {
    console.log("%c Line:21 🍕", "color:#42b983");
    throw new Error("Could not download from S3.");
  }

  console.log("%c Line:22 🍡 Pinecone.ts", "color:#fca650", file_name);
  const loader = new PDFLoader(file_name);
  //returns all the pages in a pdf.

  console.log("%c Line:26 🥤", "color:#4fff4B");
  const pages = await loader.load();

  console.log("%c Line:29 🥥", "color:#33a5ff");
  return pages;
}
