export const LANGUAGES = ["en", "fr"];

export const SITE_URL = "https://www.code-like-a-journalist.com";
export const SHARING_IMAGE = `${SITE_URL}/assets/sharing-v1.jpg`;

export const COPY = {
    en: {
        title: "Code Like a Journalist",
        description:
            "A free online data analysis and data visualization course using TypeScript by computational journalist Nael Shiab.",
        banner:
            "Enjoying this course? Tag me in a post and I’ll feature it! 🥳 →",
        feedback: "Questions? Comments? Start a new discussion →",
        edit: "Suggest changes to this page on GitHub →",
        toc: "On this page",
        backToTop: "Back to top",
        lastUpdated: "Last updated on",
        search: {
            emptyResult: "No results found.",
            loading: "Loading...",
            error: "An error occurred.",
            placeholder: "Search...",
        },
        theme: {
            light: "Light",
            dark: "Dark",
            system: "System",
        },
    },
    fr: {
        title: "Codez comme un journaliste",
        description:
            "Un cours gratuit sur l'analyse et la visualisation de données avec TypeScript par le journaliste computationnel Nael Shiab.",
        banner:
            "Vous aimez ce cours? Identifiez-moi dans une publication et je la mettrai en avant! 🥳 →",
        feedback:
            "Questions? Commentaires? Démarrez une nouvelle discussion →",
        edit: "Suggérez une modification pour cette page sur GitHub →",
        toc: "Sur cette page",
        backToTop: "Retour en haut",
        lastUpdated: "Dernière mise à jour le",
        search: {
            emptyResult: "Aucun résultat trouvé.",
            loading: "Chargement...",
            error: "Une erreur est survenue.",
            placeholder: "Rechercher...",
        },
        theme: {
            light: "Clair",
            dark: "Sombre",
            system: "Système",
        },
    },
};

export function isSupportedLanguage(lang) {
    return LANGUAGES.includes(lang);
}

export function getLocalizedPath(lang, mdxPath = []) {
    return `/${[lang, ...mdxPath].filter(Boolean).join("/")}`;
}

export function getPageMetadata(lang, mdxPath, pageMetadata) {
    const copy = COPY[lang];
    const title = pageMetadata.title || copy.title;
    const description = pageMetadata.description || copy.description;
    const canonical = getLocalizedPath(lang, mdxPath);
    const contentPath = mdxPath || [];

    return {
        title,
        description,
        alternates: {
            canonical,
            languages: {
                en: getLocalizedPath("en", contentPath),
                fr: getLocalizedPath("fr", contentPath),
                "x-default": getLocalizedPath("en", contentPath),
            },
        },
        openGraph: {
            title,
            description,
            url: canonical,
            siteName: copy.title,
            images: [SHARING_IMAGE],
            locale: lang === "fr" ? "fr_CA" : "en_CA",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [SHARING_IMAGE],
        },
    };
}
