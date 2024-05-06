import puppeteer from "puppeteer";

export async function renderScreenshotWithPuppeteer(url: string) {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.goto(url);
    const screenshot = await page.screenshot({
        encoding: "binary",
        type: "jpeg",
    });

    await browser.close();

    return screenshot;
}
