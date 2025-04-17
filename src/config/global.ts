import * as v from "valibot";

const schema = v.object({
    STORE_NAME: v.string()
});

export const globalConfiguration = v.parse(schema, {
   STORE_NAME: "WINKRI"
})
