import { ProductsHeading } from "src/features/Products/components/ProductsHeading";
import type { Route } from "./+types/home";
import { serverConfiguration } from "src/config/server";

export async function loader({ params }: Route.LoaderArgs) {
    const adapter = serverConfiguration.STORE_ADAPTER;
    const page = await adapter.getPage("products-heading");

    console.log(page);

    return { page };
}

export default function Products({ loaderData }: Route.ComponentProps) {
    const { page } = loaderData;

    return (
        <main className="space-y-6">
            <section className="container mx-auto">
                <ProductsHeading page={page} />
            </section>
        </main>
    );
}
