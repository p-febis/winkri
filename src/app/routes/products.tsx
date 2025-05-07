import type { Route } from "./+types/home";
import { serverConfiguration } from "src/config/server";

export async function loader({ params }: Route.LoaderArgs) {
    const adapter = serverConfiguration.STORE_ADAPTER;
    const page = await adapter.getPage("products-heading");

    return { page };
}

export default function Products() {
    return (
        <main className="space-y-6">
            <section className="container mx-auto">
            </section>
        </main>
    );
}
