"use client";

import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  addToCart,
  updateQuantity,
  selectCartItems,
} from "@/lib/store/cartSlice";
import { Product } from "@/lib/api/faker-shop";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Loader2, ShoppingCart, Plus, Minus } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const [loading, setLoading] = useState(false);

  // Find if product is in cart and get its quantity
  const cartItem = cartItems.find((item) => item.product.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    setLoading(true);
    try {
      dispatch(addToCart(product));
    } catch (error) {
      console.error("Error adding product to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    dispatch(updateQuantity({ productId: product.id, quantity: newQuantity }));
  };

  return (
    <Card className="flex h-full flex-col rounded-none border-0 border-b bg-inherit shadow-none">
      <CardHeader className="bg-inherit p-4">
        <Link href={`/products/${product.id}`}>
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover transition-transform hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
            {quantity > 0 && (
              <div className="absolute right-2 top-2 flex items-center justify-center rounded-full bg-primary px-2 py-1 text-xs text-primary-foreground">
                {quantity}
              </div>
            )}
          </div>
        </Link>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="line-clamp-2 text-lg font-semibold hover:text-primary">
            {product.title}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="justify-between p-4">
        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          <div className="flex items-center gap-1">
            <span className="text-sm text-yellow-500">★</span>
            <span className="text-sm text-muted-foreground">
              {product.rating.rate} ({product.rating.count})
            </span>
          </div>
        </div>
        {quantity > 0 ? (
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => handleUpdateQuantity(quantity - 1)}
              className="h-8 w-8"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center">{quantity}</span>
            <Button
              size="icon"
              variant="outline"
              onClick={() => handleUpdateQuantity(quantity + 1)}
              className="h-8 w-8"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button
            onClick={handleAddToCart}
            className="w-auto"
            variant="ghost"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ShoppingCart className="h-4 w-4" />
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
