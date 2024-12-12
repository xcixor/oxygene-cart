// components/products/ProductGrid.tsx

import { Product } from "@/lib/api/faker-shop";
import { ProductCard } from "@/components/products/ProductCard";
import { Loader } from "@/components/ui/Loader";

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}

export function ProductGrid({ products, isLoading = false }: ProductGridProps) {
  if (isLoading) {
    return <Loader />;
  }

  if (!products?.length) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-muted-foreground">No products found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
