  import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
  import { useEffect  , useRef } from "react";

export function useProductViews(productId: string) {
  const queryClient = useQueryClient();
  const called = useRef(false); //

  const { data: viewsData, isLoading } = useQuery({
    queryKey: ["product-views", productId],
    queryFn: async () => {
      const res = await fetch(`/api/products/${productId}/view`);
      return res.json();
    },
    staleTime: 1000 * 60 * 5,
  });

  const { mutate: incrementView } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/products/${productId}/view`, { method: "POST" });
      return res.json();
    },
    onSuccess: (data) => {
        queryClient.setQueryData(["product-views", productId], { views: data.views });
    },
  });

  useEffect(() => {
    if (productId && !called.current) {
      called.current = true; 
      incrementView();
    }
  }, [productId, incrementView]);

  return { views: viewsData?.views ?? 0, isLoading, incrementView };
}