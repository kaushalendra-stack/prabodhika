import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const numericId = Number(id);

    if (!numericId) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const session = await getServerSession(authOptions);

    // Get user ID if logged in
    let user_id: number | null = null;
    if (session?.user?.email) {
      const [users]: any = await db.query(
        "SELECT id FROM users WHERE email = ?",
        [session.user.email]
      );
      user_id = users[0]?.id || null;
    }

    // Get IP address
    const forwarded = req.headers.get("x-forwarded-for");
    const ip_address = forwarded ? forwarded.split(",")[0].trim() : "unknown";

    // Check if this user/IP already viewed in the last 24 hours
    const [existing]: any = await db.query(
      `SELECT id FROM content_views
       WHERE content_id = ?
         AND (user_id = ?)
         AND viewed_at > DATE_SUB(NOW(), INTERVAL 24 HOUR)`,
      [numericId, user_id]
    );

    if (existing.length === 0) {
      // Record view
      await db.query(
        "INSERT INTO content_views (content_id, user_id, ip_address) VALUES (?, ?, ?)",
        [numericId, user_id, ip_address]
      );

      // Update count
      await db.query(
        "UPDATE content SET views_count = views_count + 1 WHERE id = ?",
        [numericId]
      );
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("View recording failed:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
