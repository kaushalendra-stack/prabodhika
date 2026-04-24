import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");

  if (!title) {
    return NextResponse.json({ exists: false });
  }

  const [rows]: any = await db.query(
    "SELECT id FROM content WHERE title LIKE ? LIMIT 1",
    [`%${title}%`]
  );

  return NextResponse.json({
    exists: rows.length > 0,
  });
}