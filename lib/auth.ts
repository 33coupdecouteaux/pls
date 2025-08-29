import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    // Uncomment and configure if you want to add GitHub OAuth
    // github: {
    //   clientId: process.env.GITHUB_CLIENT_ID as string,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    // },
  },
  trustedOrigins: ["http://localhost:3000"],
});

// Helper to fetch server session (headers/cookies auto handled by better-auth fetch)
export async function getServerSession() {
  try {
  const { headers } = await import('next/headers');
  const res = await auth.api.getSession({ headers: await headers() });
    return res?.session ?? null;
  } catch {
    return null;
  }
}
