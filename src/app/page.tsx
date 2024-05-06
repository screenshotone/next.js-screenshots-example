"use client";

import { FormEvent, useState } from "react";

export default function Home() {
    const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const response = await fetch("/api/screenshot", {
            method: "POST",
            body: JSON.stringify({ url: formData.get("url")?.toString() }),
        });

        if (response.ok) {
            const encoded = Buffer.from(await response.arrayBuffer()).toString(
                "base64"
            );
            setScreenshotUrl(`data:image/jpeg;base64,${encoded}`);
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center gap-24 p-24">
            <h1 className="text-7xl font-semibold tracking-tighter">
                Render Screenshots
            </h1>
            <div>
                <form onSubmit={onSubmit}>
                    <div className="flex gap-2">
                        <input
                            type="url"
                            name="url"
                            placeholder="https://example.com"
                            className="ring-1 text-lg rounded-md p-4 w-96"
                        />
                        <button
                            type="submit"
                            className="bg-red-500 text-white inline-flex items-center justify-center whitespace-nowrap rounded-md text-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 p-4"
                        >
                            Render
                        </button>
                    </div>
                </form>
            </div>
            <div>{screenshotUrl && <img src={screenshotUrl} />}</div>
        </main>
    );
}
