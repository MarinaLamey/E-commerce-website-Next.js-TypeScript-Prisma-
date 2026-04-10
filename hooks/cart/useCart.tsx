"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getCartItems, 
  postToCartApi, 
  deleteCartItemApi, 
  getStockCheck, 
  CartResponse 
} from "@/apiCalls/cartCalls";
import { toast } from "react-toastify";

// Cache keys for the cart
export const cartKeys = {
  all: ["cart"] as const,
};

export const useCart = () => {
  const queryClient = useQueryClient();

  // --- [1] GET: Fetch Cart and Sync Stock ---
  const cartQuery = useQuery({
    queryKey: cartKeys.all,
    queryFn: async ({ signal }) => {
      // Fetch basic cart data
      const cartData = await getCartItems({ signal });
      
      // Perform manual stock synchronization to ensure data accuracy
      if (cartData?.result?.items?.length > 0) {
        const ids = cartData.result.items.map(item => item.productId).join(',');
        try {
          const stockMap = await getStockCheck(ids);
          cartData.result.items = cartData.result.items.map(item => ({
            ...item,
            product: {
              ...item.product,
              stock: stockMap[item.productId] ?? item.product.stock
            }
          }));
        } catch (e) {
          console.error("Manual stock sync failed", e);
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
    // Configuration to ensure data freshness without WebSockets
    staleTime: 1000 * 30, // Data is considered stale after 30 seconds
    refetchOnWindowFocus: true, // Refresh data when the user returns to the tab
    retry: 1
  });

  // --- [2] POST: Add & Update (Optimistic Update) ---
  const cartMutation = useMutation({
    mutationFn: postToCartApi,
    onMutate: async (variables) => {
      // Cancel ongoing queries to prevent overwriting the optimistic state
      await queryClient.cancelQueries({ queryKey: cartKeys.all });
      
      const previousCart = queryClient.getQueryData<CartResponse>(cartKeys.all);

      // Update cache immediately before server response
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
          // Add a temporary item if it doesn't exist
          newItems.push({ 
            productId: variables.productId, 
            quantity: variables.quantity, 
            product: { price: 0, name: "Updating..." } 
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
      if (variables.isUpdate) {
        toast.success("Quantity updated successfully!");
      } else {
        toast.success("Product added to your cart!");
      }
    },
    onError: (err, vars, context) => {
      // Revert to previous state on failure
      if (context?.previousCart) queryClient.setQueryData(cartKeys.all, context.previousCart);
      toast.error("Failed to update cart");
    },
    // Refetch in all cases (success/error) to sync with the server
    onSettled: () => queryClient.invalidateQueries({ queryKey: cartKeys.all }),
  });

  // --- [3] DELETE (Optimistic Update) ---
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
      toast.info("Item removed from cart");
    },
    onError: (err, vars, context) => {
      if (context?.previousCart) queryClient.setQueryData(cartKeys.all, context.previousCart);
      toast.error("Could not remove item");
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: cartKeys.all }),
  });

  const clearCart = () => {
    queryClient.setQueryData(cartKeys.all, {
      result: { items: [], totalQuantity: 0, totalPrice: 0 }
    });
    queryClient.removeQueries({ queryKey: cartKeys.all });
    toast.warn("Cart cleared");
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