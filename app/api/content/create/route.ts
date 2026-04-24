import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" });
    }

    const body = await req.json();

    const {
      title,
      description,
      body: contentBody,
      subject_id,
      university_id,
      college_id,
      course_id,
      folder_name,
      files,
      metadata
    } = body;

    const [users]: any = await db.query(
      "SELECT id FROM users WHERE email = ?",
      [session.user.email]
    );

    const user = users[0];

    const [result]: any = await db.query(
      `INSERT INTO content
      (title, description, body, folder_name,
       subject_id, uploaded_by,
       university_id, college_id, course_id,
       metadata)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        description,
        contentBody,
        folder_name,
        subject_id,
        user.id,
        university_id,
        college_id,
        course_id,
        JSON.stringify(metadata || {})
      ]
    );

    const contentId = result.insertId;

    for (const f of files) {
      await db.query(
        `INSERT INTO content_files
        (content_id, file_name, file_path, file_type, file_size)
        VALUES (?, ?, ?, ?, ?)`,
        [contentId, f.name, f.path, f.type, f.size]
      );
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" });
  }
}