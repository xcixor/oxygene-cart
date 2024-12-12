import { useAppSelector } from "@/lib/store";
import { selectCartItems, selectCartTotal } from "@/lib/store/cartSlice";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function CartSummary() {
  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Cart Totals</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button className="w-full" size="lg" disabled={cartItems.length === 0}>
          Proceed to Checkout
        </Button>
      </CardFooter>
    </Card>
  );
}
