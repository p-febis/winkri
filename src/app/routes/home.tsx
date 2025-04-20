import type { Route } from './+types/home';
import { HeroSection } from 'src/features/Hero/components/HeroSection';
import { Effect } from 'effect';
import { serverConfiguration } from 'src/config/server';
import { Collection } from 'src/features/Collection/components/Collection';

export function meta() {
    return [
        { title: 'New React Router App' },
        { name: 'description', content: 'Welcome to React Router!' },
    ];
}

export async function loader() {
    const adapter = serverConfiguration.STORE_ADAPTER;
    const pageEffect = await Effect.runPromiseExit(
        adapter.getPage('hero-section'),
    );
    let page = null;

    if (pageEffect._tag === 'Success') {
        page = pageEffect.value;
    }

    return { page };
}

export default function Home({ loaderData }: Route.ComponentProps) {
    const { page } = loaderData;
    return (
        <main className="space-y-6">
            <section className="container mx-auto">
                <HeroSection page={page} />
            </section>
            <section className="container mx-auto">
                <Collection />
            </section>
        </main>
    );
}
