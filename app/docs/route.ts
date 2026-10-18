const openApiDocument = {
  openapi: "3.1.0",
  info: {
    title: "Farmart Storefront API",
    version: "1.0.0",
    description:
      "API specification for the Farmart storefront. Homepage catalog data and product search are backed by SQLite. Cart actions remain local UI state.",
  },
  servers: [{ url: "/" }],
  tags: [
    { name: "Pages", description: "HTML pages rendered by the storefront." },
    { name: "API", description: "Implemented JSON endpoints." },
    { name: "Documentation", description: "OpenAPI specification endpoint." },
  ],
  paths: {
    "/": {
      get: {
        operationId: "getStorefront",
        summary: "Get the storefront",
        description:
          "Returns the landing page with promotions and catalog content. Categories and featured products are loaded from SQLite; the search form queries GET /api/products.",
        tags: ["Pages"],
        responses: {
          "200": {
            description: "The storefront HTML page.",
            content: { "text/html": { schema: { type: "string" } } },
          },
        },
      },
    },
    "/design": {
      get: {
        operationId: "getDesignSystem",
        summary: "Get the design system showcase",
        tags: ["Pages"],
        responses: {
          "200": {
            description: "The design-system HTML page.",
            content: { "text/html": { schema: { type: "string" } } },
          },
        },
      },
    },
    "/products/fresh-strawberries": {
      get: {
        operationId: "getFreshStrawberriesPage",
        summary: "Get the fresh strawberries product page",
        description:
          "Returns the product detail page. Its add-to-cart interaction remains local UI state.",
        tags: ["Pages"],
        responses: {
          "200": {
            description: "The fresh strawberries product HTML page.",
            content: { "text/html": { schema: { type: "string" } } },
          },
        },
      },
    },
    "/api/hello": {
      get: {
        operationId: "getHello",
        summary: "Get a greeting",
        tags: ["API"],
        responses: {
          "200": {
            description: "A greeting message.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["message"],
                  properties: {
                    message: { type: "string", example: "Hello World!" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/home": {
      get: {
        operationId: "getHomePageData",
        summary: "Get homepage categories and featured products",
        tags: ["API"],
        responses: {
          "200": {
            description: "Homepage content loaded from the SQLite catalog.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["categories", "featuredProducts"],
                  properties: {
                    categories: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Category" },
                    },
                    featuredProducts: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Product" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/products": {
      get: {
        operationId: "searchProducts",
        summary: "Search catalog products",
        description:
          "Searches product names and labels case-insensitively. Results are capped at 50 records.",
        tags: ["API"],
        parameters: [
          {
            name: "q",
            in: "query",
            required: true,
            description: "Search term, from 1 to 100 characters.",
            schema: { type: "string", minLength: 1, maxLength: 100 },
            example: "strawberries",
          },
        ],
        responses: {
          "200": {
            description: "Matching catalog products.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["query", "count", "products"],
                  properties: {
                    query: { type: "string" },
                    count: { type: "integer" },
                    products: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Product" },
                    },
                  },
                },
              },
            },
          },
          "400": {
            description: "The query is missing, blank, or longer than 100 characters.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
    "/docs": {
      get: {
        operationId: "getOpenApiSpecification",
        summary: "Get the OpenAPI specification",
        tags: ["Documentation"],
        responses: {
          "200": {
            description: "The OpenAPI 3.1 specification for the application.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  description: "An OpenAPI 3.1 document.",
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Category: {
        type: "object",
        required: ["name", "icon", "active"],
        properties: {
          name: { type: "string", example: "Fruits & Vegetables" },
          icon: { type: "string", example: "🥦" },
          active: { type: "boolean" },
        },
      },
      Product: {
        type: "object",
        required: [
          "id",
          "label",
          "name",
          "icon",
          "colorClass",
          "href",
          "priceCents",
        ],
        properties: {
          id: { type: "string", example: "fresh-strawberries" },
          label: { type: "string", example: "FRESH PRODUCE" },
          name: { type: "string", example: "Fresh strawberries" },
          icon: { type: "string", example: "🍓" },
          colorClass: { type: "string", example: "bg-soft-warm" },
          href: { type: "string", example: "/products/fresh-strawberries" },
          priceCents: {
            type: ["integer", "null"],
            description:
              "Price in US cents, or null when the product has no listed price.",
            example: 499,
          },
        },
      },
      Error: {
        type: "object",
        required: ["error"],
        properties: {
          error: { type: "string" },
        },
      },
    },
  },
} as const;

export function GET() {
  return Response.json(openApiDocument);
}
