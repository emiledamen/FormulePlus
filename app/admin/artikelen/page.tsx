"use client";
import useSWR from "swr";
import { useState } from "react";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function AdminProductsPage() {
  const { data, mutate } = useSWR("/api/products", fetcher);
  const [form, setForm] = useState({ name: "", slug: "", priceCents: 0, stock: 0 });

  const create = async () => {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        slug: form.slug,
        priceCents: Number(form.priceCents),
        stock: Number(form.stock),
        status: "DRAFT",
        orderIndex: (data?.length ?? 0),
        images: [],
      }),
    });
    if (res.ok) {
      setForm({ name: "", slug: "", priceCents: 0, stock: 0 });
      mutate();
    } else {
      alert("Kon artikel niet aanmaken");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Artikelen</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <input className="border rounded p-2" placeholder="Naam" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="border rounded p-2" placeholder="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
        <input className="border rounded p-2" type="number" placeholder="Prijs in cents" value={form.priceCents} onChange={(e) => setForm({ ...form, priceCents: Number(e.target.value) })} />
        <input className="border rounded p-2" type="number" placeholder="Voorraad" value={form.stock} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })} />
        <button className="bg-black text-white rounded px-4 py-2" onClick={create}>Nieuw artikel</button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2 pr-3">Naam</th>
            <th className="py-2 pr-3">Prijs</th>
            <th className="py-2 pr-3">Voorraad</th>
            <th className="py-2 pr-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {(data ?? []).map((p: any) => (
            <tr key={p.id} className="border-b">
              <td className="py-2 pr-3">{p.name}</td>
              <td className="py-2 pr-3">€ {(p.priceCents/100).toFixed(2)}</td>
              <td className="py-2 pr-3">{p.stock}</td>
              <td className="py-2 pr-3">{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
