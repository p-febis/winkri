import type { Page } from 'src/types/adapter.types';
import edjsHTML from 'editorjs-html';
import xss from 'xss';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';

const parser = edjsHTML();

export const HeroSection = ({ page }: { page: Page | null }) => {
    const imageUrl = page?.metadata['hero-image-url'];
    const headerText = page?.name;
    const description = page?.description
        ? parser.parse(JSON.parse(page.description))
        : null;

    if (!page || !imageUrl || !headerText || !description) {
        return null;
    }

    return (
        <div className="mx-8 h-[calc(100vh-8rem)] overflow-hidden rounded-2xl md:mx-0">
            <img
                src={imageUrl}
                width={1596}
                height={624}
                className="h-1/2 object-cover"
            />
            <div className="relative flex h-1/2 flex-col divide-y divide-dashed divide-neutral-300 rounded-b-2xl border-x border-b border-dashed border-neutral-300 md:flex-row md:divide-x">
                <div className="absolute flex w-full items-center justify-center border-none">
                    <div className="-translate-y-6 rounded-md bg-white px-4 py-2">
                        <Button className="p-5" asChild variant="outline">
                            <Link
                                to="/products"
                                className="inline-flex items-center gap-2"
                            >
                                Shop now!
                                <ArrowUpRight size={64} />
                            </Link>
                        </Button>
                    </div>
                </div>
                <div className="flex h-full w-full flex-col items-center justify-center p-8">
                    <h1 className="text-xl font-bold md:text-3xl lg:text-4xl">
                        {headerText}
                    </h1>
                    <div className="mt-8 space-y-6 text-sm text-neutral-500">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: xss(description),
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
