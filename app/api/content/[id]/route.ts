import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    const numericId = Number(id);

    const [rows]: any = await db.query(
      `SELECT c.*, s.name as subject_name
       FROM content c
       LEFT JOIN subjects s ON c.subject_id = s.id
       WHERE c.id = ? LIMIT 1`,
      [numericId]
    );

    if (!rows.length) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const content = rows[0];

    const [files]: any = await db.query(
      "SELECT * FROM content_files WHERE content_id = ?",
      [numericId]
    );

    return NextResponse.json({
      content,
      files,
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" });
  }
}
