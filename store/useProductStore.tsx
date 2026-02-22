import { create } from "zustand";
import { Product } from "@/app/generated/prisma";
import { toast } from "react-toastify";




interface ProductState {
  Product:Product | null;
  bestsellerProducts: Product[];
  bestsellerCount:number,
 offersProducts: Product[];
 offerCount:number;
  isLoading: boolean;
  error: string | null;


 
 fetchProduct :(id : number) => Promise<void>;
  fetchBestsellers: ( product:Product[], count:number ,pageNumber?: number | undefined) => Promise<void>;
  fetchOffers: (Product:Product[] , count:number) => Promise<void>;
  sortProduct:(products:Product[], currentPageKey:string ,   sortKey:string ) => Promise<void>;
    //to get stock apdated 
  updateStockOnly: (stockMap: Record<number, number>) => void;
  clearAllCaches: () => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  Product:null,
  bestsellerProducts: [],
  bestsellerCount:0,
  offersProducts: [],
  offerCount:0,
  isLoading: false,
  error: null,
  cachedOffers: {},


fetchProduct:async(id:number) => {
set({ isLoading: true, error: null }); 
  try {
    const res = await fetch(`/api/products/${id}`);
    const data = await res.json();
    
    console.log("API RAW DATA:", data); 

    const finalProduct = data.product || data;
    
    console.log("FINAL PRODUCT TO SET:", finalProduct); 

    set({ Product: finalProduct, isLoading: false });
  } catch (error: any) {
    console.error("STORE ERROR:", error);
    set({ isLoading: false, Product: null });
  }
},

  fetchBestsellers: async (product , count  , pageNumber = 1) => {
    
    try {
      set({
        bestsellerProducts: product,
        bestsellerCount:count
      })
    } catch (err) {
      set({ isLoading: false, error: "Failed to fetch bestsellers" });
      toast.error("Failed to get bestsellers");
    } 
  },

 fetchOffers: async (product,count) => {
   
    try {
     set({
      offersProducts:product,
      offerCount:count
     })
    } catch (err) {
      set({ isLoading: false });
      toast.error("Failed to get offers");
    }
  },
sortProduct:async(products :Product[] , currentPageKey ,  sortKey) => {
 if (!Array.isArray(products)) return;
 
  if (sortKey === "default") {
      if (currentPageKey === "search" || currentPageKey === "productspage") {
        return ; 
      }
    }
  const items = Array.from(products); 
if (sortKey === "asc") {
    items.sort((a, b) => Number(a.price) - Number(b.price));
  } else if  (sortKey === "desc") {
    items.sort((a, b) => Number(b.price) - Number(a.price));
  }
    
    set({ bestsellerProducts: items  , offersProducts:items});
  
  },
  
  updateStockOnly: (stockMap) => {
    set((state) => ({
      bestsellerProducts: state.bestsellerProducts.map((product) => {
        if (stockMap[product.id] !== undefined) {
          return { ...product, stock: stockMap[product.id] }; 
        } 
        return product; 
      }),
      offersProducts: state.offersProducts.map((product) => {
        if (stockMap[product.id] !== undefined) {
          return { ...product, stock: stockMap[product.id] }; 
        } 
        return product; 
      }),
    }));
  },
  clearAllCaches: () => set({ 
    bestsellerProducts: [], 
    offersProducts: [] 
  }),
}));