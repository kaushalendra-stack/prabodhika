import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // ✅ Parse body safely
    const body = await req.json().catch(() => null);

    if (!body || !body.email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const email = body.email.trim().toLowerCase();

    // ✅ Always return success message (security)
    const [rows]: any = await db.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (!rows.length) {
      return NextResponse.json({
        success: true,
        message: "If account exists, email sent",
      });
    }

    // ✅ Generate code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 15 * 60 * 1000);

    // ✅ Save to DB
    await db.query(
      "UPDATE users SET reset_code = ?, reset_expires = ? WHERE email = ?",
      [code, expiry, email]
    );

    // ✅ Call PHP mail service (SAFE)
    try {
      const mailRes = await fetch(
        "https://mail.protoolvault.in/send-reset.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.MAIL_API_KEY || "",
          },
          body: JSON.stringify({ email }),
        }
      );

      const text = await mailRes.text(); // safer than json()
      console.log("MAIL RESPONSE:", text);

    } catch (mailError) {
      console.error("MAIL ERROR:", mailError);
      // don't break flow
    }

    return NextResponse.json({
      success: true,
      message: "Reset code sent",
    });

  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}