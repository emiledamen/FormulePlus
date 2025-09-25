"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = await signIn("email", { email, redirect: false });
    if (res?.ok) setSent(true);
    else setError("Kon geen magic link sturen. Probeer later opnieuw.");
  };

  return (
    <div className="container mx-auto max-w-md p-6">
      <h1 className="text-2xl font-semibold mb-3">Inloggen</h1>
      <p className="text-sm text-muted-foreground mb-6">Ontvang een magic link in je mailbox.</p>
      {sent ? (
        <div className="p-4 rounded border">Magic link verzonden. Check je e-mail.</div>
      ) : (
        <form onSubmit={submit} className="space-y-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jij@voorbeeld.nl"
            className="w-full border rounded p-2"
          />
          <button className="px-4 py-2 rounded bg-black text-white">Stuur magic link</button>
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </form>
      )}
    </div>
  );
}
