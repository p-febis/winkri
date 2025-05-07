import type { Product } from "src/types/adapter.types";
import { ProductCard } from "./ProductCard";

export const ProductList = ({ products }: { products: Product[] }) => {
    return (
        <div className="grid grid-cols-1 gap-8 p-12 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
                <ProductCard product={product} key={product.id} />
            ))}
        </div>
    );
};
