import * as v from "valibot";

const schema = v.object({
    STORE_NAME: v.string()
});

export const globalEnvironmentVariables = v.parse(schema, {
   STORE_NAME: "WINKRI"
})
