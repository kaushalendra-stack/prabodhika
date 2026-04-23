import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { db } from "./db";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        // 🔑 Email + Password
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials: any) {
                const [rows]: any = await db.query(
                    "SELECT * FROM users WHERE email = ?",
                    [credentials.email]
                );

                const user = rows[0];

                if (!user) return null;

                const isValid = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isValid) return null;

                // 🚨 Email verification check
                if (!user.email_verified) {
                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        email_verified: false,
                        profile_completed: user.profile_completed,
                    };
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    profile_completed: user.profile_completed,
                };
            },
        }),

        // 🌐 Google Login
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),

        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
    ],

    session: {
        strategy: "jwt",
    },

    callbacks: {
        async jwt({ token, user }: any) {
            // ✅ Only on login
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.email_verified = user.email_verified;
                token.profile_completed = user.profile_completed;
                token.university_id = user.university_id;
                token.college_id = user.college_id;
                token.course_id = user.course_id;
            }

            return token;
        },

        async signIn({ user, account }: any) {
            if (account.provider === "google" || account.provider === "github") {
                const [rows]: any = await db.query(
                    "SELECT * FROM users WHERE email = ?",
                    [user.email]
                );

                if (rows.length === 0) {
                    await db.query(
                        `INSERT INTO users (name, email, provider, provider_id, email_verified, profile_completed)
                    VALUES (?, ?, ?, ?, true, false)`,
                        [user.name, user.email, account.provider, account.providerAccountId]
                    );
                }
            }

            return true;
        },

        async session({ session, token }: any) {
            // 🔥 Fetch fresh data HERE instead
            const [rows]: any = await db.query(
                "SELECT id, email, password, university_id, college_id, course_id, email_verified, profile_completed FROM users WHERE email = ?",
                [token.email]
            );

            if (rows[0]) {
                session.user.id = rows[0].id;
                session.user.email_verified = rows[0].email_verified;
                session.user.profile_completed = rows[0].profile_completed;

                // 🔥 ADD THESE
                session.user.university_id = token.university_id;
                session.user.college_id = token.college_id;
                session.user.course_id = token.course_id;
            }

            return session;
        },
    },

    pages: {
        signIn: "/login",
    },

    secret: process.env.NEXTAUTH_SECRET,
};