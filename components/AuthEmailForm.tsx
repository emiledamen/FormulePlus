"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function AuthEmailForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const res = await signIn("email", {
        email,
        redirect: false,
        callbackUrl: "/account",
      });
      if (res?.error) {
        setError(res.error);
      } else {
        setSent(true);
      }
    } catch (err: any) {
      setError(err?.message ?? "Er ging iets mis.");
    }
  }

  if (sent) {
    return (
      <div className="max-w-md mx-auto p-6 border rounded-2xl">
        <h1 className="text-xl font-semibold mb-2">Check je e‑mail</h1>
        <p className="text-sm opacity-80">
          We hebben een link gestuurd naar <strong>{email}</strong>. Klik op die link om in te loggen.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto p-6 border rounded-2xl space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">E‑mailadres</label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jij@voorbeeld.nl"
          className="w-full border rounded-lg px-3 h-10"
          autoComplete="email"
        />
      </div>
      <button
        type="submit"
        className="w-full h-10 rounded-lg border"
      >
        Verstuur magic link
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}
