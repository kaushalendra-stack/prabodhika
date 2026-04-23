import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      email_verified: boolean;
      profile_completed: boolean;
    } & DefaultSession["user"];
  }
}