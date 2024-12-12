import { Suspense } from "react";
import { getAllProducts } from "@/lib/api/faker-shop";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Loader } from "@/components/ui/Loader";

export const metadata = {
  title: "Products | FakerShop",
  description: "Browse our collection of products",
};

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Our Products</h1>
      <Suspense fallback={<Loader />}>
        <ProductGrid products={products} />
      </Suspense>
    </main>
  );
}
