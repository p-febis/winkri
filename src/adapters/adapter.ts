import type { Page, Collection } from 'src/types/adapter.types';

export interface StoreAdapter {
    getPage(slug: string): Promise<Page | null>;
    getCollection(slug: string, channel: string): Promise<Collection | null>;
}
