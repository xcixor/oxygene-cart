// app/products/[id]/page.tsx

import { Suspense } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProduct, getAllProducts } from "@/lib/api/faker-shop";
import { Loader } from "@/components/ui/Loader";
import { Card } from "@/components/ui/card";
import AddToCartButton from "@/components/cart/AddToCartButton";

interface ProductPageProps {
  params: {
    id: string;
  };
}

// Generate metadata for the page
export async function generateMetadata({ params }: ProductPageProps) {
  try {
    const { id } = await params;
    const product = await getProduct(parseInt(id));

    return {
      title: `${product.title} | FakerShop`,
      description: product.description,
    };
  } catch (error) {
    return {
      title: "Product Not Found | FakerShop",
      description: "The requested product could not be found.",
    };
  }
}

// Generate static params for all products
export async function generateStaticParams() {
  try {
    const products = await getAllProducts();
    return products.map((product) => ({
      id: product.id.toString(),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  let product;

  try {
    const { id } = await params;
    product = await getProduct(parseInt(id));
  } catch (error) {
    console.error("Error fetching product:", error);
    notFound();
  }

  if (!product) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Product Image */}
        <div className="relative aspect-square">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="mb-2 text-3xl font-bold">{product.title}</h1>
            <p className="text-xl font-semibold text-primary">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-lg ${
                    i < Math.floor(product.rating.rate)
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.rating.count} reviews)
            </span>
          </div>

          <Card className="p-4">
            <h2 className="mb-2 text-lg font-semibold">Description</h2>
            <p className="text-muted-foreground">{product.description}</p>
          </Card>

          <div className="space-y-4">
            <Suspense fallback={<Loader />}>
              <AddToCartButton product={product} />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
