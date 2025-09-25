import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  priceCents: z.number().int().nonnegative(),
  stock: z.number().int().nonnegative(),
  sku: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
  orderIndex: z.number().int().default(0),
  images: z.array(z.object({ url: z.string().url(), alt: z.string().optional(), sortIndex: z.number().int().default(0) })).default([]),
  tags: z.array(z.string()).default([]),
  category: z.string().optional(),
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") ?? undefined;
  const q = searchParams.get("q") ?? undefined;
  const where: any = {};
  if (status) where.status = status;
  if (q) where.name = { contains: q, mode: "insensitive" };

  const products = await prisma.product.findMany({
    where,
    orderBy: [{ orderIndex: "asc" }, { createdAt: "desc" }],
    include: { images: true },
  });
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const data = await req.json();
  const parsed = productSchema.safeParse(data);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const p = parsed.data;
  const created = await prisma.product.create({
    data: {
      name: p.name,
      slug: p.slug,
      description: p.description ?? null,
      priceCents: p.priceCents,
      stock: p.stock,
      sku: p.sku ?? null,
      status: p.status,
      orderIndex: p.orderIndex,
      tags: p.tags,
      category: p.category ?? null,
      images: { create: p.images.map((i) => ({ url: i.url, alt: i.alt ?? "", sortIndex: i.sortIndex })) },
    },
    include: { images: true },
  });
  return NextResponse.json(created, { status: 201 });
}
