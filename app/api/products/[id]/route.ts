import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { z } from "zod";

const updateSchema = z.object({
  name: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  description: z.string().optional(),
  priceCents: z.number().int().nonnegative().optional(),
  stock: z.number().int().nonnegative().optional(),
  sku: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).optional(),
  orderIndex: z.number().int().optional(),
  images: z.array(z.object({ id: z.string().optional(), url: z.string().url(), alt: z.string().optional(), sortIndex: z.number().int().default(0) })).optional(),
  tags: z.array(z.string()).optional(),
  category: z.string().optional(),
});

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const p = parsed.data;

  const updated = await prisma.$transaction(async (tx) => {
    await tx.product.update({
      where: { id: params.id },
      data: {
        name: p.name ?? undefined,
        slug: p.slug ?? undefined,
        description: p.description ?? undefined,
        priceCents: p.priceCents ?? undefined,
        stock: p.stock ?? undefined,
        sku: p.sku ?? undefined,
        status: p.status ?? undefined,
        orderIndex: p.orderIndex ?? undefined,
        tags: p.tags ?? undefined,
        category: p.category ?? undefined,
      },
    });
    if (p.images) {
      await tx.productImage.deleteMany({ where: { productId: params.id } });
      await tx.productImage.createMany({
        data: p.images.map((i) => ({ productId: params.id, url: i.url, alt: i.alt ?? "", sortIndex: i.sortIndex ?? 0 })),
      });
    }
    return tx.product.findUnique({ where: { id: params.id }, include: { images: true } });
  });

  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.product.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
