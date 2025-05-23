import { serverConfiguration } from "src/config/server";
import type { Route } from "./+types/product";
import { Showcase } from "src/features/Product/components/Showcase";

export async function loader({ params }: Route.LoaderArgs) {
    const adapter = serverConfiguration.STORE_ADAPTER;
    const product = await adapter.getProduct(params.slug, params.channel);
    return { product };
}

export default function Product({ loaderData }: Route.ComponentProps) {
    const { product } = loaderData;

    if (!product) {
        return (
            <main className="space-y-6">
                <h3>No product to display</h3>
            </main>
        );
    }

    return (
        <main className="space-y-6">
            <section className="container mx-auto space-y-6 px-8 md:px-0">
                <Showcase product={product} />
            </section>
        </main>
    );
}
