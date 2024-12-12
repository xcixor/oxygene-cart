// components/cart/CartItem.tsx

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useAppDispatch } from "@/lib/store";
import { removeFromCart, updateQuantity } from "@/lib/store/cartSlice";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from "@/lib/store/cartSlice";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const dispatch = useAppDispatch();
  const { product, quantity } = item;

  const handleRemove = () => {
    dispatch(removeFromCart(product.id));
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    dispatch(updateQuantity({ productId: product.id, quantity: newQuantity }));
  };

  const incrementQuantity = () => {
    handleUpdateQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      handleUpdateQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex gap-4 border-b py-4">
      <Link href={`/products/${product.id}`} className="shrink-0">
        <div className="relative h-24 w-24 overflow-hidden rounded-md">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
            sizes="96px"
          />
        </div>
      </Link>

      <div className="flex flex-grow flex-col gap-1">
        <div className="flex justify-between">
          <Link href={`/products/${product.id}`}>
            <h3 className="line-clamp-2 font-medium hover:text-primary">
              {product.title}
            </h3>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Remove item</span>
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          ${product.price.toFixed(2)}
        </p>

        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center rounded-md border">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={decrementQuantity}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
              <span className="sr-only">Decrease quantity</span>
            </Button>

            <span className="w-8 text-center">{quantity}</span>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={incrementQuantity}
            >
              <Plus className="h-4 w-4" />
              <span className="sr-only">Increase quantity</span>
            </Button>
          </div>

          <p className="ml-auto font-medium">
            ${(product.price * quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
