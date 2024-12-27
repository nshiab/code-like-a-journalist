// Nice example here: https://github.com/shuding/nextra/blob/v3/examples/swr-site/theme.config.tsx
import { LocaleSwitch, useConfig } from "nextra-theme-docs";
import { useRouter } from "nextra/hooks";

const TITLE = {
    en: "Code Like a Journalist",
    fr: "Codez comme un journaliste",
};

const DESCRIPTION = {
    en: "A free online data analysis and data visualization course using JavaScript/TypeScript by computational journalist Nael Shiab.",
    fr: "Un cours gratuit sur l'analyse et la visualisation de données avec JavaScript/TypeScript par le journaliste computationnel Nael Shiab.",
};

const BANNER = {
    en: "Work in progress... 👨‍💻",
    fr: "Site en construction... 👨‍💻",
};

const FEEDBACK = {
    en: "Questions? Comments? Start a new discussion →",
    fr: "Questions? Commentaires? Démarrez une nouvelle discussion →",
};

const EDIT = {
    en: "Suggest changes to this page on GitHub →",
    fr: "Suggérez une modification pour cette page sur GitHub →",
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

const FOOTER = {
    en: (
        <div
            style={{ textAlign: "center", margin: "0 auto", width: "100%" }}
        >
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
    ),
    fr: ((
        <div
            style={{ textAlign: "center", margin: "0 auto", width: "100%" }}
        >
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
    docsRepositoryBase: "https://github.com/nshiab/code-like-a-journalist",
    head() {
        const { asPath, defaultLocale, locale } = useRouter();
        const { frontMatter } = useConfig();
        const url = "https://www.code-like-a-journalist.com/" +
            (defaultLocale === locale ? asPath : `/${locale}${asPath}`);

        return (
            <>
                <meta property="og:url" content={url} />
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
                    property="og:image"
                    content="https://www.code-like-a-journalist.com/img/sharing.jpg"
                />
            </>
        );
    },
    banner: {
        dismissible: false,
        key: "wip",
        content: function useText() {
            const { locale } = useRouter();
            return <span>{BANNER[locale]}</span>;
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
    // ... other theme options
};
