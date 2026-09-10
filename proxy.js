import { NextResponse } from "next/server";
import { proxy as localeProxy } from "nextra/locales";

const SUPPORTED_LOCALES = new Set(["en", "fr"]);
const LOCALE_SEGMENT = /^[a-z]{2,3}(?:-[a-z0-9]{2,8})*$/i;

export function proxy(request) {
    const firstSegment = request.nextUrl.pathname.split("/", 2)[1];

    // Return a real 404 instead of treating an unsupported locale prefix as an
    // unprefixed content route and redirecting it.
    if (
        firstSegment &&
        LOCALE_SEGMENT.test(firstSegment) &&
        !SUPPORTED_LOCALES.has(firstSegment)
    ) {
        return new NextResponse("Not Found", {
            status: 404,
            headers: { "content-type": "text/plain; charset=utf-8" },
        });
    }

    return localeProxy(request);
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|icon.svg|apple-icon.png|manifest|assets|_pagefind).*)",
    ],
};
