import type { CodegenConfig } from "@graphql-codegen/cli";

const schemaUrl = "http://localhost:8000/graphql/";

const config: CodegenConfig = {
	overwrite: true,
	schema: schemaUrl,
	documents: "src/adapters/saleor/graphql/*.graphql",
	generates: {
		"src/adapter/saleor/gql/": {
			preset: "client",
			plugins: [],
			config: {
				documentMode: "string",
				useTypeImports: true,
				strictScalars: true,
				scalars: {
					Date: "string",
					DateTime: "string",
					Hour: "number",
					Day: "number",
					Decimal: "number",
					GenericScalar: "unknown",
					JSON: "unknown",
					JSONString: "string",
					Metadata: "Record<string, string>",
					Minute: "number",
					PositiveDecimal: "number",
					UUID: "string",
					Upload: "unknown",
					WeightScalar: "unknown",
					_Any: "unknown",
				},
			},
			presetConfig: {
				fragmentMasking: false,
			},
		},
	},
};

export default config;
