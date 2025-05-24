import type { Product } from "src/types/adapter.types";

export const Showcase = ({ product }: { product: Product }) => {
    return (
      <section className="border border-dashed border-neutral-300 rounded-t-lg h-screen p-12">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <span className="me-2 h-fit w-fit rounded-full border bg-gray-100 px-3 py-0.5 text-sm font-medium text-neutral-800">
              {product.category?.name}
          </span>
        </div>
      </section>
    );
};
