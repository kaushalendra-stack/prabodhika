import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { email, code, newPassword } = await req.json();

  const [rows]: any = await db.query(
    "SELECT reset_code, reset_expires FROM users WHERE email = ?",
    [email]
  );

  if (!rows.length) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const user = rows[0];

  if (user.reset_code !== code) {
    return NextResponse.json({ error: "Invalid code" }, { status: 400 });
  }

  if (new Date(user.reset_expires) < new Date()) {
    return NextResponse.json({ error: "Code expired" }, { status: 400 });
  }

  const hashed = await bcrypt.hash(newPassword, 10);

  await db.query(
    `UPDATE users 
     SET password = ?, reset_code = NULL, reset_expires = NULL 
     WHERE email = ?`,
    [hashed, email]
  );

  return NextResponse.json({ success: true });
}