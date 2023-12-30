import { loadS3IntoPinecone } from "@/lib/pinecone";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    // console.log("%c Line:7 🍤 body", "color:#ffdd4d", body);

    const { file_key, file_name } = body;
    const pages = await loadS3IntoPinecone(file_key);

    console.log("%c Line:10 🥕", "color:#f5ce50", pages);
    return NextResponse.json({ pages });
  } catch (error) {
    console.error("Create Chat ======>", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
