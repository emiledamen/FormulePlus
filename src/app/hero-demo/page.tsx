import HeroFull from "@/components/HeroFull";

export const dynamic = "force-static";

export default function Page() {
  // Adjust headerHeight to match your actual navbar height in pixels
  return (
    <main className="min-h-screen bg-white">
      {/* Demo header placeholder with fixed height (simulate your site header) */}
      <div className="h-[72px]" aria-hidden />

      <HeroFull headerHeight={72} />

      {/* Content below hero */}
      <section className="mx-auto max-w-4xl px-6 py-16 text-gray-700">
        <h2 className="text-2xl font-semibold mb-4">Hero demo</h2>
        <p>Deze pagina laat een pagina-vullende hero zien met de bovenkant van de afbeelding uitgelijnd op de headerbalk.</p>
      </section>
    </main>
  );
}
