import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" });
    }

    // 🔒 File validation
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "Max file size 10MB" });
    }

    const allowed = ["image", "pdf"];
    const isValid = allowed.some((type) =>
      file.type.includes(type)
    );

    if (!isValid) {
      return NextResponse.json({ error: "Invalid file type" });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = Date.now() + "-" + file.name;
    const uploadDir = path.join(process.cwd(), "public/uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, fileName);

    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({
      path: "/uploads/" + fileName,
    });

  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    return NextResponse.json({ error: "Upload failed" });
  }
}