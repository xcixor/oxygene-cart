import { Suspense } from "react";
import {
  getAllCategories,
  getAllProducts,
  getProductsByCategory,
  Product,
} from "@/lib/api/faker-shop";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Loader } from "@/components/ui/Loader";
import { CategoryNav } from "@/components/CategoryNav";
import HeroComponent from "@/components/HeroComponent";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

interface CategoryPageProps {
  searchParams: Record<string, string | undefined>;
}

export async function generateMetadata({ searchParams }: CategoryPageProps) {
  const { category } = await searchParams;
  let title = "Product Categories | FakerShop";
  let description = "Browse our collection of product categories";
  if (category) {
    title = `${category.charAt(0).toUpperCase() + category.slice(1)} | FakerShop`;
    description = `Browse our collection of ${category} products`;
  }
  return {
    title,
    description,
  };
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({
    category: encodeURIComponent(category),
  }));
}

export default async function CategoryPage({
  searchParams,
}: CategoryPageProps) {
  const { category } = await searchParams;

  let title = "Product Categories | FakerShop";
  let description = "Browse our collection of product categories";
  let products: Product[] = [];
  if (category) {
    title = `${category.charAt(0).toUpperCase() + category.slice(1)} | FakerShop`;
    description = `Browse our collection of ${category} products`;
    const decodedCategory = decodeURIComponent(category);
    products = await getProductsByCategory(decodedCategory);
  } else {
    products = await getAllProducts();
  }
  const categories = await getAllCategories();

  return (
    <main className="w-full">
      <HeroComponent title={title} description={description} />
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
