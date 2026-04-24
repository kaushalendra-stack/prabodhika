import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const course_id = searchParams.get("course_id");
  const search = searchParams.get("search") || "";

  const [rows]: any = await db.query(
    `SELECT id, name 
     FROM subjects 
     WHERE course_id = ? AND name LIKE ?
     LIMIT 10`,
    [course_id, `%${search}%`]
  );

  return NextResponse.json(JSON.parse(JSON.stringify(rows)));
}

export async function POST(req: Request) {
  const { name, course_id } = await req.json();

  const [existing]: any = await db.query(
    "SELECT id FROM subjects WHERE name = ? AND course_id = ?",
    [name, course_id]
  );

  if (existing.length) return NextResponse.json(existing[0]);

  const [result]: any = await db.query(
    "INSERT INTO subjects (name, course_id) VALUES (?, ?)",
    [name, course_id]
  );

  return NextResponse.json({
    id: result.insertId,
    name,
  });
}