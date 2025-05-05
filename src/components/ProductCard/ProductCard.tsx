import type { Product } from 'src/types/adapter.types';

export const ProductCard = ({ product }: { product: Product }) => {
    return (
        <div className="relative rounded-3xl border bg-white">
            <span className="absolute top-4 right-4 me-2 h-fit w-fit rounded-full border bg-gray-100 px-3 py-0.5 text-sm font-medium text-neutral-800">
                {product.category?.name}
            </span>
            <img
                src={product.thumbnail?.url}
                alt={product.thumbnail?.alt ?? `Image of ${product.name}`}
                width={512}
                height={512}
            />
            <div className="absolute bottom-0 flex h-24 w-full flex-col gap-2 p-4">
                <span className="me-2 h-fit w-fit rounded-full border bg-gray-100 px-3 py-0.5 text-neutral-800">
                    {product.name}
                </span>
            </div>
        </div>
    );
};
