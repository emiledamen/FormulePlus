import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaClient } from "@prisma/client";
import { loginEmailHTML } from "@/emails/loginTemplate";

const prisma = new PrismaClient();

// Helper to send the verification e-mail using Resend's HTTP API (no extra npm deps)
async function sendWithResend(email: string, url: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  if (!apiKey || !from) {
    console.warn("[auth] RESEND_API_KEY/RESEND_FROM niet gezet — e-mail kan niet worden verstuurd.");
    return;
  }
  const payload = {
    from,
    to: email,
    subject: "Jouw FormulePlus inloglink",
    html: loginEmailHTML(url),
  };
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = await res.text();
    console.error("[auth] Resend error", res.status, body);
    throw new Error("Kon geen verificatie-e-mail versturen");
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" },
  providers: [
    EmailProvider({
      async sendVerificationRequest({ identifier, url }) {
        await sendWithResend(identifier, url);
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, user }) {
      if (session?.user) {
        // expose id on the client
        // @ts-expect-error add id
        session.user.id = user.id;
      }
      return session;
    },
  },
};
