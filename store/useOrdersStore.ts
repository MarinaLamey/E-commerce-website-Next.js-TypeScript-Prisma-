import { create } from 'zustand';
import { OrderWithDeepItems } from '../utils/dtos';
import { revalidateProductTags } from "@/app/actions/revalidateActions";
import { toast } from 'react-toastify';
interface OrderState {
  orders: OrderWithDeepItems[];
  orderCount: number;
  loading: boolean;
  error: string | null;

  // Actions
  fetchOrders: (pageNumber: number) => Promise<void>;
  createOrder: (orderData: { City: string; Adress: string; Phone: string }) => Promise<boolean>;
  clearError: () => void;
  getOrdersCount: () => Promise<void>;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],
  orderCount: 0,
  loading: false,
  error: null,

  fetchOrders: async (pageNumber: number) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`/api/order?pageNumber=${pageNumber}`);
      
      if (!res.ok) throw new Error('Failed to fetch orders');
      
      const data = await res.json();
      
      set({ 
        orders: data.orderItems || [], 
        loading: false 
      });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  createOrder: async (orderData) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (res.ok) {
        await get().fetchOrders(1);
        await get().getOrdersCount();
        return true;
      } else {
        set({ error: data.message || "Checkout failed", loading: false });
        toast.error(data.message)
        return false;
      }
    } catch (err) { 
      set({ error: "Network error", loading: false });
     
      return false;
    }
  },

  clearError: () => set({ error: null }),

  getOrdersCount: async () => {
    try {
      const res = await fetch('/api/order/count');
      const count = await res.json();
      set({ orderCount: count || 0 });
    } catch (e: any) {
      console.error("Failed to fetch count");
    }
  },
}));