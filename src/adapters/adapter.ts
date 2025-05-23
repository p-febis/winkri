import type { Page, Collection, Product } from "src/types/adapter.types";

export interface StoreAdapter {
    getPage(slug: string): Promise<Page | null>;
    getCollection(slug: string, channel: string): Promise<Collection | null>;
    getProducts(count: number, channel: string): Promise<Product[] | null>;
    getProduct(slug: string, channel: string): Promise<Product | null>;
}
