import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center flex-col">
      <h4 className="text-2xl font-bold">That resource could not be found</h4>
      <div className="mt-8">
        <Button asChild variant="outline">
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
