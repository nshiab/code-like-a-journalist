import { NextResponse } from "next/server";
import { proxy as localeProxy } from "nextra/locales";
import { isSupportedLanguage } from "./locales.mjs";

// Only treat a short language code (optionally with a region) as a locale.
// Section slugs such as "git-and-github" must reach Nextra's locale redirect.
const LOCALE_SEGMENT = /^[a-z]{2,3}(?:-[a-z]{2}|-[0-9]{3})?$/i;

export function proxy(request) {
    const firstSegment = request.nextUrl.pathname.split("/", 2)[1];

    // Return a real 404 instead of treating an unsupported locale prefix as an
    // unprefixed content route and redirecting it.
    if (
        firstSegment &&
        LOCALE_SEGMENT.test(firstSegment) &&
        !isSupportedLanguage(firstSegment)
    ) {
        return new NextResponse("Not Found", {
            status: 404,
            headers: { "content-type": "text/plain; charset=utf-8" },
        });
    }

    const response = localeProxy(request);
    const location = response?.headers.get("location");
    if (location && request.nextUrl.search) {
        const destination = new URL(location);
        destination.search = request.nextUrl.search;
        response.headers.set("location", destination.href);
    }
    return response;
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|icon.svg|apple-icon.png|manifest|assets|_pagefind).*)",
    ],
};
