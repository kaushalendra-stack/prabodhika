import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { item_type, item_id } = body;

    if (!item_type || !item_id) {
      return NextResponse.json({ error: "Missing item_type or item_id" }, { status: 400 });
    }

    const [users]: any = await db.query(
      "SELECT id FROM users WHERE email = ?",
      [session.user.email]
    );
    const user = users[0];
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if bookmark exists
    const [existing]: any = await db.query(
      "SELECT id FROM bookmarks WHERE user_id = ? AND item_type = ? AND item_id = ?",
      [user.id, item_type, item_id]
    );

    if (existing.length > 0) {
      // Remove bookmark
      await db.query(
        "DELETE FROM bookmarks WHERE user_id = ? AND item_type = ? AND item_id = ?",
        [user.id, item_type, item_id]
      );
      // Decrement count
      if (item_type === "content") {
        await db.query(
          "UPDATE content SET bookmarks_count = GREATEST(0, bookmarks_count - 1) WHERE id = ?",
          [item_id]
        );
      }
      return NextResponse.json({ bookmarked: false });
    } else {
      // Add bookmark
      await db.query(
        "INSERT INTO bookmarks (user_id, item_type, item_id) VALUES (?, ?, ?)",
        [user.id, item_type, item_id]
      );
      // Increment count
      if (item_type === "content") {
        await db.query(
          "UPDATE content SET bookmarks_count = bookmarks_count + 1 WHERE id = ?",
          [item_id]
        );
      }
      return NextResponse.json({ bookmarked: true });
    }

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const item_type = searchParams.get("item_type");
    const item_id = searchParams.get("item_id");

    const [users]: any = await db.query(
      "SELECT id FROM users WHERE email = ?",
      [session.user.email]
    );
    const user = users[0];

    const [rows]: any = await db.query(
      "SELECT id FROM bookmarks WHERE user_id = ? AND item_type = ? AND item_id = ?",
      [user.id, item_type, item_id]
    );

    return NextResponse.json({ bookmarked: rows.length > 0 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
