import { Logo } from "@/components/Logo";
import { Loader2 } from "lucide-react";
import React from "react";

const loading = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-slate-100">
      <Logo />
      <p className="text-secondary">
        Your one-stop shop for quality products at great prices.
      </p>
      <Loader2 className="h-16 w-16 animate-spin text-primary" />
    </div>
  );
};

export default loading;
