import { create } from "zustand";
import { Order, OrderItem, Product, User } from "@/app/generated/prisma";

export type OrderItemWithProduct = OrderItem & {
  product: Product;
};

export type FullOrder = Order & {
  user: Pick<User, "firstName" | "lastName" | "email" | "phone">;
  items: OrderItemWithProduct[];
};
interface AdminOrderState {
  allOrders: FullOrder[]; 
  totalOrders: number;
  totalRevenue: number;
  avgOrderValue: number;
  isLoading: boolean;
  
  // Actions
  fetchAllOrders: (page: number) => Promise<void>;

}

export const useAdminOrderStore = create<AdminOrderState>((set) => ({
  allOrders: [],
  totalRevenue:0,
  avgOrderValue:0,
  totalOrders: 0,
  isLoading: false,

  fetchAllOrders: async (page) => {
    set({ isLoading: true });
    try {
      const res = await fetch(`/api/admin/orders?pageNumber=${page}`);
      const data = await res.json();
      set({ 
        allOrders: data.orders, 
        totalOrders: data.totalOrders, 
        totalRevenue:data.totalRevenue,
        avgOrderValue:data.avgOrderValue,
        isLoading: false 
      });
    } catch (error) {
      set({ isLoading: false });
      console.error("Admin Fetch Error");
    }
  },

}));