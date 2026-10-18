import { io } from "next/cache";
import { productsApiResponse } from "@/lib/api-responses";

export async function GET(request: Request) {
  await io();
  return productsApiResponse(request);
}
