import { create } from "zustand";
import { toast } from "react-toastify";
import { Category } from "@/app/generated/prisma";
import { revalidateCategoryTags } from "@/app/actions/revalidateActions";

interface AdminCategorytState {
  Categories: Category[];
  isLoading: boolean;
  // Actions
  fetchCategory: () => Promise<void>;
  addCategory: (formData: any) => Promise<boolean>;
  updateCategory: (id: number, formData: any) => Promise<boolean>;
  deleteCategory: (id: number) => Promise<void>;
}



export const useAdminCategoryStore = create<AdminCategorytState>((set, get) => ({
  Categories: [],
  isLoading: false,

  fetchCategory: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      if (response.ok) set({ Categories: data });
    } catch (e) {
      toast.error("Failed to load products");
    } finally {
      set({ isLoading: false });
    }
  },

  addCategory: async (formData) => {
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Something went wrong");
        return false;
      }

      set((state) => ({ Categories: [data, ...state.Categories] }));
      await revalidateCategoryTags();
      toast.success("Product created successfully! 🚀");
      return true;
    } catch (e) {
      toast.error("Internal server error");
      return false;
    }
  },

  updateCategory: async (id, formData) => {
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
        Categories: state.Categories.map((p) => (p.id === id ? updatedProduct : p)),
      }));

      toast.success("Product updated successfully!");
      return true;
    } catch (e) {
      toast.error("Update failed");
      return false;
    }
  },

  deleteCategory: async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`/api/products/${id}`, { method: 'DELETE' });

      if (response.ok) {
        set((state) => ({
          Categories: state.Categories.filter((p) => p.id !== id),
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