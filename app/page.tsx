import { Suspense } from "react";
import { getAllProducts } from "@/lib/api/faker-shop";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Loader } from "@/components/ui/Loader";
import HeroComponent from "@/components/HeroComponent";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export const metadata = {
  title: "Products | FakerShop",
  description: "Browse our collection of products",
};

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <main className="w-full bg-red-200">
      <HeroComponent
        title="Products"
        description="Browse our collection of products"
      />
      <MaxWidthWrapper className="py-12">
        <Suspense fallback={<Loader />}>
          <ProductGrid products={products} />
        </Suspense>
      </MaxWidthWrapper>
    </main>
  );
}
