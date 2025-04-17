import * as v from "valibot";

const schema = v.object({
    STORE_NAME: v.string(),
    SALEOR_API_ENDPOINT: v.string()
});

export const globalConfiguration = v.parse(schema, {
   STORE_NAME: "WINKRI",
   SALEOR_API_ENDPOINT: "http://localhost:8000/graphql"
})
