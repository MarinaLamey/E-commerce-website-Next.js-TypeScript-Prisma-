
import { create } from "zustand";
import { User } from "@/app/generated/prisma";
import { toast } from "react-toastify";
import { useCartStore } from "./useCartStore";


interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchProfile: (id: number) => Promise<void>;
  updateProfile: (id: number, data: Partial<User & { password?: string }>) => Promise<void>;
  deleteProfile: (id: number) => Promise<void>;
  setUser: (user: User | null) => void;
  Logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: false,
  error: null,

  setUser: (user) => set({ user }),

  // 1. Get Profile
  fetchProfile: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`/api/user/profile/${id}`);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch profile");
      }
      const data = await res.json();
      set({ user: data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      toast.error(error.message);
    }
  },

  // 2. Update Profile (PUT)
  updateProfile: async (id, updatedData) => {
    set({ isLoading: true });
    try {
      const res = await fetch(`/api/user/profile/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Update failed");
      }

      const data = await res.json();
      set({ user: data, isLoading: false });
      toast.success("Profile updated successfully! ✨");
    } catch (error: any) {
      set({ isLoading: false });
      toast.error(error.message);
    }
  },

  // 3. Delete Profile (DELETE)
  deleteProfile: async (id) => {
    if (!confirm("Are you sure? This action cannot be undone!")) return;

    set({ isLoading: true });
    try {
      const res = await fetch(`/api/user/profile/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Deletion failed");
      }

      set({ user: null, isLoading: false });
      toast.warn("Account deleted. Hope to see you again!");
      
      window.location.href = "/";
    } catch (error: any) {
      set({ isLoading: false });
      toast.error(`Faild`);
    }
  },

  Logout: async() => {
  set({ user: null });
  await fetch(`api/user/logout`);
  useCartStore.getState().resetCart(); 
  window.location.href = "/login";
},

}));