"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function AuthEmailForm() {
  const [email, setEmail] = useState("");
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setWorking(true);
    try {
      // Laat NextAuth de redirect afhandelen naar /verify-request.
      // De magic-link zelf zal na klikken terugkeren met callback naar /account.
      await signIn("email", {
        email,
        // Laat redirect aan (default = true). Geen JSON parsing meer.
        callbackUrl: "/account",
      });
      // Geen setState hier; redirect volgt.
    } catch (err: any) {
      setError(err?.message ?? "Er ging iets mis.");
      setWorking(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto p-6 border rounded-2xl space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">E-mailadres</label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jij@voorbeeld.nl"
          className="w-full border rounded-lg px-3 h-10"
          autoComplete="email"
          disabled={working}
        />
      </div>
      <button
        type="submit"
        className="w-full h-10 rounded-lg border"
        disabled={working}
      >
        {working ? "Versturen..." : "Verstuur magic link"}
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}
