import type { Route } from "./+types/home";
import { HeroSection } from "src/features/Hero/components/HeroSection";
import { serverConfiguration } from "src/config/server";
import { Collection } from "src/features/Collection/components/Collection";

export function meta() {
    return [
        { title: "Winkri" },
        { name: "description", content: "Excell while you sell!" },
    ];
}

export async function loader({ params }: Route.LoaderArgs) {
    const adapter = serverConfiguration.STORE_ADAPTER;
    const page = await adapter.getPage("hero-section");
    const collection = await adapter.getCollection(
        "featured-products",
        params.channel,
    );

    return { page, collection };
}

export default function Home({ loaderData }: Route.ComponentProps) {
    const { page, collection } = loaderData;
    return (
        <main className="space-y-6">
            <section className="container mx-auto">
                <HeroSection page={page} />
            </section>
            {collection && (
                <section className="container mx-auto">
                    <Collection collection={collection} />
                </section>
            )}
        </main>
    );
}
