import type { Product } from "src/types/adapter.types";
import { collapsePrice } from "src/utils/money";
import { LinkWithChannel } from "./LinkWithChannel";

export const ProductCard = ({ product }: { product: Product }) => {
    return (
        <div className="relative rounded-3xl border bg-white">
            <LinkWithChannel
                to={`products/${product.slug}`}
                className="absolute h-full w-full"
            />
            <span className="absolute top-4 right-4 me-2 h-fit w-fit rounded-full border bg-gray-100 px-3 py-0.5 text-sm font-medium text-neutral-800">
                {product.category?.name}
            </span>
            <img
                src={product.thumbnail?.url}
                alt={product.thumbnail?.alt ?? `Image of ${product.name}`}
                width={512}
                height={512}
            />
            <div className="absolute bottom-0 inline-flex h-24 w-full gap-0 p-4">
                <span className="me-2 h-fit w-fit rounded-full border bg-gray-100 px-3 py-0.5 text-sm text-neutral-800">
                    {product.name}
                </span>
                <span className="me-2 h-fit w-fit rounded-full border border-green-500 bg-green-100 px-3 py-0.5 text-sm text-neutral-800">
                    {collapsePrice(product.pricing)}
                </span>
            </div>
        </div>
    );
};
