import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/services/products";

export const useProducts = () =>
  useQuery({ queryKey: ["products"], queryFn: fetchProducts, staleTime: 60_000 });
