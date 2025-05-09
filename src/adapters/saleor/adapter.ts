import {
    GetCollectionDocument,
    GetPageDocument,
    GetProductsDocument,
    type GetCollectionQuery,
    type GetPageQuery,
    type GetProductsQuery,
    type ProductListItemFragment,
} from "./gql/graphql";
import type { Page, Collection, Product } from "src/types/adapter.types";
import type { StoreAdapter } from "../adapter";
import { formatMoney } from "src/utils/money";

export class SaleorStoreAdapter implements StoreAdapter {
    SALEOR_API_ENDPOINT: string;

    constructor(endpoint: string) {
        this.SALEOR_API_ENDPOINT = endpoint;
    }

    private fetch(input: RequestInit) {
        return fetch(this.SALEOR_API_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            ...input,
        });
    }

    private parsePage(page: GetPageQuery["page"]): Page | null {
        const metadata: Record<string, string> = {};

        page?.metadata.forEach(({ key, value }) => {
            metadata[key] = value;
        });

        if (!page?.title || !page?.content) {
            return null;
        }

        return {
            name: page?.title,
            description: page?.content,
            metadata,
        };
    }

    private parseProducts(products?: ProductListItemFragment[]): Product[] {
        if (!products) return [];

        return products.map((product) => ({
            ...product,
            pricing: {
                min: formatMoney(
                    product.pricing?.priceRange?.start?.gross.currency,
                    product.pricing?.priceRange?.start?.gross.amount,
                ),
                max: formatMoney(
                    product.pricing?.priceRange?.stop?.gross.currency,
                    product.pricing?.priceRange?.stop?.gross.amount,
                ),
            },
        }));
    }

    private parseCollection(
        collection: GetCollectionQuery["collection"],
    ): Collection | null {
        if (
            !collection ||
            !collection?.id ||
            !collection?.name ||
            !collection?.slug
        ) {
            return null;
        }

        return {
            id: collection.id,
            name: collection.name,
            description: collection.description ?? "",
            slug: collection.slug,
            products: this.parseProducts(
                collection.products?.edges.map((edge) => edge.node),
            ),
        };
    }

    async getPage(slug: string) {
        try {
            return this.fetch({
                body: JSON.stringify({
                    query: GetPageDocument,
                    variables: {
                        slug,
                    },
                }),
            })
                .then((res) => res.json())
                .then((res) => res["data"])
                .then(({ page }: GetPageQuery) => {
                    return this.parsePage(page);
                });
        } catch {
            return null;
        }
    }

    async getCollection(slug: string, channel: string) {
        try {
            return this.fetch({
                body: JSON.stringify({
                    query: GetCollectionDocument,
                    variables: {
                        slug,
                        channel,
                    },
                }),
            })
                .then((res) => res.json())
                .then((res) => res["data"])
                .then(({ collection }: GetCollectionQuery) => {
                    if (!collection) {
                        throw new Error("No collection");
                    }
                    return this.parseCollection(collection);
                });
        } catch {
            return null;
        }
    }

    async getProducts(count: number, channel: string) {
        try {
            return this.fetch({
                body: JSON.stringify({
                    query: GetProductsDocument,
                    variables: {
                        first: count,
                        channel,
                    },
                }),
            })
                .then((res) => res.json())
                .then((res) => res["data"])
                .then(({ products }: GetProductsQuery) => {
                    if (!products) {
                        throw new Error("No products");
                    }

                    return this.parseProducts(
                        products.edges.map(({ node }) => node),
                    );
                });
        } catch {
            return null;
        }
    }
}
