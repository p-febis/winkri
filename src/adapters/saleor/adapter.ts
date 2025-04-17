import type { Page } from "@/types/adapter.types";
import type { Effect } from "effect/Effect";
import type { StoreAdapter } from "../adapter";
 
class SaleorStoreAdapter implements StoreAdapter {
    getPage(slug: string): Effect<Page, Error, never> {
        
    }
}
