import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { z } from "zod";

const schema = z.array(z.object({ id: z.string(), orderIndex: z.number().int() }));

export async function PATCH(req: Request) {
  const arr = await req.json();
  const parsed = schema.safeParse(arr);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  await prisma.$transaction(
    parsed.data.map((row) =>
      prisma.product.update({ where: { id: row.id }, data: { orderIndex: row.orderIndex } })
    )
  );

  return NextResponse.json({ ok: true });
}
