// app/api/products/stock-check/route.ts
import { NextResponse } from "next/server";
import prisma from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get("ids")?.split(",").map(Number) || [];

  if (ids.length === 0) return NextResponse.json({});

  const products = await prisma.product.findMany({
    where: { id: { in: ids } },
    select: { id: true, stock: true },
  });

  const stockMap = products.reduce((acc, curr) => {
    acc[curr.id] = curr.stock;
    return acc;
  }, {} as Record<number, number>);

  return NextResponse.json(stockMap);
}