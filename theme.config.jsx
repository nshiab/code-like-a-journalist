// Nice example here: https://github.com/shuding/nextra/blob/v3/examples/swr-site/theme.config.tsx
import { LocaleSwitch, useConfig } from "nextra-theme-docs";
import { useRouter } from "nextra/hooks";
import { formatDate } from "@nshiab/journalism/web";

const TITLE = {
    en: "Code Like a Journalist",
    fr: "Codez comme un journaliste",
};

const DESCRIPTION = {
    en: "A free online data analysis and data visualization course using TypeScript by computational journalist Nael Shiab.",
    fr: "Un cours gratuit sur l'analyse et la visualisation de données avec TypeScript par le journaliste computationnel Nael Shiab.",
};

const BANNER = {
    en: `<a href="{link}">Work in progress... 👨‍💻 Problems? Reach out →</a>`,
    fr: `<a href="{link}">En construction... 👨‍💻 Problèmes? Contactez moi →</a>`,
};

const FEEDBACK = {
    en: "Questions? Comments? Start a new discussion →",
    fr: "Questions? Commentaires? Démarrez une nouvelle discussion →",
};

const EDIT = {
    en: "Suggest changes to this page on GitHub →",
    fr: "Suggérez une modification pour cette page sur GitHub →",
};

const TOC = {
    en: "On this page",
    fr: "Sur cette page",
};

const SEARCH = {
    emptyResult: {
        en: "No results found.",
        fr: "Aucun résultat trouvé.",
    },
    loading: {
        en: "Loading...",
        fr: "Chargement...",
    },
    error: {
        en: "An error occurred.",
        fr: "Une erreur est survenue.",
    },
    placeholder: {
        en: "Search...",
        fr: "Rechercher...",
    },
};

const SCROLLTOP = {
    en: "Back to top",
    fr: "Retour en haut",
};

const FOOTER = {
    en: (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "100%",
                gap: "1rem",
                textAlign: "center",
            }}
        >
            <div>
                Code Like a Journalist © {new Date().getFullYear()} by{" "}
                <a
                    href="https://www.naelshiab.com/"
                    style={{ textDecoration: "underline" }}
                >
                    Nael Shiab
                </a>{" "}
                is licensed under{" "}
                <a
                    href="https://creativecommons.org/licenses/by/4.0/?ref=chooser-v1"
                    style={{ textDecoration: "underline" }}
                >
                    Creative Commons Attribution 4.0 International
                </a>.
            </div>
            <div>
                This project was funded by the{" "}
                <a
                    href="https://www.michenerawards.ca/media-release/michener-awards-foundation-announces-its-2024-fellowships-winners/"
                    style={{ textDecoration: "underline" }}
                >
                    Michener-L. Richard O’Hagan Fellowship
                </a>{" "}
                from the Michener Awards Foundation.
            </div>
            <div>
                <a href="/contact" style={{ textDecoration: "underline" }}>
                    Contact
                </a>
            </div>
        </div>
    ),
    fr: ((
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "100%",
                gap: "1rem",
                textAlign: "center",
            }}
        >
            <div>
                Codez comme un journaliste © {new Date().getFullYear()} par{" "}
                <a
                    href="https://www.naelshiab.com/"
                    style={{ textDecoration: "underline" }}
                >
                    Nael Shiab
                </a>{" "}
                est publié sous la licence{" "}
                <a
                    href="https://creativecommons.org/licenses/by/4.0/?ref=chooser-v1"
                    style={{ textDecoration: "underline" }}
                >
                    Creative Commons Attribution 4.0 International
                </a>.
            </div>
            <div>
                Ce project a été financé par la{" "}
                <a
                    href="https://www.prixmichener.ca/media-release/la-fondation-des-prix-michener-devoile-les-laureat-e-s-de-ses-bourses-pour-lannee-2024/"
                    style={{ textDecoration: "underline" }}
                >
                    Bourse Michener – L. Richard O’Hagan
                </a>{" "}
                de la Fondation des Prix Michener.
            </div>
            <div>
                <a href="/contact" style={{ textDecoration: "underline" }}>
                    Contact
                </a>
            </div>
        </div>
    )),
};

export default {
    logo: function useText() {
        const { locale } = useRouter();
        return <span>{TITLE[locale]}</span>;
    },
    project: {
        link: "https://github.com/nshiab/code-like-a-journalist",
    },
    docsRepositoryBase:
        "https://github.com/nshiab/code-like-a-journalist/blob/main",
    head() {
        const { asPath, defaultLocale, locale } = useRouter();
        const { frontMatter } = useConfig();
        const url = "https://www.code-like-a-journalist.com/" +
            (defaultLocale === locale ? asPath : `${locale}${asPath}`);

        return (
            <>
                <meta property="og:url" content={url} />
                <meta
                    property="og:site_name"
                    content={TITLE[locale]}
                />
                <meta
                    property="title"
                    content={frontMatter.title || TITLE[locale]}
                />
                <meta
                    property="og:title"
                    content={frontMatter.title || TITLE[locale]}
                />
                <meta
                    property="og:description"
                    content={frontMatter.description ||
                        DESCRIPTION[locale]}
                />
                <meta
                    property="description"
                    content={frontMatter.description ||
                        DESCRIPTION[locale]}
                />
                <meta
                    property="og:image"
                    content="https://www.code-like-a-journalist.com/assets/sharing.jpg"
                />
                <meta
                    property="twitter:image"
                    content="https://www.code-like-a-journalist.com/assets/sharing.jpg"
                />
                <meta property="twitter:card" content="summary_large_image" />
                <meta
                    property="twitter:title"
                    content={frontMatter.title || TITLE[locale]}
                />
                <meta
                    property="twitter:description"
                    content={frontMatter.description ||
                        DESCRIPTION[locale]}
                />
            </>
        );
    },
    banner: {
        dismissible: false,
        key: "wip",
        content: function useText() {
            const { locale } = useRouter();
            return (
                <span
                    dangerouslySetInnerHTML={{
                        __html: BANNER[locale].replace(
                            "{link}",
                            `/${locale}/contact`,
                        ),
                    }}
                />
            );
        },
    },
    search: {
        emptyResult: function useText() {
            const { locale } = useRouter();
            return SEARCH.emptyResult[locale];
        },
        loading: function useText() {
            const { locale } = useRouter();
            return SEARCH.loading[locale];
        },
        error: function useText() {
            const { locale } = useRouter();
            return SEARCH.error[locale];
        },
        placeholder: function useText() {
            const { locale } = useRouter();
            return SEARCH.placeholder[locale];
        },
    },
    feedback: {
        content: function useText() {
            const { locale } = useRouter();
            return <span>{FEEDBACK[locale]}</span>;
        },
        useLink: () =>
            "https://github.com/nshiab/code-like-a-journalist/discussions",
        labels: null,
    },
    editLink: {
        content: function useText() {
            const { locale } = useRouter();
            return <span>{EDIT[locale]}</span>;
        },
    },
    footer: {
        content: function useText() {
            const { locale } = useRouter();
            return FOOTER[locale];
        },
    },
    i18n: [
        { locale: "en", name: "English" },
        { locale: "fr", name: "Français" },
    ],
    navbar: {
        extraContent: LocaleSwitch,
    },
    toc: {
        backToTop: function useText() {
            const { locale } = useRouter();
            return SCROLLTOP[locale];
        },
        title: function useText() {
            const { locale } = useRouter();
            return TOC[locale];
        },
    },
    gitTimestamp: function useText({ timestamp }) {
        const { locale } = useRouter();
        if (locale === "fr") {
            return `Dernière mise à jour le ${
                formatDate(timestamp, "Month DD, YYYY", { style: "rc" })
            }.`;
        }
        return `Last updated on ${formatDate(timestamp, "Month DD, YYYY")}.`;
    },
    // ... other theme options
};
