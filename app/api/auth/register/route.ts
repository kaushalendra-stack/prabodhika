import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // ✅ 1. Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // ✅ 2. Check if user exists
    const [existing]: any = await db.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // ✅ 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ 4. Generate verification code
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // ✅ 5. Insert user
    await db.query(
      `INSERT INTO users 
       (name, email, password, verification_code, email_verified, profile_completed)
       VALUES (?, ?, ?, ?, false, false)`,
      [name, email, hashedPassword, verificationCode]
    );

    // ✅ 6. Call PHP email service
    await fetch("https://mail.protoolvault.in/send-verification.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.MAIL_API_KEY!,
      },
      body: JSON.stringify({ email }),
    });

    // ✅ 7. Success response (NO CODE RETURNED)
    return NextResponse.json({
      success: true,
      message: "Verification email sent",
    });

  } catch (error) {
    console.error("Register Error:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}