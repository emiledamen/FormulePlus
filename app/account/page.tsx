import { getSession } from "@/lib/auth/session";

export default async function AccountPage() {
  const session = await getSession();
  // Dit is extra defensief; middleware beschermt deze route al.
  if (!session?.user?.email) {
    return (
      <main className="px-4 py-12">
        <div className="max-w-xl mx-auto">Niet ingelogd.</div>
      </main>
    );
  }
  return (
    <main className="px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-semibold">Mijn account</h1>
        <div className="p-4 border rounded-2xl">
          <p className="text-sm opacity-80">Ingelogd als <strong>{session.user.email}</strong></p>
        </div>
        {/* TODO: adresboek, bestellingen */}
      </div>
    </main>
  );
}
