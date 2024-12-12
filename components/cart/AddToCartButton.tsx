"use client";

import { useAppDispatch } from "@/lib/store";
import { addToCart } from "@/lib/store/cartSlice";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/api/faker-shop";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <Button size="lg" className="w-full" onClick={handleAddToCart}>
      Add to Cart
    </Button>
  );
}
