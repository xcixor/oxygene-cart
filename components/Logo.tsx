import Image from "next/image";

export const Logo = () => {
  return (
    <Image
      className="h-[50px] w-[50px]"
      height={50}
      width={50}
      alt="FakerShop"
      src="/logo.png"
    />
  );
};
