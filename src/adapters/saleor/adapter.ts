import { Effect } from "effect";
import { GetPageDocument, type GetPageQuery } from "./gql/graphql";
import type { Page } from "src/types/adapter.types";
import type { StoreAdapter } from "../adapter";
import { globalConfiguration } from "src/config/global";

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

    private parsePage(page : GetPageQuery["page"]): Page | null {
        const metadata: Record<string, string> = {};

        page?.metadata.forEach(({ key, value }) => {
            metadata[key] = value;
        })

        if(!page?.title || !page?.content) {
            return null;
        }

        return {
            name: page?.title,
            description: page?.content,
            metadata  
        }
    }

    getPage(slug: string) {
        return Effect.async<Page | null, Error, never>((resume) => {
            this.fetch({
                body: JSON.stringify({
                    query: GetPageDocument,
                    variables: {
                        slug
                    }
                })
            })
            .then(res => res.json())
            .then(res => res["data"])
            .then(({ page }: GetPageQuery) => {
                resume(Effect.succeed(this.parsePage(page)))
            })
            .catch(err  => resume(Effect.fail(err)))
        })
    }
}
