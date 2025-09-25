import NextAuth, { type NextAuthConfig } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma) as any,
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    EmailProvider({
      sendVerificationRequest: async ({ identifier, url }) => {
        const { host } = new URL(url);
        const brand = process.env.NEXT_PUBLIC_BRAND_NAME ?? "FormulePlus";
        const subject = `Log in bij ${brand}`;
        const html = `
          <div style="font-family:Inter,system-ui,Segoe UI,Helvetica,Arial,sans-serif;line-height:1.6;padding:24px">
            <h2 style="margin:0 0 16px 0;">Inloggen bij ${brand}</h2>
            <p style="margin:0 0 12px 0;">Klik op de knop hieronder om in te loggen. Deze link is <strong>eenmalig</strong> geldig en vervalt binnen 15 minuten.</p>
            <p style="margin:24px 0;">
              <a href="${url}" style="background:#111;color:#fff;text-decoration:none;padding:12px 16px;border-radius:8px;display:inline-block">
                Log in
              </a>
            </p>
            <p style="font-size:12px;color:#666">Als je de knop niet kunt gebruiken, kopieer en plak deze link in je browser:<br>${url}</p>
            <p style="font-size:12px;color:#999">Verzonden door ${host}</p>
          </div>`;

        await resend.emails.send({
          from: process.env.EMAIL_FROM ?? "no-reply@auth.formuleplus.nl",
          to: identifier,
          subject,
          html,
        });
      },
      maxAge: 15 * 60,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role ?? "user";
      return token;
    },
    async session({ session, token }) {
      (session as any).role = (token as any).role ?? "user";
      return session;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
