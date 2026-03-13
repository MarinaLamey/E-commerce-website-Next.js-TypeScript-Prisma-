import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getCartItems, 
  postToCartApi, 
  deleteCartItemApi, 
  getStockCheck, 
  CartResponse 
} from "@/apiCalls/cartCalls";
import { toast } from "react-toastify";
export const cartKeys = {
  all: ["cart"] as const,
};

export const useCart = () => {
  const queryClient = useQueryClient();

  // --- [1] GET: جلب السلة ---
  const cartQuery = useQuery({
    queryKey: cartKeys.all,
    queryFn: async ({ signal }) => {
      const cartData = await getCartItems({ signal });
      
      // تأكدي إن البنية اللي راجعة هي اللي إحنا متوقعينها
      if (cartData?.result?.items?.length > 0) {
        const ids = cartData.result.items.map(item => item.productId).join(',');
        try {
          const stockMap = await getStockCheck(ids);
          // دمج بيانات الـ Stock الحقيقية مع بيانات السلة
          cartData.result.items = cartData.result.items.map(item => ({
            ...item,
            product: {
              ...item.product,
              stock: stockMap[item.productId] ?? item.product.stock
            }
          }));
        } catch (e) {
          console.error("Stock sync fail", e);
        }
      }
      return cartData;
    },
  select: (data) => {
  if (!data || !data.result) return undefined; 

  return {
    items: data.result.items || [],
    totalQuantity: data.result.totalQuantity || 0,
    totalPrice: data.result.totalPrice || 0,
  };
},
staleTime: 1000 * 20, 
   refetchOnMount: true,
    initialData: undefined, 
    retry: 1
  });

  // --- [2] POST (Add & Update) ---
  const cartMutation = useMutation({
    mutationFn: postToCartApi,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: cartKeys.all });
      const previousCart = queryClient.getQueryData<CartResponse>(cartKeys.all);

      queryClient.setQueryData<CartResponse>(cartKeys.all, (old) => {
        if (!old || !old.result) return old;
        const newItems = [...old.result.items];
        const idx = newItems.findIndex(i => i.productId === variables.productId);

        if (idx > -1) {
          newItems[idx] = {
            ...newItems[idx],
            quantity: variables.isUpdate ? variables.quantity : newItems[idx].quantity + variables.quantity
          };
        } else {
          newItems.push({ 
            productId: variables.productId, 
            quantity: variables.quantity, 
            product: { price: 0, name: "Loading..." } 
          } as any);
        }

        return {
          ...old,
          result: { 
            ...old.result, 
            items: newItems,
            totalQuantity: newItems.reduce((acc, i) => acc + i.quantity, 0)
          }
        };
      });
      return { previousCart };
    },
    onSuccess: (data, variables) => {
    // Show different toast based on operation type
    if (variables.isUpdate) {
      toast.success("Quantity updated successfully!");
    } else {
      toast.success("Product added to your cart!");
    }
  },
    onError: (err, vars, context) => {
      if (context?.previousCart) queryClient.setQueryData(cartKeys.all, context.previousCart);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: cartKeys.all }),
  });

  // --- [3] DELETE ---
  const deleteMutation = useMutation({
    mutationFn: deleteCartItemApi,
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: cartKeys.all });
      const previousCart = queryClient.getQueryData<CartResponse>(cartKeys.all);
      
      queryClient.setQueryData<CartResponse>(cartKeys.all, (old) => {
        if (!old || !old.result) return old;
        const filtered = old.result.items.filter(item => item.id !== productId);
        return { ...old, result: { ...old.result, items: filtered } };
      });
      return { previousCart };
    },
    onSuccess: () => {
    // Notify the user that the item is gone
    toast.info("Item removed from cart");
  },
    onSettled: () => queryClient.invalidateQueries({ queryKey: cartKeys.all }),
  });

 const clearCart = () => {
  // 1. Manually set cache to empty (Instant UI update)
  queryClient.setQueryData(cartKeys.all, {
    result: {
      items: [],
      totalQuantity: 0,
      totalPrice: 0,
    }
  });

  // 2. Completely remove the query from cache
  // This prevents any "background refetch" from bringing back old data
  queryClient.removeQueries({ queryKey: cartKeys.all });
};

  return {
    cart: cartQuery.data, 
    isLoading: cartQuery.isLoading,
    isFetching: cartQuery.isFetching, 
    addToCart: (productId: number, quantity: number) => cartMutation.mutate({ productId, quantity, isUpdate: false }),
    updateQuantity: (productId: number, quantity: number) => cartMutation.mutate({ productId, quantity, isUpdate: true }),
    deleteItem: deleteMutation.mutate,
    clearCart,
    isProcessing: cartMutation.isPending || deleteMutation.isPending,
  };
};