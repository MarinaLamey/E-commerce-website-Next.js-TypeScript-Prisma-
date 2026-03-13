import { NextResponse } from "next/server";
import { redis } from "@/lib/redis/redis";

/**
 * @description 
 */
type RouteContext = {
  params: Promise<{ id: string }>; 
};
export async function POST(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

  //get Ip for user 
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(/, /)[0] : "127.0.0.1";

    // 2. creat unique key for product and view
    const rateLimitKey = `product:${id}:viewed:${ip}`;
    
    // 3. check if user view producr 
    const hasViewed = await redis.get(rateLimitKey);

    if (hasViewed) {
      const currentViews = await redis.get(`product:${id}:views`) || 0;
      return NextResponse.json({
        productId: id,
        views: Number(currentViews),
        message: "View already counted recently",
        success: true
      });
    }

    const productKey = `product:${id}:views`;
    const newViewCount = await redis.incr(productKey);

   await redis.set(rateLimitKey, "1", { ex: 1000 });
   //key for most viewd product to get it in get trendy route
  const trendingKey = "trending_products";
  await redis.zincrby(trendingKey, 1, id.toString());
  //
    return NextResponse.json({
      productId: id,
      views: newViewCount,
      success: true
    }, { status: 200 });

  } catch (error) {
    console.error("REDIS_VIEW_POST_ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * @description in view stiuation only
 */
export async function GET(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const productKey = `product:${id}:views`;

    const views = await redis.get(productKey);
    
    return NextResponse.json({ 
      views: views ? Number(views) : 0 
    }, { status: 200 });

  } catch (error) {
    console.error("GET_VIEWS_ERROR:", error);
    return NextResponse.json({ views: 0 }, { status: 200 });
  }
}