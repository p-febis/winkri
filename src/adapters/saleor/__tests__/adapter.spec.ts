import { describe, expect, it } from "vitest";
import { SaleorStoreAdapter } from "../adapter";
import type { GetCollectionQuery } from "../gql/graphql";
import { formatMoney } from "src/utils/money";

describe("Saleor store adapter", () => {
    it("Should parse a page properly", () => {
        const adapter = new SaleorStoreAdapter("");
        const parsePage = adapter["parsePage"];
        const result = parsePage({
            title: "TEST PAGE",
            content: "{}",
            metadata: [
                {
                    key: "hero-image-url",
                    value: "http://example.com/images/16x9",
                },
            ],
        });

        expect(result?.name).toBe("TEST PAGE");
        expect(result?.description).toBe("{}");
        expect(result?.metadata["hero-image-url"]).toBe(
            "http://example.com/images/16x9",
        );
    });

    it("Should parse a collection properly", () => {
        const adapter = new SaleorStoreAdapter("");

        const testData: GetCollectionQuery = JSON.parse(`{
          "collection": {
            "id": "Q29sbGVjdGlvbjo0",
            "name": "Featured Products",
            "description": "{time': 1652704228241, 'blocks': [{'id': 'vSuHF7x1Ph', 'data': {'text': 'Team's favourites'}, 'type': 'paragraph'}], 'version': '2.24.3'}",
            "slug": "featured-products",
            "products": {
              "edges": [
                {
                  "node": {
                    "id": "UHJvZHVjdDoxMzQ=",
                    "name": "Monospace Tee",
                    "slug": "ascii-tee",
                    "pricing": {
                      "priceRange": {
                        "start": {
                          "gross": {
                            "amount": 20,
                            "currency": "USD"
                          }
                        },
                        "stop": {
                          "gross": {
                            "amount": 20,
                            "currency": "USD"
                          }
                        }
                      }
                    },
                    "category": {
                      "id": "Q2F0ZWdvcnk6Mzk=",
                      "name": "T-shirts"
                    },
                    "thumbnail": {
                      "url": "http://localhost:8000/media/thumbnails/products/saleor-ascii-shirt-front_thumbnail_1024.webp",
                      "alt": ""
                    }
                  }
                },
                {
                  "node": {
                    "id": "UHJvZHVjdDoxNjE=",
                    "name": "Cubes Fountain Tee",
                    "slug": "cubes-fountain-tee",
                    "pricing": {
                      "priceRange": {
                        "start": {
                          "gross": {
                            "amount": 21,
                            "currency": "USD"
                          }
                        },
                        "stop": {
                          "gross": {
                            "amount": 30,
                            "currency": "USD"
                          }
                        }
                      }
                    },
                    "category": {
                      "id": "Q2F0ZWdvcnk6Mzk=",
                      "name": "T-shirts"
                    },
                    "thumbnail": {
                      "url": "http://localhost:8000/media/thumbnails/products/saleor-white-cubes-tee-front_thumbnail_1024.webp",
                      "alt": ""
                    }
                  }
                },
                {
                  "node": {
                    "id": "UHJvZHVjdDoxNTA=",
                    "name": "Mighty Mug",
                    "slug": "mighty-mug",
                    "pricing": {
                      "priceRange": {
                        "start": {
                          "gross": {
                            "amount": 11.99,
                            "currency": "USD"
                          }
                        },
                        "stop": {
                          "gross": {
                            "amount": 11.99,
                            "currency": "USD"
                          }
                        }
                      }
                    },
                    "category": {
                      "id": "Q2F0ZWdvcnk6NDE=",
                      "name": "Homewares"
                    },
                    "thumbnail": {
                      "url": "http://localhost:8000/media/thumbnails/products/saleor-mighty-mug_thumbnail_1024.webp",
                      "alt": ""
                    }
                  }
                },
                {
                  "node": {
                    "id": "UHJvZHVjdDoxMjc=",
                    "name": "White Plimsolls",
                    "slug": "white-plimsolls",
                    "pricing": {
                      "priceRange": {
                        "start": {
                          "gross": {
                            "amount": 40,
                            "currency": "USD"
                          }
                        },
                        "stop": {
                          "gross": {
                            "amount": 80,
                            "currency": "USD"
                          }
                        }
                      }
                    },
                    "category": {
                      "id": "Q2F0ZWdvcnk6Mjg=",
                      "name": "Sneakers"
                    },
                    "thumbnail": {
                      "url": "http://localhost:8000/media/thumbnails/products/saleor-white-plimsolls-1_thumbnail_1024.webp",
                      "alt": ""
                    }
                  }
                }
              ]
            }
          }
        }`);

        const { collection } = testData;
        // @ts-expect-error Testing private fields
        const result = adapter.parseCollection(collection);

        expect(result).toBeTruthy();

        expect(result?.name).toBe(collection?.name);
        expect(result?.description).toBe(collection?.description);
        expect(result?.id).toBe(collection?.id);
        expect(result?.slug).toBe(collection?.slug);
        expect(result?.products.length).toBe(
            collection?.products?.edges.length,
        );

        collection?.products?.edges.forEach(({ node }, i) => {
            expect(result?.products[i].pricing).toEqual({
                min: formatMoney(
                    node.pricing?.priceRange?.start?.gross.currency,
                    node.pricing?.priceRange?.start?.gross.amount,
                ),
                max: formatMoney(
                    node.pricing?.priceRange?.stop?.gross.currency,
                    node.pricing?.priceRange?.stop?.gross.amount,
                ),
            });

            expect(result?.products[i].id).toBe(node.id);
            expect(result?.products[i].name).toBe(node.name);
            expect(result?.products[i].slug).toBe(node.slug);
            expect(result?.products[i].category).toBe(node.category);
            expect(result?.products[i].thumbnail).toBe(node.thumbnail);
        });
    });
});
