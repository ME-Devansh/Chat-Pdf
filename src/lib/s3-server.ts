import AWS from "aws-sdk";
import fs from "fs";
import os from "os";

export async function downloadFromS3(file_key: string) {
  try {
    AWS.config.update({
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    });
    const s3 = new AWS.S3({
      params: {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
      },
      region: "ap-south-1",
    });

    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      Key: file_key,
    };

    const obj = await s3.getObject(params).promise();
    console.log("%c Line:23 🍣 obj", "color:#93c0a4", obj);
    const file_name = `/temp/pdf-${Date.now()}.pdf`;

    // if (!fs.existsSync("temp/")) {
    //   fs.mkdirSync("/temp/", { recursive: true });
    //   console.log(`Directory ${"/temp"} created.`);
    // }

    console.log("%c Line:26 🥖", "color:#33a5ff", obj.Body);
    fs.writeFileSync(file_name, obj.Body as Buffer);
    console.log("%c Line:29 🍎", "color:#ffdd4d");

    return file_name;
  } catch (error) {
    console.error("ERROR =====> downloadFromS3", error);
    return;
  }
}
