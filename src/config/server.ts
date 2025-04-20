import type { StoreAdapter } from 'src/adapters/adapter';
import { SaleorStoreAdapter } from 'src/adapters/saleor/adapter';

type ServerConfiguration = {
    SALEOR_API_ENDPOINT: string;
    STORE_ADAPTER: StoreAdapter;
};

const SALEOR_API_ENDPOINT = 'http://localhost:8000/graphql/';

export const serverConfiguration: ServerConfiguration = {
    SALEOR_API_ENDPOINT,
    STORE_ADAPTER: new SaleorStoreAdapter(SALEOR_API_ENDPOINT),
};
