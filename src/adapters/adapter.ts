import { Effect } from "effect";
import type { Page } from "@/types/adapter.types";

export interface StoreAdapter {
    getPage(slug: string): Effect.Effect<Page, Error, never>;
}
