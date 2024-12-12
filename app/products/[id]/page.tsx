import { Suspense } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProduct, getAllProducts } from "@/lib/api/faker-shop";
import { Loader } from "@/components/ui/Loader";
import { Card } from "@/components/ui/card";
import AddToCartButton from "@/components/cart/AddToCartButton";
import HeroComponent from "@/components/HeroComponent";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
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
    console.error("Error generating metadata:", error);
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
    <main className="flex w-full flex-1 flex-col">
      <HeroComponent title={product.title} description={product.description} />
      <MaxWidthWrapper className="grid flex-1 items-center gap-8 max-md:p-4 md:grid-cols-2">
        <div className="relative aspect-square flex flex-col items-center justify-center">
          <Image
            src={product.image}
            alt={product.title}
            className="bg-slate-50 object-contain"
            height={350}
            width={350}
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0fHRsdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDAR0XFyAeIBogHh4gIiAdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="mb-2 text-3xl font-bold">{product.title}</h1>
            <p className="text-xl font-semibold text-orange-500">
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

          <Card className="border-0 shadow-none">
            <h2 className="mb-2 text-lg font-semibold">Description</h2>
            <p className="text-muted-foreground">{product.description}</p>
          </Card>

          <div className="space-y-4">
            <Suspense fallback={<Loader />}>
              <AddToCartButton product={product} />
            </Suspense>
          </div>
          <div className="">
            <Link
              href="/cart"
              className="flex items-center gap-2 text-orange-500"
            >
              View Cart <ShoppingCart className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </main>
  );
}
