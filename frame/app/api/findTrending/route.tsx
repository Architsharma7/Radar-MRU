import { fetchDataAndProcess } from "@/utils/trendingMints";
import { kv } from "@vercel/kv";

export async function POST() {
  try {
    const tokenList = await fetchDataAndProcess();
    await kv.set("globalList", tokenList);

    return new Response("Trending Token list Stored", {
      status: 200,
    });
  } catch (error: any) {
    return new Response(error, { status: 500 });
  }
}
