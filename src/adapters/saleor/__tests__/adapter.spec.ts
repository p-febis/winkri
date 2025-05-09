import { describe, expect, it } from "vitest";
import { SaleorStoreAdapter } from "../adapter";
import type { GetCollectionQuery, GetProductsQuery } from "../gql/graphql";
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
    });

    it("Should parse products propely", () => {
        const adapter = new SaleorStoreAdapter("");
        const parseProducts = adapter["parseProducts"];

        const products: GetProductsQuery["products"] = JSON.parse(`
          {
            "edges": [
              {
                "node": {
                  "id": "UHJvZHVjdDoxNTI=",
                  "name": "Apple Juice",
                  "slug": "apple-juice",
                  "pricing": {
                    "priceRange": {
                      "start": {
                        "gross": {
                          "amount": 1.99,
                          "currency": "USD"
                        }
                      },
                      "stop": {
                        "gross": {
                          "amount": 1.99,
                          "currency": "USD"
                        }
                      }
                    }
                  },
                  "category": {
                    "id": "Q2F0ZWdvcnk6NDM=",
                    "name": "Juices"
                  },
                  "thumbnail": {
                    "url": "http://localhost:8000/media/thumbnails/products/saleor-apple-drink_thumbnail_1024.webp",
                    "alt": ""
                  }
                }
              },
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
                  "id": "UHJvZHVjdDoxMzA=",
                  "name": "Paul's Balance 420",
                  "slug": "balance-trail-720",
                  "pricing": {
                    "priceRange": {
                      "start": {
                        "gross": {
                          "amount": 35,
                          "currency": "USD"
                        }
                      },
                      "stop": {
                        "gross": {
                          "amount": 50,
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
                    "url": "http://localhost:8000/media/thumbnails/products/saleor-pauls-blanace-420-1_thumbnail_1024.webp",
                    "alt": ""
                  }
                }
              },
              {
                "node": {
                  "id": "UHJvZHVjdDoxNTQ=",
                  "name": "Banana Juice",
                  "slug": "banana-juice",
                  "pricing": {
                    "priceRange": {
                      "start": {
                        "gross": {
                          "amount": 1.39,
                          "currency": "USD"
                        }
                      },
                      "stop": {
                        "gross": {
                          "amount": 1.39,
                          "currency": "USD"
                        }
                      }
                    }
                  },
                  "category": {
                    "id": "Q2F0ZWdvcnk6NDM=",
                    "name": "Juices"
                  },
                  "thumbnail": {
                    "url": "http://localhost:8000/media/thumbnails/products/saleor-banana-drink_thumbnail_1024.webp",
                    "alt": ""
                  }
                }
              },
              {
                "node": {
                  "id": "UHJvZHVjdDoxNDU=",
                  "name": "Battle-tested at brands like Lush",
                  "slug": "battle-tested-at-brands-like-lush",
                  "pricing": {
                    "priceRange": {
                      "start": {
                        "gross": {
                          "amount": 10,
                          "currency": "USD"
                        }
                      },
                      "stop": {
                        "gross": {
                          "amount": 10,
                          "currency": "USD"
                        }
                      }
                    }
                  },
                  "category": {
                    "id": "Q2F0ZWdvcnk6MjY=",
                    "name": "Audiobooks"
                  },
                  "thumbnail": {
                    "url": "http://localhost:8000/media/thumbnails/products/saleor-battle-tested-book_thumbnail_1024.webp",
                    "alt": ""
                  }
                }
              },
              {
                "node": {
                  "id": "UHJvZHVjdDoxNTM=",
                  "name": "Bean Juice",
                  "slug": "bean-juice",
                  "pricing": {
                    "priceRange": {
                      "start": {
                        "gross": {
                          "amount": 1.99,
                          "currency": "USD"
                        }
                      },
                      "stop": {
                        "gross": {
                          "amount": 1.99,
                          "currency": "USD"
                        }
                      }
                    }
                  },
                  "category": {
                    "id": "Q2F0ZWdvcnk6NDM=",
                    "name": "Juices"
                  },
                  "thumbnail": {
                    "url": "http://localhost:8000/media/thumbnails/products/saleor-bean-drink_thumbnail_1024.webp",
                    "alt": ""
                  }
                }
              },
              {
                "node": {
                  "id": "UHJvZHVjdDoxMzI=",
                  "name": "Blue Hoodie",
                  "slug": "blue-hoodie",
                  "pricing": {
                    "priceRange": {
                      "start": {
                        "gross": {
                          "amount": 35,
                          "currency": "USD"
                        }
                      },
                      "stop": {
                        "gross": {
                          "amount": 35,
                          "currency": "USD"
                        }
                      }
                    }
                  },
                  "category": {
                    "id": "Q2F0ZWdvcnk6Mjk=",
                    "name": "Sweatshirts"
                  },
                  "thumbnail": {
                    "url": "http://localhost:8000/media/thumbnails/products/saleor-blue-hoodie_thumbnail_1024.webp",
                    "alt": ""
                  }
                }
              },
              {
                "node": {
                  "id": "UHJvZHVjdDoxMjg=",
                  "name": "Blue Plimsolls",
                  "slug": "blue-plimsolls",
                  "pricing": {
                    "priceRange": {
                      "start": {
                        "gross": {
                          "amount": 75,
                          "currency": "USD"
                        }
                      },
                      "stop": {
                        "gross": {
                          "amount": 75,
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
                    "url": "http://localhost:8000/media/thumbnails/products/saleor-blue-plimsolls-1_thumbnail_1024.webp",
                    "alt": ""
                  }
                }
              },
              {
                "node": {
                  "id": "UHJvZHVjdDoxMzc=",
                  "name": "Blue Polygon Shirt",
                  "slug": "blue-polygon-shirt",
                  "pricing": {
                    "priceRange": {
                      "start": {
                        "gross": {
                          "amount": 40.5,
                          "currency": "USD"
                        }
                      },
                      "stop": {
                        "gross": {
                          "amount": 40.5,
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
                    "url": "http://localhost:8000/media/thumbnails/products/saleor-blue-polygon-tee-front_thumbnail_1024.webp",
                    "alt": ""
                  }
                }
              },
              {
                "node": {
                  "id": "UHJvZHVjdDoxNTU=",
                  "name": "Carrot Juice",
                  "slug": "carrot-juice",
                  "pricing": {
                    "priceRange": {
                      "start": {
                        "gross": {
                          "amount": 1.99,
                          "currency": "USD"
                        }
                      },
                      "stop": {
                        "gross": {
                          "amount": 1.99,
                          "currency": "USD"
                        }
                      }
                    }
                  },
                  "category": {
                    "id": "Q2F0ZWdvcnk6NDM=",
                    "name": "Juices"
                  },
                  "thumbnail": {
                    "url": "http://localhost:8000/media/thumbnails/products/saleor-carrot-drink_thumbnail_1024.webp",
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
                  "id": "UHJvZHVjdDoxMzg=",
                  "name": "Dark Polygon Tee",
                  "slug": "dark-polygon-tee",
                  "pricing": {
                    "priceRange": {
                      "start": {
                        "gross": {
                          "amount": 45,
                          "currency": "USD"
                        }
                      },
                      "stop": {
                        "gross": {
                          "amount": 45,
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
                    "url": "http://localhost:8000/media/thumbnails/products/saleor-dark-polygon-tee-front_thumbnail_1024.webp",
                    "alt": ""
                  }
                }
              },
              {
                "node": {
                  "id": "UHJvZHVjdDoxMzY=",
                  "name": "Darko Polo",
                  "slug": "darko-polo",
                  "pricing": {
                    "priceRange": {
                      "start": {
                        "gross": {
                          "amount": 22.5,
                          "currency": "USD"
                        }
                      },
                      "stop": {
                        "gross": {
                          "amount": 45,
                          "currency": "USD"
                        }
                      }
                    }
                  },
                  "category": {
                    "id": "Q2F0ZWdvcnk6NDA=",
                    "name": "Polo shirts"
                  },
                  "thumbnail": {
                    "url": "http://localhost:8000/thumbnail/UHJvZHVjdE1lZGlhOjIx/1024/webp/",
                    "alt": ""
                  }
                }
              },
              {
                "node": {
                  "id": "UHJvZHVjdDoxMjk=",
                  "name": "Dash Force",
                  "slug": "dash-force",
                  "pricing": {
                    "priceRange": {
                      "start": {
                        "gross": {
                          "amount": 90,
                          "currency": "USD"
                        }
                      },
                      "stop": {
                        "gross": {
                          "amount": 90,
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
                    "url": "http://localhost:8000/thumbnail/UHJvZHVjdE1lZGlhOjEw/1024/webp/",
                    "alt": ""
                  }
                }
              },
              {
                "node": {
                  "id": "UHJvZHVjdDoxNDQ=",
                  "name": "DRY Sunglasses",
                  "slug": "dry-sunglasses",
                  "pricing": {
                    "priceRange": {
                      "start": {
                        "gross": {
                          "amount": 15,
                          "currency": "USD"
                        }
                      },
                      "stop": {
                        "gross": {
                          "amount": 15,
                          "currency": "USD"
                        }
                      }
                    }
                  },
                  "category": {
                    "id": "Q2F0ZWdvcnk6Mzc=",
                    "name": "Sunglasses"
                  },
                  "thumbnail": {
                    "url": "http://localhost:8000/thumbnail/UHJvZHVjdE1lZGlhOjMw/1024/webp/",
                    "alt": ""
                  }
                }
              },
              {
                "node": {
                  "id": "UHJvZHVjdDoxNDY=",
                  "name": "Enterprise Cloud + On-premises",
                  "slug": "enterprise-cloud-on-premises-tales",
                  "pricing": {
                    "priceRange": {
                      "start": {
                        "gross": {
                          "amount": 8.99,
                          "currency": "USD"
                        }
                      },
                      "stop": {
                        "gross": {
                          "amount": 8.99,
                          "currency": "USD"
                        }
                      }
                    }
                  },
                  "category": {
                    "id": "Q2F0ZWdvcnk6MjY=",
                    "name": "Audiobooks"
                  },
                  "thumbnail": {
                    "url": "http://localhost:8000/thumbnail/UHJvZHVjdE1lZGlhOjMy/1024/webp/",
                    "alt": ""
                  }
                }
              },
              {
                "node": {
                  "id": "UHJvZHVjdDoxNjA=",
                  "name": "Gift card 100",
                  "slug": "gift-card",
                  "pricing": {
                    "priceRange": {
                      "start": {
                        "gross": {
                          "amount": 100,
                          "currency": "USD"
                        }
                      },
                      "stop": {
                        "gross": {
                          "amount": 100,
                          "currency": "USD"
                        }
                      }
                    }
                  },
                  "category": {
                    "id": "Q2F0ZWdvcnk6NDQ=",
                    "name": "Gift cards"
                  },
                  "thumbnail": {
                    "url": "http://localhost:8000/thumbnail/UHJvZHVjdE1lZGlhOjQz/1024/webp/",
                    "alt": ""
                  }
                }
              },
              {
                "node": {
                  "id": "UHJvZHVjdDoxNjQ=",
                  "name": "Gift card 50",
                  "slug": "gift-card-50",
                  "pricing": {
                    "priceRange": {
                      "start": {
                        "gross": {
                          "amount": 50,
                          "currency": "USD"
                        }
                      },
                      "stop": {
                        "gross": {
                          "amount": 50,
                          "currency": "USD"
                        }
                      }
                    }
                  },
                  "category": {
                    "id": "Q2F0ZWdvcnk6NDQ=",
                    "name": "Gift cards"
                  },
                  "thumbnail": {
                    "url": "http://localhost:8000/thumbnail/UHJvZHVjdE1lZGlhOjQ4/1024/webp/",
                    "alt": ""
                  }
                }
              },
              {
                "node": {
                  "id": "UHJvZHVjdDoxNjM=",
                  "name": "Gift card 500",
                  "slug": "gift-card-500",
                  "pricing": {
                    "priceRange": {
                      "start": {
                        "gross": {
                          "amount": 500,
                          "currency": "USD"
                        }
                      },
                      "stop": {
                        "gross": {
                          "amount": 500,
                          "currency": "USD"
                        }
                      }
                    }
                  },
                  "category": {
                    "id": "Q2F0ZWdvcnk6NDQ=",
                    "name": "Gift cards"
                  },
                  "thumbnail": {
                    "url": "http://localhost:8000/thumbnail/UHJvZHVjdE1lZGlhOjQ3/1024/webp/",
                    "alt": ""
                  }
                }
              },
              {
                "node": {
                  "id": "UHJvZHVjdDoxMzE=",
                  "name": "Grey Hoodie",
                  "slug": "grey-hoodie",
                  "pricing": {
                    "priceRange": {
                      "start": {
                        "gross": {
                          "amount": 30,
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
                    "id": "Q2F0ZWdvcnk6Mjk=",
                    "name": "Sweatshirts"
                  },
                  "thumbnail": {
                    "url": "http://localhost:8000/thumbnail/UHJvZHVjdE1lZGlhOjE0/1024/webp/",
                    "alt": ""
                  }
                }
              }
            ]
          }`);

        const result = parseProducts(products?.edges.map((edge) => edge.node));

        products?.edges.forEach(({ node }, i) => {
            expect(result[i].pricing).toEqual({
                min: formatMoney(
                    node.pricing?.priceRange?.start?.gross.currency,
                    node.pricing?.priceRange?.start?.gross.amount,
                ),
                max: formatMoney(
                    node.pricing?.priceRange?.stop?.gross.currency,
                    node.pricing?.priceRange?.stop?.gross.amount,
                ),
            });

            expect(result[i].id).toBe(node.id);
            expect(result[i].name).toBe(node.name);
            expect(result[i].slug).toBe(node.slug);
            expect(result[i].category).toBe(node.category);
            expect(result[i].thumbnail).toBe(node.thumbnail);
        });
    });
});
