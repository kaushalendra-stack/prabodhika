import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    const [rows]: any = await db.query(
      "SELECT verification_code FROM users WHERE email = ?",
      [email]
    );

    if (!rows.length) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (rows[0].verification_code !== code) {
      return NextResponse.json({ error: "Invalid code" }, { status: 400 });
    }

    await db.query(
      `UPDATE users 
       SET email_verified = true, verification_code = '0'
       WHERE email = ?`,
      [email]
    );

    return NextResponse.json({ success: true });

  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}