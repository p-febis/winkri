import type { Page } from "src/types/adapter.types";
import edjsHTML from "editorjs-html";
import xss from "xss";
import { AbstractElement1 } from "src/components/Abstracts/AbstractElement1";
import { globalConfiguration } from "src/config/global";

const parser = edjsHTML();

export const ProductsHeading = ({ page }: { page: Page | null }) => {
    const description = page?.description
        ? parser.parse(JSON.parse(page.description))
        : null;

    if (!page || !description) {
        return null;
    }

    return (
        <section className="relative z-0 flex flex-col overflow-hidden rounded-lg border border-dashed border-neutral-300 px-4 py-12 md:mx-0">
            <AbstractElement1
                className="absolute -top-14 right-0 -z-10"
                width={125}
                fill={globalConfiguration.ACCENT_COLOR}
            />
            <h1 className="text-3xl font-bold">{page.name}</h1>
            <div
                className="mt-8 max-w-[80%] space-y-6 text-neutral-500"
                dangerouslySetInnerHTML={{
                    __html: xss(description),
                }}
            />
        </section>
    );
};
