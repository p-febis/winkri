import type { Product } from "src/types/adapter.types";
import { ProductCard } from "./ProductCard";

export const ProductList = ({ products }: { products: Product[] }) => {
    return (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product, i) => (
                <ProductCard product={product} key={i} id={i} />
            ))}
        </div>
    );
};
