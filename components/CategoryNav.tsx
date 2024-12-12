"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface CategoryNavProps {
  categories: string[];
}

export function CategoryNav({ categories }: CategoryNavProps) {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  return (
    <nav className="flex flex-col gap-4 overflow-x-auto pb-4">
      <Link
        href="/categories"
        className={cn(
          "border-b-2 px-4 py-2 text-sm font-medium transition-colors",
          !currentCategory || currentCategory === "all"
            ? "text-slate-500"
            : "hover:text-slate-500",
        )}
      >
        All Products
      </Link>
      {categories.map((category) => {
        const isActive = currentCategory === category;
        return (
          <Link
            key={category}
            href={`/categories?category=${encodeURIComponent(category)}`}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors",
              isActive ? "text-slate-500" : "hover:text-slate-500",
            )}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Link>
        );
      })}
    </nav>
  );
}
