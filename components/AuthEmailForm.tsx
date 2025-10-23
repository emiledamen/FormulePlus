"use client";

import { useState } from "react";

export default function AuthEmailForm() {
  const [email, setEmail] = useState("");
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setWorking(true);
    try {
      // 1) Haal CSRF-token op bij NextAuth
      const res = await fetch("/api/auth/csrf");
      const data = await res.json();
      const csrfToken = data?.csrfToken;
      if (!csrfToken) throw new Error("Kon geen CSRF-token ophalen.");

      // 2) Bouw een echte <form> POST naar /api/auth/signin/email zodat de server zelf redirect
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "/api/auth/signin/email";

      const input = (name: string, value: string) => {
        const el = document.createElement("input");
        el.type = "hidden";
        el.name = name;
        el.value = value;
        form.appendChild(el);
      };

      input("csrfToken", csrfToken);
      input("email", email);
      input("callbackUrl", "/account");
      // Belangrijk: GEEN 'json=true' meegeven → server zal redirecten naar verifyRequest

      document.body.appendChild(form);
      form.submit();
      // geen verdere state-updates; de browser navigeert nu weg
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
