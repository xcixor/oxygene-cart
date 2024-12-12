import React from "react";
import Hero from "./Hero";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Logo } from "./Logo";
import { ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { CategoryNavMobile } from "./CategoryNavMobile";
import { getAllCategories } from "@/lib/api/faker-shop";

type Props = {
  title: string;
  description?: string;
};

const HeroComponent = async ({ title, description }: Props) => {
  const categories = await getAllCategories();

  return (
    <section className="bg-secondary-600 flex flex-col bg-[url('/hero.webp')] bg-cover bg-center bg-no-repeat md:h-[300px]">
      <div className="flex flex-1 bg-[rgba(64,64,64,0.3)]">
        <MaxWidthWrapper className="flex flex-col justify-center gap-4">
          <div className="items-center justify-between max-md:flex">
            <Link href="/">
              <Logo />
            </Link>
            <div className="md:hidden">
              <CategoryNavMobile categories={categories} />
            </div>
          </div>
          <Hero title={title} description={description} />
          <Link href="/cart" className="flex items-center gap-2 text-white">
            My cart <ShoppingBasket size={20} />
          </Link>
        </MaxWidthWrapper>
      </div>
    </section>
  );
};

export default HeroComponent;
