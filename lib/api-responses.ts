import {
  getHomePageData,
  searchProducts,
  type FeaturedProduct,
} from "./store";

type HomePageData = ReturnType<typeof getHomePageData>;
type ProductSearch = (query: string) => FeaturedProduct[];
type HomeDataProvider = () => HomePageData;

const MAX_QUERY_LENGTH = 100;

export function homeApiResponse(
  getData: HomeDataProvider = getHomePageData,
) {
  return Response.json(getData());
}

export function productsApiResponse(
  request: Request,
  findProducts: ProductSearch = searchProducts,
) {
  const query = new URL(request.url).searchParams.get("q")?.trim() ?? "";
  if (!query || query.length > MAX_QUERY_LENGTH) {
    return Response.json(
      {
        error: `Query parameter "q" is required and must be at most ${MAX_QUERY_LENGTH} characters.`,
      },
      { status: 400 },
    );
  }

  const products = findProducts(query);
  return Response.json({ query, count: products.length, products });
}
