import { globalConfiguration } from "@/config/global";
import { Effect } from "effect";
import type { StoreAdapter } from "@/adapters/adapter";
import type { Page } from "@/types/adapter.types";
import { GetPageDocument, type GetPageQuery } from "./gql/graphql";

export class SaleorStoreAdapter implements StoreAdapter {
    private fetch(input: RequestInit) {
        return fetch(globalConfiguration.SALEOR_API_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            ...input
        })
    }

    private parsePage(page : GetPageQuery["page"]) {
        const metadata: Record<string, string> = {};

        page?.metadata.forEach(({ key, value }) => {
            metadata[key] = value;
        })

        return {
            name: page?.title,
            description: page?.content,
            metadata  
        }
    }

    getPage(slug: string) {
        return Effect.async<Page, Error, never>((resume) => {
            this.fetch({
                body: JSON.stringify({
                    query: GetPageDocument,
                    variables: {
                        slug
                    }
                })
            })
            .then(res => res.json())
            .then(({ page }: GetPageQuery) => {
                return this.parsePage(page);
            })
            .catch(err  => resume(Effect.fail(err)))
        })
    }
}
