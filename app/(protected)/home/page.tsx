import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";

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
    <div className="min-h-screen bg-[var(--cream)] py-8 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Welcome header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl text-[var(--indigo)]">
            Welcome back,{" "}
            <span className="grad-text">{dbUser.name?.split(' ')[0] || "Student"}</span>
          </h1>
          <p className="text-[var(--muted)] mt-1 font-body">
            Discover and share knowledge from your university
          </p>
        </div>

        {/* Search bar */}
        <div className="mb-10">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="10.5" cy="10.5" r="7.5" />
                <path d="M16 16l6 6" strokeLinecap="round" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search notes, resources, or topics..."
              className="w-full pl-12 pr-4 py-4 rounded-3xl border border-[var(--amber)]/20 bg-[var(--warm-bg)] text-[#1c1917] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--saffron)]/30 font-body"
            />
          </div>
        </div>

        {/* Personalized content */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-2xl text-[var(--indigo)]">For You</h2>
            <Link href="/personal" className="text-[var(--saffron)] text-sm font-medium hover:underline">
              View all →
            </Link>
          </div>

          {personal.length === 0 ? (
            <div className="feature-card text-center">
              <p className="text-[var(--muted)]">No personalized content yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {personal.map((item: any) => (
                <Link key={item.id} href={`/content/${item.id}`} className="block no-underline">
                  <div className="feature-card !p-5 hover:border-[var(--saffron)]/30 transition-all">
                    <h3 className="font-semibold text-[var(--indigo)] dark:text-[var(--cream)]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[var(--muted)] mt-2">
                      {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Latest community content */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-2xl text-[var(--indigo)]">Latest from the community</h2>
            <Link href="/latest" className="text-[var(--saffron)] text-sm font-medium hover:underline">
              View all →
            </Link>
          </div>

          {latest.length === 0 ? (
            <div className="feature-card text-center">
              <p className="text-[var(--muted)]">No content yet. Be the first to share!</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {latest.map((item: any) => (
                <Link key={item.id} href={`/content/${item.id}`} className="block no-underline">
                  <div className="feature-card !p-5 hover:border-[var(--saffron)]/30 transition-all">
                    <h3 className="font-semibold text-[var(--indigo)] dark:text-[var(--cream)]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[var(--muted)] mt-2">
                      {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}