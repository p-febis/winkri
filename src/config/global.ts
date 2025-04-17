import type { StoreAdapter } from "src/adapters/adapter";
import { SaleorStoreAdapter } from "src/adapters/saleor/adapter";
import * as v from "valibot";

const schema = v.object({
    STORE_NAME: v.string(),
    SALEOR_API_ENDPOINT: v.string(),
    STORE_ADAPTER: v.custom<StoreAdapter>(() => true)
});

export const globalConfiguration = v.parse(schema, {
   STORE_NAME: "WINKRI",
   SALEOR_API_ENDPOINT: "http://localhost:8000/graphql/",
   STORE_ADAPTER: new SaleorStoreAdapter()
})
