import { renderScreenshotWithScreenshotAPI } from "@/app/lib/api";
import { unstable_noStore } from "next/cache";

export async function POST(request: Request) {
    unstable_noStore();

    const data = (await request.json()) as { url: string };

    const screenshot = await renderScreenshotWithScreenshotAPI(data.url);

    return new Response(screenshot, {
        headers: { "content-type": "image/jpeg" },
    });
}
