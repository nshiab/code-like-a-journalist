import { Analytics } from "@vercel/analytics/next";
import { notFound } from "next/navigation";
import { Banner, Head, Search } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import {
    Footer,
    LastUpdated,
    Layout,
    LocaleSwitch,
    Navbar,
} from "nextra-theme-docs";
import "nextra-theme-docs/style.css";
import "../nextra-3-callouts.css";

import {
    COPY,
    isSupportedLanguage,
    SHARING_IMAGE,
    SITE_URL,
} from "../site-config";

const PROJECT_URL = "https://github.com/nshiab/code-like-a-journalist";
const DOCS_REPOSITORY_BASE = `${PROJECT_URL}/blob/main`;
const FEEDBACK_URL = `${PROJECT_URL}/discussions`;

export async function generateMetadata({ params }) {
    const { lang } = await params;
    if (!isSupportedLanguage(lang)) {
        return {};
    }

    const copy = COPY[lang];
    return {
        metadataBase: new URL(SITE_URL),
        title: copy.title,
        description: copy.description,
        openGraph: {
            title: copy.title,
            description: copy.description,
            url: `/${lang}`,
            siteName: copy.title,
            images: [SHARING_IMAGE],
            locale: lang === "fr" ? "fr_CA" : "en_CA",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: copy.title,
            description: copy.description,
            images: [SHARING_IMAGE],
        },
        icons: {
            icon: [
                {
                    url: "/assets/favicon-32x32.png",
                    sizes: "32x32",
                    type: "image/png",
                },
                {
                    url: "/assets/favicon-16x16.png",
                    sizes: "16x16",
                    type: "image/png",
                },
            ],
            apple: [
                {
                    url: "/assets/apple-touch-icon.png",
                    sizes: "180x180",
                    type: "image/png",
                },
            ],
        },
    };
}

export default async function RootLayout({ children, params }) {
    const { lang } = await params;
    if (!isSupportedLanguage(lang)) {
        notFound();
    }

    const copy = COPY[lang];
    const banner = (
        <Banner dismissible={false} storageKey="v1">
            <a href={`/${lang}/contact`}>{copy.banner}</a>
        </Banner>
    );
    const navbar = (
        <Navbar
            logo={<span>{copy.title}</span>}
            logoLink={`/${lang}`}
            projectLink={PROJECT_URL}
        >
            <LocaleSwitch />
        </Navbar>
    );
    const footer = <FooterContent lang={lang} />;

    return (
        <html lang={lang} dir="ltr" suppressHydrationWarning>
            <Head />
            <body>
                <Layout
                    banner={banner}
                    copyPageButton={false}
                    docsRepositoryBase={DOCS_REPOSITORY_BASE}
                    editLink={copy.edit}
                    feedback={{
                        content: copy.feedback,
                        link: FEEDBACK_URL,
                    }}
                    footer={footer}
                    i18n={[
                        { locale: "en", name: "English" },
                        { locale: "fr", name: "Français" },
                    ]}
                    lastUpdated={
                        <LastUpdated locale={lang}>
                            {copy.lastUpdated}
                        </LastUpdated>
                    }
                    navbar={navbar}
                    pageMap={await getPageMap(`/${lang}`)}
                    search={
                        <Search
                            emptyResult={copy.search.emptyResult}
                            errorText={copy.search.error}
                            loading={copy.search.loading}
                            placeholder={copy.search.placeholder}
                        />
                    }
                    sidebar={{ defaultMenuCollapseLevel: 99 }}
                    themeSwitch={copy.theme}
                    toc={{
                        backToTop: copy.backToTop,
                        title: copy.toc,
                    }}
                >
                    {children}
                </Layout>
                <Analytics />
            </body>
        </html>
    );
}

function FooterContent({ lang }) {
    const linkStyle = { textDecoration: "underline" };
    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        maxWidth: "600px",
        gap: "1rem",
        margin: "0 auto",
        textAlign: "center",
    };

    if (lang === "fr") {
        return (
            <Footer>
                <div style={containerStyle}>
                    <div>
                        Codez comme un journaliste © {new Date().getFullYear()}{" "}
                        est publié sous la licence{" "}
                        <a
                            href="https://creativecommons.org/licenses/by/4.0/?ref=chooser-v1"
                            style={linkStyle}
                        >
                            CC BY 4.0
                        </a>
                        . Vous devez donner le crédit à{" "}
                        <a href="https://www.naelshiab.com/" style={linkStyle}>
                            Nael Shiab
                        </a>{" "}
                        avec un lien vers le{" "}
                        <a
                            href="https://www.code-like-a-journalist.com/fr"
                            style={linkStyle}
                        >
                            site web
                        </a>
                        . Ce projet a été financé par la{" "}
                        <a
                            href="https://www.prixmichener.ca/media-release/la-fondation-des-prix-michener-devoile-les-laureat-e-s-de-ses-bourses-pour-lannee-2024/"
                            style={linkStyle}
                        >
                            Bourse Michener – L. Richard O’Hagan
                        </a>{" "}
                        de la Fondation des Prix Michener.
                    </div>
                    <div>
                        Pour me contacter,{" "}
                        <a href="/fr/contact" style={linkStyle}>
                            c&apos;est par ici
                        </a>
                        .
                    </div>
                    <div>
                        Ce site web utilise{" "}
                        <a href="https://nextra.site/" style={linkStyle}>
                            Nextra ❤️
                        </a>
                        .
                    </div>
                </div>
            </Footer>
        );
    }

    return (
        <Footer>
            <div style={containerStyle}>
                <div>
                    Code Like a Journalist © {new Date().getFullYear()} is
                    licensed under{" "}
                    <a
                        href="https://creativecommons.org/licenses/by/4.0/?ref=chooser-v1"
                        style={linkStyle}
                    >
                        CC BY 4.0
                    </a>
                    . You have to give credit to{" "}
                    <a href="https://www.naelshiab.com/" style={linkStyle}>
                        Nael Shiab
                    </a>{" "}
                    with a link to the{" "}
                    <a
                        href="https://www.code-like-a-journalist.com/"
                        style={linkStyle}
                    >
                        website
                    </a>
                    . This project was funded by the{" "}
                    <a
                        href="https://www.michenerawards.ca/media-release/michener-awards-foundation-announces-its-2024-fellowships-winners/"
                        style={linkStyle}
                    >
                        Michener-L. Richard O’Hagan Fellowship
                    </a>{" "}
                    from the Michener Awards Foundation.
                </div>
                <div>
                    To reach out,{" "}
                    <a href="/en/contact" style={linkStyle}>
                        head over here
                    </a>
                    .
                </div>
                <div>
                    Built with{" "}
                    <a href="https://nextra.site/" style={linkStyle}>
                        Nextra ❤️
                    </a>
                    .
                </div>
            </div>
        </Footer>
    );
}
