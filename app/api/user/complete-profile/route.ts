import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    console.log("STEP 1: API HIT");

    const session = await getServerSession(authOptions);
    console.log("STEP 2: SESSION", session);

    if (!session?.user?.email) {
      console.log("❌ NO SESSION EMAIL");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    console.log("STEP 3: BODY", body);

    const university_id = Number(body.university_id);
    const college_id = Number(body.college_id);
    const course_id = Number(body.course_id);
    const year = Number(body.year);

    console.log("STEP 4:", {
      university_id,
      college_id,
      course_id,
      year,
    });

    if (!university_id || !college_id || !course_id || !year) {
      console.log("❌ VALIDATION FAILED");
      return NextResponse.json(
        { error: "All fields required" },
        { status: 400 }
      );
    }

    console.log("STEP 5: BEFORE DB");

    const result = await db.query(
      `UPDATE users 
       SET university_id = ?, college_id = ?, course_id = ?, year = ?, profile_completed = true
       WHERE email = ?`,
      [
        university_id,
        college_id,
        course_id,
        year,
        session.user.email,
      ]
    );

    console.log("STEP 6: DB RESULT", result);

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error("💥 COMPLETE PROFILE ERROR:", error.message);
    console.error(error.stack);

    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}