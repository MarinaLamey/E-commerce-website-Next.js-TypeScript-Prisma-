import { create } from "zustand";

interface FilterState {
  sortKey: "default" | "asc" | "desc";
  setSortKey: (key: "default" | "asc" | "desc") => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  sortKey: "default",

  setSortKey: (key) => set({ sortKey: key }),

  resetFilters: () => set({ sortKey: "default" }),
}));