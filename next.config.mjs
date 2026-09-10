import nextra from "nextra";

const withNextra = nextra({
    contentDirBasePath: "/",
    defaultShowCopyCode: true,
});

export default withNextra({
    redirects() {
        const projects = [
            "saving-account-calculator",
            "stock-market-simulator",
            "stats-can-census",
            "one-billion-row-challenge",
            "web-scraping",
        ];
        return ["", "/en", "/fr"].flatMap((prefix) =>
            projects.map((project) => ({
                source: `${prefix}/${project}`,
                destination: `${prefix}/data-projects/${project}`,
                permanent: true,
                locale: false,
            })),
        );
    },
    i18n: {
        locales: ["en", "fr"],
        defaultLocale: "en",
    },
});

// If you have other Next.js configurations, you can pass them as the parameter:
// export default withNextra({ /* other next.js config */ })
