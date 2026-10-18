This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Catalog API

The storefront catalog is stored in SQLite at `data/farmart.sqlite`. The database and its WAL files are created automatically and ignored by Git; the initial categories and featured products are seeded on first use.

- `GET /api/home` returns the homepage categories and featured products.
- `GET /api/products?q=<term>` searches product names and labels (1–100 characters; maximum 50 results).
- `GET /docs` returns the OpenAPI 3.1 specification.
- `/mermaid.html` displays a Mermaid ER diagram of the current SQLite schema.

The homepage reads the same SQLite catalog as these API routes, and its search form uses the product-search endpoint. Deployments need a writable, persistent filesystem for the SQLite database.

## Backend tests

Run `npm test` to execute the backend unit and integration tests. They use isolated in-memory SQLite databases and do not modify the local catalog.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
