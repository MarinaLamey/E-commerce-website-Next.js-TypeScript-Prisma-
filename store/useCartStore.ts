import { create } from 'zustand';
import { CartItem } from '@/app/generated/prisma';
import { toast } from 'react-toastify';
import { 
  CartItemWithProduct, 
  getCartItems, 
  deleteCartItem, 
  addToCartApi, 
 CartResponse 
} from '../apiCalls/cartCalls';
import axios from 'axios';

interface CartState {
 items: CartItemWithProduct[];
 isLoading: boolean;
cartSubtotal: number;

loadCart: () => Promise<void>;
addItem: (productId: number , qty: number) => Promise<void>;
 removeItem: (itemId: number) => Promise<void>;
 updateQuantity: (itemId: number, productId: number, newQty: number) => Promise<void>;
updateStockOnly: (stockMap: Record<number, number>) => void;
 resetCart : () => void;
 getTotalQuantity: () => number;
 getTotalPrice: () => number;
 clearAllCaches: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
items: [],
 isLoading: false,
 cartSubtotal:0,

loadCart: async () => {
    set({ isLoading: true });
    try {
        const data = await getCartItems();
        set({ items: data.items || [], cartSubtotal: data.totalPrice, isLoading: false });
    } catch (error: any) {
        // إذا السلة غير موجودة (404) أو غير مسجل دخول (401)
        set({ items: [], cartSubtotal: 0, isLoading: false });
    }
},

addItem: async (productId: number, qty: number) => {
    try {
        set({ isLoading: true });
        await addToCartApi(productId, qty);
        
        const data: CartResponse = await getCartItems();
        set({ 
            items: data.items || [], 
            cartSubtotal: data.totalPrice, 
            isLoading: false 
        });

        toast.success(`Added to cart!`);
    } catch (error: any) {
        set({ isLoading: false });
        toast.error(error?.response?.data.message || "Failed to add");
    }
},

 resetCart: () => {

 set( {items:[]} )

 }, updateQuantity: async (itemId: number, productId: number, newQty: number) => {
    const previousItems = get().items;
    
    set({
      items: previousItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQty } : item
      )
    });

    try {
     
      await axios.post(`/api/cart`, { 
        productId, 
        quantity: newQty, 
        isUpdate: true // send flag to server if 
      });
      
      const { data } = await axios.get('/api/cart'); 
      set({ items: data.items, cartSubtotal: data.totalPrice, isLoading: false });

    } catch (error: any) {
      set({ items: previousItems });
      toast.error("Failed to update quantity");
    }
},
  removeItem: async (itemId: number) => {
  const previousItems = get().items;
  const itemToRemove = previousItems.find(i => i.id === itemId);

  set({ 
    items: previousItems.filter(item => item.id !== itemId),
    cartSubtotal: get().cartSubtotal - (itemToRemove ? (itemToRemove.quantity * itemToRemove.product.price) : 0)
  });

  try {
    await deleteCartItem(itemId);

    const data = await getCartItems();
    set({ 
      items: data.items || [], 
      cartSubtotal: data.totalPrice, 
      isLoading: false 
    });

  } catch (error: any) {
    set({ items: previousItems });
    toast.error(error?.response?.data.message || "Failed to remove item");
  }
},
  updateStockOnly: (stockMap) => {
    set((state) => ({
      items: state.items.map((product) => {
        if (stockMap[product.id] !== undefined) {
          return { ...product, stock: stockMap[product.id] }; 
        }
        return product; 
      }),
    }));
  },
 getTotalQuantity: () => {
 return get().items.reduce((acc, item) => acc + item.quantity, 0);
},
 getTotalPrice: () => {
 return get().items.reduce((acc, item) => acc + (item.quantity * item.product.price), 0); },
clearAllCaches: () => {
    set({
        items:[],
        cartSubtotal:0
    })
}
}));