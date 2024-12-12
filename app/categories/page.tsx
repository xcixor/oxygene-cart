import {
  getAllCategories,
  getAllProducts,
  getProductsByCategory,
  Product,
} from "@/lib/api/faker-shop";
import { ProductGrid } from "@/components/products/ProductGrid";
import { CategoryNav } from "@/components/CategoryNav";
import HeroComponent from "@/components/HeroComponent";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PaginationControls from "@/components/PaginationControls";

interface CategoryPageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export async function generateMetadata({ searchParams }: CategoryPageProps) {
  const params = await searchParams;
  const category = params?.category;
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

export default async function CategoryPage({
  searchParams,
}: CategoryPageProps) {
  const params = await searchParams;
  const category = params.category ?? "";
  const page = Number(params.page) || 1;
  const ITEMS_PER_PAGE = 4;

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

  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const items = products.slice(start, end);
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  return (
    <main className="w-full">
      <HeroComponent title={title} description={description} />
      <MaxWidthWrapper className="py-12 md:flex">
        <div className="basis-2/3 space-y-2">
          <ProductGrid products={items} />
          <PaginationControls
            hasNextPage={totalPages > page}
            hasPrevPage={page > 1}
            totalPages={totalPages}
            baseUrl="/categories"
            pageSize={ITEMS_PER_PAGE.toString()}
          />
        </div>
        <div className="basis-1/3">
          <CategoryNav categories={categories} />
        </div>
      </MaxWidthWrapper>
    </main>
  );
}
