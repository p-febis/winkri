import type { Collection as CollectionType } from "src/types/adapter.types";
import edjsHTML from "editorjs-html";
import xss from "xss";
import { AbstractElement1 } from "src/components/Abstracts/AbstractElement1";
import { globalConfiguration } from "src/config/global";
import { ProductList } from "src/components/ProductList";

const parser = edjsHTML();

export const Collection = ({ collection }: { collection: CollectionType }) => {
    const description = collection?.description
        ? parser.parse(JSON.parse(collection.description))
        : null;

    return (
        <div className="relative z-0 mx-8 min-h-[calc(100vh-8rem)] overflow-hidden rounded-2xl border border-dashed border-neutral-300 md:mx-0">
            <div className="flex h-36 w-full flex-col justify-center gap-4 px-12">
                <h1 className="text-3xl font-bold">{collection.name}</h1>
                <AbstractElement1
                    className="absolute right-0 -z-10"
                    fill={globalConfiguration.ACCENT_COLOR}
                />
                <div
                    className="text-sm text-neutral-500"
                    dangerouslySetInnerHTML={{
                        __html: xss(description ?? ""),
                    }}
                />
            </div>
            <ProductList products={collection.products} />
        </div>
    );
};
