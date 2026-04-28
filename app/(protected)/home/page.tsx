import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import HomeClient from "./HomeClient";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const [users]: any = await db.query(
    "SELECT university_id, college_id, course_id, name, email FROM users WHERE email = ?",
    [session.user?.email]
  );

  const dbUser = users[0];

  if (!dbUser?.university_id) {
    redirect("/complete-profile");
  }

  const [personal]: any = await db.query(
    "SELECT id, title, created_at FROM content WHERE university_id = ? ORDER BY created_at DESC LIMIT 6",
    [dbUser.university_id]
  );

  const [latest]: any = await db.query(
    "SELECT id, title, created_at FROM content ORDER BY created_at DESC LIMIT 6"
  );

  return (
    <HomeClient
      name={dbUser.name}
      email={dbUser.email}
      universityId={dbUser.university_id}
      personal={personal}
      latest={latest}
    />
  );
}
