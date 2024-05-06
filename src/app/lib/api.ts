if (!process.env.SCREENSHOTONE_ACCESS_KEY) {
    throw new Error("SCREENSHOTONE_ACCESS_KEY is required");
}

const accessKey = process.env.SCREENSHOTONE_ACCESS_KEY;

export async function renderScreenshotWithScreenshotAPI(url: string) {
    const params = new URLSearchParams({
        access_key: accessKey,
        url: url,
    });

    const response = await fetch(
        "https://api.screenshotone.com/take?" + params.toString()
    );
    if (response.ok) {
        return await response.arrayBuffer();
    }

    throw new Error(
        `Failed to render screenshot: response status code is ${response.status}`
    );
}
