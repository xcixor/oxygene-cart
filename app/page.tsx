import { Suspense } from "react";
import { getAllProducts, getAllCategories } from "@/lib/api/faker-shop";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Loader } from "@/components/ui/Loader";
import HeroComponent from "@/components/HeroComponent";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { CategoryNav } from "@/components/CategoryNav";

export const metadata = {
  title: "Products | FakerShop",
  description: "Browse our collection of products",
};

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
  ]);

  return (
    <main className="w-full">
      <HeroComponent
        title="Products"
        description="Browse our collection of products"
      />
      <MaxWidthWrapper className="py-12 md:flex">
        <div className="basis-2/3">
          <ProductGrid products={products} />
        </div>
        <div className="basis-1/3">
          <CategoryNav categories={categories} />
        </div>
      </MaxWidthWrapper>
    </main>
  );
}
