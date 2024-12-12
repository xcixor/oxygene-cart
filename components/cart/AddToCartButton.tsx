"use client";

import { useAppDispatch } from "@/lib/store";
import { addToCart, selectCartItems } from "@/lib/store/cartSlice";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/api/faker-shop";
import { useAppSelector } from "@/lib/store";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const dispatch = useAppDispatch();
  const handleAddToCart = () => {
    console.log("Adding to cart:", product);
    dispatch(addToCart(product));
  };

  return (
    <Button size="lg" className="w-full" onClick={handleAddToCart}>
      Add to Cart
    </Button>
  );
}
