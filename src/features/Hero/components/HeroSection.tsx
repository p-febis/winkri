import type { Page } from "src/types/adapter.types"

export const HeroSection = ({ page }: { page: Page | null }) => {
    const imageUrl = page?.metadata["hero-image-url"];

    if(!page || !imageUrl) {
        return null;
    }


    return (
        <section className="h-[calc(100vh-8rem)] rounded-2xl overflow-hidden">
                <img src={imageUrl} width={1596} height={624} className="h-1/2 object-cover" />
                <div className="flex flex-col md:flex-row h-1/2 rounded-b-2xl border-dashed border-neutral-300 border-b border-x divide-x divide-dashed divide-neutral-300">
                    <div className="w-1/2">a</div>
                    <div className="w-1/2">b</div>
                </div>
        </section>
    )
} 
