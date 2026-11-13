import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { close, createIndex } from "pagefind";
import { LANGUAGES } from "../locales.mjs";

const vercelOutput = ".next/output";
const usesVercelAdapter = existsSync(`${vercelOutput}/config.json`);
const { routes } = JSON.parse(
    await readFile(".next/prerender-manifest.json", "utf8"),
);
const lessonUrls = Object.keys(routes).filter((url) =>
    LANGUAGES.includes(url.split("/")[1]),
);
if (lessonUrls.length === 0) {
    throw new Error("No prerendered lesson URLs found for Pagefind.");
}

try {
    const { index, errors } = await createIndex();
    if (!index) {
        throw new Error(`Could not create the Pagefind index: ${errors.join("\n")}`);
    }

    for (const url of lessonUrls) {
        const content = await readFile(getLessonHtmlPath(url), "utf8");
        const { errors } = await index.addHTMLFile({ url, content });
        if (errors.length > 0) {
            throw new Error(`Could not index ${url}: ${errors.join("\n")}`);
        }
    }

    const outputPaths = ["public/_pagefind"];
    if (usesVercelAdapter) {
        // The adapter has already copied public files when postbuild starts.
        outputPaths.push(`${vercelOutput}/static/_pagefind`);
    }
    for (const outputPath of outputPaths) {
        const { errors } = await index.writeFiles({ outputPath });
        if (errors.length > 0) {
            throw new Error(`Could not write ${outputPath}: ${errors.join("\n")}`);
        }
    }
    console.log(`Pagefind indexed ${lessonUrls.length} lesson URLs.`);
} finally {
    await close();
}

function getLessonHtmlPath(url) {
    if (usesVercelAdapter) {
        const fallback = `${vercelOutput}/functions${url}.prerender-fallback.html`;
        if (existsSync(fallback)) {
            return fallback;
        }
        return `${vercelOutput}/static${url}.html`;
    }
    return `.next/server/app${url}.html`;
}
