import AuthEmailForm from "../../components/AuthEmailForm";

export default function LoginPage() {
  return (
    <main className="px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Inloggen</h1>
        <p className="opacity-80 mb-6">
          Log in met een eenmalige link die we naar je e-mail sturen. Geen wachtwoord nodig.
        </p>
        <AuthEmailForm />
      </div>
    </main>
  );
}
