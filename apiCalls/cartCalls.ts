import { CartItem, Product } from "@/app/generated/prisma";
import axios from "axios";

export type CartItemWithProduct = CartItem & {
  product: Product;
};

export type CartResponse = {
  result: { 
    items: CartItemWithProduct[];
    totalPrice: number;
    totalQuantity: number;
  }
};

// GET: Get Cart
export const getCartItems = async ({ signal }: { signal?: AbortSignal }): Promise<CartResponse> => {
  const { data } = await axios.get("/api/cart", { signal });
  return data;
};

// POST: (إضافة منتج جديد) أو (تعديل كمية موجودة)
export const postToCartApi = async ({ 
  productId, 
  quantity, 
  isUpdate = false 
}: { 
  productId: number; 
  quantity: number; 
  isUpdate?: boolean 
}) => {
  const cleanProductId = Number(productId);
  const cleanQuantity = Number(quantity);

  if (isNaN(cleanProductId) || cleanQuantity <= 0) {
    console.error("❌ Invalid Data before sending:", { productId, quantity });
    throw new Error("Invalid Product ID or Quantity");
  }

  const { data } = await axios.post("/api/cart", { 
    productId: cleanProductId, 
    quantity: cleanQuantity, 
    isUpdate 
  });

  return data;
};

// DELETE: حذف منتج
export const deleteCartItemApi = async (id: number) => {
  const { data } = await axios.delete(`/api/cart/${id}`);
  return data;
};

export const getStockCheck = async (ids: string) => {
  const { data } = await axios.get(`/api/products/stock-check?ids=${ids}`);
  return data; // المفروض يرجع Object { productId: stockCount }
};