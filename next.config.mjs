import nextra from "nextra";

const withNextra = nextra({
    contentDirBasePath: "/",
    defaultShowCopyCode: true,
});

export default withNextra({
    agentRules: false,
    i18n: {
        locales: ["en", "fr"],
        defaultLocale: "en",
    },
});

// If you have other Next.js configurations, you can pass them as the parameter:
// export default withNextra({ /* other next.js config */ })
