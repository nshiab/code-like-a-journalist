import { readdir } from "node:fs/promises";
import path from "node:path";

const BASE_URL = process.env.SMOKE_BASE_URL || "http://localhost:3000";
const CONTENT_DIRECTORY = new URL("../content/", import.meta.url);

const files = await findMdxFiles(CONTENT_DIRECTORY);
const routes = files.map(toRoute).sort();
const englishRoutes = routes.filter((route) => route.startsWith("/en"));
const frenchRoutes = routes.filter((route) => route.startsWith("/fr"));

assert(englishRoutes.length === 33, `Expected 33 English routes, found ${englishRoutes.length}.`);
assert(frenchRoutes.length === 33, `Expected 33 French routes, found ${frenchRoutes.length}.`);

const englishPaths = englishRoutes.map((route) => route.slice(3));
const frenchPaths = frenchRoutes.map((route) => route.slice(3));
assert(
    JSON.stringify(englishPaths) === JSON.stringify(frenchPaths),
    "The English and French content trees do not match.",
);

const failures = [];
for (let index = 0; index < routes.length; index += 4) {
    await Promise.all(
        routes.slice(index, index + 4).map(async (route) => {
            const response = await fetch(`${BASE_URL}${route}`, {
                redirect: "manual",
            });
            if (response.status !== 200) {
                failures.push(`${response.status} ${route}`);
            }
        }),
    );
}

await expectResponse("/", 307, "/en");
await expectResponse(
    "/first-steps/setup",
    307,
    "/fr/first-steps/setup",
    { "accept-language": "fr-CA,fr;q=0.9" },
);
await expectResponse("/contact", 307, "/fr/contact", {
    cookie: "NEXT_LOCALE=fr",
});
for (const language of ["en", "fr"]) {
    await expectResponse(
        "/pushing-further/commands-with-npm",
        307,
        `/${language}/pushing-further/commands-with-npm`,
        { "accept-language": language },
    );
    await expectLocalizedLinks(language);
}
await expectResponse("/en/does-not-exist", 404);
await expectResponse("/de/does-not-exist", 404);
await expectResponse(
    "/git-and-github/github-basics",
    307,
    "/fr/git-and-github/github-basics",
    { "accept-language": "fr-CA,fr;q=0.9" },
);

const legacyRedirects = [
    ...[
        "saving-account-calculator",
        "stock-market-simulator",
        "stats-can-census",
        "one-billion-row-challenge",
    ].map((project) => [`/${project}`, `/data-projects/${project}`]),
    ...["refactoring", "math-for-journalists", "semver", "tests"].map(
        (lesson) => [`/ninja-moves/${lesson}`, `/extras/${lesson}`],
    ),
    ["/pushing-further/tasks", "/pushing-further/commands-with-npm"],
];
await Promise.all(
    ["", "/en", "/fr"].flatMap((prefix) =>
        legacyRedirects.map(([source, destination]) =>
            expectResponse(
                `${prefix}${source}?source=bookmark`,
                308,
                `${prefix}${destination}?source=bookmark`,
            ),
        ),
    ),
);
await expectResponse(
    "/extras/refactoring?source=bookmark",
    307,
    "/fr/extras/refactoring?source=bookmark",
    { cookie: "NEXT_LOCALE=fr" },
);

const removedPaths = [
    "advanced-analysis/using-ai",
    "advanced-analysis/openstreetmap-data",
    "advanced-analysis/similarity-and-clustering",
    "advanced-analysis/network-analysis",
    "advanced-analysis/conclusion",
    "web-basics/html",
    "web-basics/css",
    "web-basics/javascript",
    "web-basics/svelte",
    "d3-chart",
    "d3-map",
    "git-and-github/github-pages",
    "git-and-github/github-actions",
    "data-projects/web-scraping",
    "ninja-moves/publishing-library",
    "extras/publishing-library",
    "web-scraping",
    "inspirations",
    "more",
    "simple-data-analysis/sda-and-ai",
];
await Promise.all(
    ["en", "fr"].flatMap((language) =>
        removedPaths.map((route) =>
            expectResponse(`/${language}/${route}`, 404),
        ),
    ),
);

if (failures.length) {
    throw new Error(`Route smoke test failures:\n${failures.join("\n")}`);
}

console.log(`Smoke checked ${routes.length} localized content routes.`);

async function expectLocalizedLinks(language) {
    const route = `/${language}/pushing-further/fetch`;
    const otherLanguage = language === "en" ? "fr" : "en";
    const response = await fetch(`${BASE_URL}${route}`, {
        headers: { cookie: `NEXT_LOCALE=${otherLanguage}` },
    });
    const html = await response.text();
    const hrefs = Array.from(html.matchAll(/<a\s[^>]*\bhref="([^"]+)"/g),
        ([, href]) => href,
    );

    // The previous lesson also appears in the sidebar and in the lesson text.
    for (const [path, occurrences] of [
        ["/pushing-further/files", 3],
        ["/pushing-further/libraries", 2],
    ]) {
        const localized = hrefs.filter((href) => href === `/${language}${path}`);
        if (localized.length < occurrences || hrefs.includes(path) ||
            hrefs.includes(`/${otherLanguage}${path}`)) {
            failures.push(`${route} contains incorrect lesson links for ${path}`);
        }
    }
}

async function expectResponse(route, expectedStatus, expectedLocation, headers) {
    const response = await fetch(`${BASE_URL}${route}`, {
        headers,
        redirect: "manual",
    });
    if (response.status !== expectedStatus) {
        failures.push(
            `${response.status} ${route} (expected ${expectedStatus})`,
        );
    }
    if (
        expectedLocation &&
        response.headers.get("location") !== expectedLocation
    ) {
        failures.push(
            `${route} redirected to ${response.headers.get("location")} (expected ${expectedLocation})`,
        );
    }
}

async function findMdxFiles(directoryUrl) {
    const entries = await readdir(directoryUrl, { withFileTypes: true });
    const nestedFiles = await Promise.all(
        entries.map(async (entry) => {
            const entryUrl = new URL(entry.name, directoryUrl);
            if (entry.isDirectory()) {
                entryUrl.pathname += "/";
                return findMdxFiles(entryUrl);
            }
            return entry.isFile() && entry.name.endsWith(".mdx")
                ? [entryUrl]
                : [];
        }),
    );
    return nestedFiles.flat();
}

function toRoute(fileUrl) {
    const relativePath = path.relative(
        CONTENT_DIRECTORY.pathname,
        fileUrl.pathname,
    );
    return `/${relativePath}`
        .replaceAll(path.sep, "/")
        .replace(/\.mdx$/, "")
        .replace(/\/index$/, "");
}

function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}
