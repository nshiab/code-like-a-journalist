import nextra from "nextra";
import { DEFAULT_LANGUAGE, LANGUAGES } from "./locales.mjs";

const withNextra = nextra({
    contentDirBasePath: "/",
    defaultShowCopyCode: true,
    unstable_shouldAddLocaleToLinks: true,
});

const movedLessons = {
    "/saving-account-calculator": "/data-projects/saving-account-calculator",
    "/stock-market-simulator": "/data-projects/stock-market-simulator",
    "/stats-can-census": "/data-projects/stats-can-census",
    "/one-billion-row-challenge": "/data-projects/one-billion-row-challenge",
    "/ninja-moves/refactoring": "/extras/refactoring",
    "/ninja-moves/math-for-journalists": "/extras/math-for-journalists",
    "/ninja-moves/semver": "/extras/semver",
    "/ninja-moves/tests": "/extras/tests",
    "/pushing-further/tasks": "/pushing-further/commands-with-npm",
};

export default withNextra({
    redirects() {
        const localePrefixes = ["", ...LANGUAGES.map((lang) => `/${lang}`)];
        return localePrefixes.flatMap((prefix) =>
            Object.entries(movedLessons).map(([source, destination]) => ({
                source: `${prefix}${source}`,
                destination: `${prefix}${destination}`,
                permanent: true,
                locale: false,
            })),
        );
    },
    i18n: {
        locales: LANGUAGES,
        defaultLocale: DEFAULT_LANGUAGE,
    },
});

// If you have other Next.js configurations, you can pass them as the parameter:
// export default withNextra({ /* other next.js config */ })
