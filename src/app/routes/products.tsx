import { ProductsHeading } from "src/features/Products/components/ProductsHeading";
import type { Route } from "./+types/products";
import { serverConfiguration } from "src/config/server";
import { globalConfiguration } from "src/config/global";
import { ProductList } from "src/components/ProductList";

export async function loader({ params }: Route.LoaderArgs) {
    const adapter = serverConfiguration.STORE_ADAPTER;
    const [page, products] = await Promise.all([adapter.getPage("products-heading"), adapter.getProducts(globalConfiguration.PRODUCT_COUNT, params.channel)]);

    return { page, products: products ?? [] };
}

export default function Products({ loaderData }: Route.ComponentProps) {
    const { page, products } = loaderData;

    return (
        <main className="space-y-6">
            <section className="container px-8 md:px-0 mx-auto space-y-6">
                <ProductsHeading page={page} />
                <ProductList products={products} />
            </section>
        </main>
    );
}
