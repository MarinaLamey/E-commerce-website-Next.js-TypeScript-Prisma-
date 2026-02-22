import { create } from "zustand";
import { toast } from "react-toastify";
import { addToWishlist, getWishListallItems , WishListResponse , getWishListCount,  WishListItemWithProduct , AddToWishListResponse} from "@/apiCalls/wishlistCalls";

interface WishlistState {
    wishListitems : WishListItemWithProduct[];
    isLoading:boolean;
  loadingItems: Record<number, boolean>;
    isLike:boolean;
    wishlistCount:number;
    loadWishlist: (pageNumber: string) => Promise<void>;
    addItemtoWishlist : (productId:number , userId: number) => Promise<void>;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
wishListitems:[],
isLoading:false,
isLike:false,
loadingItems:{},
wishlistCount:0,
loadWishlist: async(pageNumber) => {
 
    try{
   const data : WishListResponse  = await getWishListallItems(pageNumber);
   set({ wishListitems: data.wishlistItems || [] , isLoading: false });
    }catch(error:any){
    console.log(`failed`)
    }
} ,
addItemtoWishlist: async(productId , userId) => {
  
  set((state) => ({
      loadingItems: { ...state.loadingItems, [productId]: true }
    }));
    try {
            const data : AddToWishListResponse = await addToWishlist(productId, userId);
            
            const currentItems = get().wishListitems;

            if (data.isLiked) {
                set({ 
                    wishListitems: [ ...currentItems , data.newWishlist],
                    isLike: true ,
                    isLoading:false
                });
                   set((state) => {
        const newLoadingItems = { ...state.loadingItems };
        delete newLoadingItems[productId]; 
        return { loadingItems: newLoadingItems };
      });
            } else {
                
                set({ 
                    wishListitems: currentItems.filter(item => item.productId !== productId),
                    isLike: false ,
                    isLoading:false
                });
                   set((state) => {
        const newLoadingItems = { ...state.loadingItems };
        delete newLoadingItems[productId]; 
        return { loadingItems: newLoadingItems };
      });
            }
            toast.success("Item Add To WishList")
        }
    catch(error:any){
    toast.error(error?.response?.data.message)
    set({isLoading: false})
    }

},

  getCategoriesCount: async() => {
     set({isLoading:true});
        try {
            const count = await getWishListCount();
            set({ wishlistCount: count || 0 , isLoading:false });
        } catch (e: any) {
            set({isLoading:false});
        }
  }

}))