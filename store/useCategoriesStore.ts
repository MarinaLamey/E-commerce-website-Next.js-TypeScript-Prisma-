import { create } from "zustand";
import { Category, Product } from "@/app/generated/prisma";

interface CategoriesList {
  allCategories: Category[];
  newCategory: Category[];
}

interface CategoriesState {
  catgories: Category[];
  allCategories: Category[];
  categoryProducts: Product[];
  isLoading: boolean;
  categoryCount: number;
  categoryProductCount: number;

  cachedCategories: Record<string, Category[]>; // كاش للصفحات: { "1": [...], "2": [...] }

  //  (Actions)
  hydrateCategoryList:(category: Category[] , count : number) => void;
  hydrateCategory: (products: Product[], count: number) => void; //for get Products
  hydrateAllCategories: (data: Category[]) => void;
  sortCategoryProduct:(products:Product[], currentPageKey:string ,   sortKey:string ) => Promise<void>;
  //to get stock apdated 
  updateStockOnly: (stockMap: Record<number, number>) => void;
  clearAllCaches: () => void;
}

export const useCategoriesStore = create<CategoriesState>((set, get) => ({
  // Initial State
  catgories:  [],
  allCategories: [],
  categoryProducts: [],
  isLoading: false,
  categoryCount: 0,
  categoryProductCount: 0,
  cachedCategories: {},

  hydrateCategoryList:(category , count) => {
 set({
  catgories:category,
  categoryCount:count
 })
  },
  hydrateCategory: (products, count) =>
    set({
      categoryProducts: products,
      categoryProductCount: count,
      isLoading: false,
    }),
 hydrateAllCategories: (data) => set({ 
    allCategories: data 
  })
  ,
sortCategoryProduct:async(products :Product[] , currentPageKey ,  sortKey) => {
 if (!Array.isArray(products)) return;
 
  if (sortKey === "default") {
      if (currentPageKey === "" || currentPageKey === "bestseller") {
        return ; 
      }
    }
  const items = Array.from(products); 
if (sortKey === "asc") {
    items.sort((a, b) => Number(a.price) - Number(b.price));
  } else if  (sortKey === "desc") {
    items.sort((a, b) => Number(b.price) - Number(a.price));
  }
    
    set({ categoryProducts: items });
  
   
  },
  updateStockOnly: (stockMap) => {
    set((state) => ({
      categoryProducts: state.categoryProducts.map((product) => {
        if (stockMap[product.id] !== undefined) {
          return { ...product, stock: stockMap[product.id] }; 
        }
        return product; 
      }),
    }));
  },
 
  clearAllCaches: () =>
    set({
      categoryProducts: [],
      catgories:[],
      allCategories:[],
      categoryCount: 0,
    }),
}));

export const selectCategoryNames = (state: CategoriesState) =>
  state.catgories.map((category) => category.name);
