import { readdir } from "node:fs/promises";
import path from "node:path";

const BASE_URL = process.env.SMOKE_BASE_URL || "http://localhost:3000";
const CONTENT_DIRECTORY = new URL("../content/", import.meta.url);

const files = await findMdxFiles(CONTENT_DIRECTORY);
const routes = files.map(toRoute).sort();
const englishRoutes = routes.filter((route) => route.startsWith("/en"));
const frenchRoutes = routes.filter((route) => route.startsWith("/fr"));

assert(englishRoutes.length === 41, `Expected 41 English routes, found ${englishRoutes.length}.`);
assert(frenchRoutes.length === 41, `Expected 41 French routes, found ${frenchRoutes.length}.`);

const englishPaths = englishRoutes.map((route) => route.slice(3));
const frenchPaths = frenchRoutes.map((route) => route.slice(3));
assert(
    JSON.stringify(englishPaths) === JSON.stringify(frenchPaths),
    "The English and French content trees do not match.",
);

const failures = [];
await Promise.all(
    routes.map(async (route) => {
        const response = await fetch(`${BASE_URL}${route}`, {
            redirect: "manual",
        });
        if (response.status !== 200) {
            failures.push(`${response.status} ${route}`);
        }
    }),
);

await expectResponse("/", 307, "/en");
await expectResponse(
    "/first-steps/setup",
    307,
    "/fr/first-steps/setup",
    { "accept-language": "fr-CA,fr;q=0.9" },
);
await expectResponse("/more", 307, "/fr/more", {
    cookie: "NEXT_LOCALE=fr",
});
await expectResponse("/en/does-not-exist", 404);
await expectResponse("/de/does-not-exist", 404);

if (failures.length) {
    throw new Error(`Route smoke test failures:\n${failures.join("\n")}`);
}

console.log(`Smoke checked ${routes.length} localized content routes.`);

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
