"use client";

import Image from "next/image";
import { Product } from "@/lib/api/faker-shop";
import { generateBlurDataUrl } from "@/lib/generate-blur";

type Props = {
  product: Product;
};

const ImageComponent = ({ product }: Props) => {
  return (
    <div className="relative flex h-[300px] w-full items-center justify-center">
      <Image
        src={product.image}
        alt={product.title}
        className="object-contain transition-opacity duration-300"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 300px, 300px"
        priority
        width={300}
        height={300}
        quality={85}
        placeholder="blur"
        blurDataURL={generateBlurDataUrl(300, 300)}
      />
    </div>
  );
};

export default ImageComponent;
