import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";

  const [rows]: any = await db.query(
    `SELECT id, name 
     FROM universities 
     WHERE name LIKE ? 
     LIMIT 10`,
    [`%${search}%`]
  );

  return NextResponse.json(rows);
}



export async function POST(req: Request) {
  const { name } = await req.json();

  if (!name) {
    return Response.json({ error: "Name required" }, { status: 400 });
  }

  const [existing]: any = await db.query(
    "SELECT id FROM universities WHERE name = ?",
    [name]
  );

  if (existing.length) {
    return Response.json(existing[0]);
  }

  const [result]: any = await db.query(
    "INSERT INTO universities (name) VALUES (?)",
    [name]
  );

  return Response.json({
    id: result.insertId,
    name,
  });
}