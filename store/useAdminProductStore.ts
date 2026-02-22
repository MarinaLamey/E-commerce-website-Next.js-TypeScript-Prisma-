import { create } from "zustand";
import { Product } from "@/app/generated/prisma";
import { toast } from "react-toastify";
import { revalidateProductTags } from "@/app/actions/revalidateActions";

interface AdminProductState {
  products: Product[];
  isLoading: boolean;
  // Actions
  fetchProducts: () => Promise<void>;
  addProduct: (formData: any) => Promise<boolean>;
  updateProduct: (id: number, formData: any) => Promise<boolean>;
  deleteProduct: (id: number) => Promise<void>;
}

export const useAdminProductStore = create<AdminProductState>((set, get) => ({
  products: [],
  isLoading: false,

  fetchProducts: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      if (response.ok) set({ products: data });
    } catch (e) {
      toast.error("Failed to load products");
    } finally {
      set({ isLoading: false });
    }
  },

  addProduct: async (formData) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Something went wrong");
        return false;
      }
      
      set((state) => ({ products: [data, ...state.products] }));
      await revalidateProductTags(data.categoryId);

      toast.success("Product created successfully! 🚀");
      return true;
    } catch (e) {
      toast.error("Internal server error");
      return false;
    }
  },

  updateProduct: async (id, formData) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        toast.error("Failed to update product");
        return false;
      }

      const updatedProduct = await response.json();
      set((state) => ({
        products: state.products.map((p) => (p.id === id ? updatedProduct : p)),
      }));

      toast.success("Product updated successfully!");
      return true;
    } catch (e) {
      toast.error("Update failed");
      return false;
    }
  },

  deleteProduct: async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`/api/products/${id}`, { method: 'DELETE' });

      if (response.ok) {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }));
        toast.success("Product deleted!");
      } else {
        toast.error("Delete failed");
      }
    } catch (e) {
      toast.error("Server error during deletion");
    }
  },
}));