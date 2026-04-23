import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // ✅ Check user exists
    const [rows]: any = await db.query(
      "SELECT email_verified FROM users WHERE email = ?",
      [email]
    );

    if (!rows.length) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // ✅ Already verified?
    if (rows[0].email_verified) {
      return NextResponse.json(
        { error: "Email already verified" },
        { status: 400 }
      );
    }

    // ✅ Generate NEW verification code
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();

    await db.query(
      "UPDATE users SET verification_code = ? WHERE email = ?",
      [newCode, email]
    );

    // ✅ Call PHP mail API
    await fetch("https://mail.protoolvault.in/send-verification.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.MAIL_API_KEY!,
      },
      body: JSON.stringify({ email }),
    });

    return NextResponse.json({
      success: true,
      message: "Verification email resent",
    });

  } catch (error) {
    console.error("Resend Error:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}