import { Effect } from 'effect';
import type { Page } from 'src/types/adapter.types';

export interface StoreAdapter {
    getPage(slug: string): Effect.Effect<Page | null, Error, never>;
}
