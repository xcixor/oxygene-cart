import React from "react";
import Hero from "./Hero";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Logo } from "./Logo";

type Props = {
  title: string;
  description?: string;
};

const HeroComponent = ({ title, description }: Props) => {
  return (
    <section className="bg-secondary-600 flex h-[300px] flex-col bg-[url('/hero.webp')] bg-cover bg-center bg-no-repeat">
      <div className="flex flex-1 bg-[rgba(64,64,64,0.3)]">
        <MaxWidthWrapper className="flex flex-col justify-center">
          <Logo />
          <Hero title={title} description={description} />
        </MaxWidthWrapper>
      </div>
    </section>
  );
};

export default HeroComponent;
