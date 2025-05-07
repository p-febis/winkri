import type { ProductListItemFragment } from "src/adapters/saleor/gql/graphql";

export type Page = {
    name: string;
    description: string;
    metadata: Record<string, string>;
};

export type Collection = {
    id: string;
    name: string;
    description: string;
    slug: string;
    products: Product[];
};

export type Product = {
    pricing: {
        min: string;
        max: string;
    };

    id: string;
    name: string;
    slug: string;

    category?: ProductListItemFragment["category"];
    thumbnail?: ProductListItemFragment["thumbnail"];
};
