import { io } from "next/cache";
import { homeApiResponse } from "@/lib/api-responses";

export async function GET() {
  await io();
  return homeApiResponse();
}
