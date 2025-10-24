import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { prisma } from "../prisma";
import { loginEmailHTML } from "../../emails/loginTemplate";

async function sendWithResend(email: string, url: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  if (!apiKey || !from) {
    console.warn("[auth] RESEND_API_KEY/RESEND_FROM niet gezet — e-mail wordt niet verstuurd.");
    return;
  }
  const payload = {
    from,
    to: email,
    subject: "Jouw FormulePlus inloglink",
    html: loginEmailHTML(url),
  };
  try {
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
      console.error("[auth] Resend non-2xx", res.status, body);
      // Niet gooien → voorkom 500; site blijft stabiel.
    }
  } catch (e) {
    console.error("[auth] Resend fetch error:", e);
    // Niet gooien → voorkom 500
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
    verifyRequest: "/verify-request",
  },
  callbacks: {
    async session({ session, user }) {
      if (session?.user) {
        // @ts-expect-error add id
        session.user.id = user.id;
      }
      return session;
    },
  },
};
