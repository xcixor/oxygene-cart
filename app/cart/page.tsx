import { CartSummary } from "@/components/cart/CartSummary";
import HeroComponent from "@/components/HeroComponent";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import CartWrapper from "./CartWrapper";

export default function CartPage() {
  return (
    <main className="flex w-full flex-1 flex-col">
      <HeroComponent
        title="Your Cart"
        description="Review your items and checkout"
      />

      <CartWrapper />
    </main>
  );
}
