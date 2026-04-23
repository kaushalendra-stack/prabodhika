import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const university_id = searchParams.get("university_id");

  const [rows]: any = await db.query(
    "SELECT id, name FROM courses WHERE university_id = ?",
    [university_id]
  );

  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const { name, university_id } = await req.json();

  const [existing]: any = await db.query(
    "SELECT id FROM courses WHERE name = ? AND university_id = ?",
    [name, university_id]
  );

  if (existing.length) return Response.json(existing[0]);

  const [result]: any = await db.query(
    "INSERT INTO courses (name, university_id) VALUES (?, ?)",
    [name, university_id]
  );

  return Response.json({
    id: result.insertId,
    name,
  });
}