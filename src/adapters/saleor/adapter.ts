import {
    GetCollectionDocument,
    GetPageDocument,
    GetProductDocument,
    GetProductsDocument,
    type GetCollectionQuery,
    type GetPageQuery,
    type GetProductQuery,
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

    private parseProduct(productData: ProductListItemFragment): Product {
        return {
            ...productData,
            pricing: {
                min: formatMoney(
                    productData.pricing?.priceRange?.start?.gross.currency,
                    productData.pricing?.priceRange?.start?.gross.amount,
                ),
                max: formatMoney(
                    productData.pricing?.priceRange?.stop?.gross.currency,
                    productData.pricing?.priceRange?.stop?.gross.amount,
                ),
            },
        };
    }

    private parseProducts(products?: ProductListItemFragment[]): Product[] {
        if (!products) return [];

        return products.map((product) => this.parseProduct(product));
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
    }

    async getCollection(slug: string, channel: string) {
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
                return this.parseCollection(collection);
            });
    }

    async getProducts(count: number, channel: string) {
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
                return this.parseProducts(
                    products?.edges.map(({ node }) => node),
                );
            });
    }

    async getProduct(slug: string, channel: string) {
        return this.fetch({
            body: JSON.stringify({
                query: GetProductDocument,
                variables: {
                    slug,
                    channel,
                },
            }),
        })
            .then((res) => res.json())
            .then((res) => res["data"])
            .then(({ product }: GetProductQuery) => {
                return product ? this.parseProduct(product) : null;
            });
    }
}
