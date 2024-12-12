"use client";

import { Product } from "@/lib/api/faker-shop";
import { ProductCard } from "@/components/products/ProductCard";
import { Loader } from "@/components/ui/Loader";
import PaginationControls from "@/components/PaginationControls";
import { useSearchParams } from "next/navigation";

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  basePageUrl: string;
}

export function ProductGrid({
  products,
  isLoading = false,
  basePageUrl,
}: ProductGridProps) {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const ITEMS_PER_PAGE = 4;

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

  // Calculate pagination
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const currentItems = products.slice(start, end);
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {currentItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length > ITEMS_PER_PAGE && (
        <PaginationControls
          hasNextPage={totalPages > page}
          hasPrevPage={page > 1}
          totalPages={totalPages}
          baseUrl={basePageUrl}
          pageSize={ITEMS_PER_PAGE.toString()}
        />
      )}
    </div>
  );
}
