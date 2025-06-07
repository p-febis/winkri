import { Button } from "@/components/ui/button";
import type { Product } from "src/types/adapter.types";

export const Showcase = ({ product }: { product: Product }) => {
    return (
        <section className="h-screen rounded-t-lg border border-dashed border-neutral-300 p-12">
            <div className="flex flex-col md:flex-row md:justify-between">
                <div className="flex flex-col gap-4">
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <span className="me-2 h-fit w-fit rounded-full border bg-gray-100 px-3 py-0.5 text-sm font-medium text-neutral-800">
                        {product.category?.name}
                    </span>
                </div>
                <div className="mt-8 md:mt-0">
                  <Button>
                    { /* TODO: Tie into the adapter's addToCart? */}
                    Add to cart
                  </Button>
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-b md:border-b-0 md:border-r border-dashed border-neutral-300">
                <div>
                  <img src={product.thumbnail?.url} alt={product.thumbnail?.alt ?? ""} /> 
                </div>
              </div>
              <div>
              </div>
            </div>
        </section>
    );
};
