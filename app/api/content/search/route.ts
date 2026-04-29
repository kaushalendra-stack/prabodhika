import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const q = searchParams.get("q") || "";
  const university_id = searchParams.get("university_id");
  const course_id = searchParams.get("course_id");
  const subject_id = searchParams.get("subject_id");
  const sort = searchParams.get("sort") || "latest";

  // Sanitize query - escape special chars for LIKE
  const sanitize = (s: string) => s.replace(/[%%_]/g, "\\$&");
  const qSanitized = sanitize(q);

  let query = `
    SELECT c.*, s.name as subject_name
    FROM content c
    LEFT JOIN subjects s ON c.subject_id = s.id
    WHERE c.deleted_at IS NULL
  `;

  const values: any[] = [];

  if (q) {
    // Search across title, description, body, and metadata (tags)
    query += ` AND (
      c.title LIKE ? OR
      c.description LIKE ? OR
      c.body LIKE ? OR
      c.metadata LIKE ?
    )`;
    const qPattern = `%${qSanitized}%`;
    values.push(qPattern, qPattern, qPattern, qPattern);
  }

  if (university_id) {
    query += ` AND c.university_id = ?`;
    values.push(university_id);
  }

  if (course_id) {
    query += ` AND c.course_id = ?`;
    values.push(course_id);
  }

  if (subject_id) {
    query += ` AND c.subject_id = ?`;
    values.push(subject_id);
  }

  // SORT
  if (sort === "popular") {
    query += ` ORDER BY c.views_count DESC`;
  } else if (sort === "bookmarks") {
    query += ` ORDER BY c.bookmarks_count DESC`;
  } else {
    query += ` ORDER BY c.created_at DESC`;
  }

  query += ` LIMIT 20`;

  try {
    console.log("Search query:", query);
    console.log("Search values:", values);
    const [rows]: any = await db.query(query, values);
    console.log("Search results:", rows.length);
    return NextResponse.json(rows);
  } catch (err) {
    console.error("Search error:", err);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
