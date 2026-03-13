import { NextResponse } from "next/server";
import { redis } from "@/lib/redis/redis";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const trendingKey = "trending_products";
    
    const topProducts = await redis.zrange(trendingKey, 0, 9, { 
      rev: true, 
      withScores: true 
    });

    if (!topProducts || topProducts.length === 0) {
      return NextResponse.json([]);
    }

    const productIds: number[] = [];
    const viewsMap: Record<string, number> = {};

    for (let i = 0; i < topProducts.length; i += 2) {
      const idStr = String(topProducts[i]);
      const views = Number(topProducts[i + 1]);
      
      const numericId = parseInt(idStr, 10);
      if (!isNaN(numericId)) {
        productIds.push(numericId);
        viewsMap[idStr] = views;
      }
    }

    const products = await prisma.product.findMany({
      where: {
        id: { in: productIds }
      }
    });

    const fullData = products.map(p => ({
      ...p,
      views: viewsMap[String(p.id)] || 0
    })).sort((a, b) => b.views - a.views);

    return NextResponse.json(fullData);

  } catch (error) {
    console.error("TRENDING_ERROR:", error);
    return NextResponse.json([]);
  }
}