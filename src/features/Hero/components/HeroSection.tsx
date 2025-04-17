import type { Page } from 'src/types/adapter.types';

export const HeroSection = ({ page }: { page: Page | null }) => {
    const imageUrl = page?.metadata['hero-image-url'];

    if (!page || !imageUrl) {
        return null;
    }

    return (
        <section className="h-[calc(100vh-8rem)] overflow-hidden rounded-2xl">
            <img
                src={imageUrl}
                width={1596}
                height={624}
                className="h-1/2 object-cover"
            />
            <div className="flex h-1/2 flex-col divide-x divide-dashed divide-neutral-300 rounded-b-2xl border-x border-b border-dashed border-neutral-300 md:flex-row">
                <div className="w-1/2">a</div>
                <div className="w-1/2">b</div>
            </div>
        </section>
    );
};
