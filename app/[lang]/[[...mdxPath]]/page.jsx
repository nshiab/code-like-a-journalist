import { notFound } from "next/navigation";
import { getPageMap } from "nextra/page-map";
import { generateStaticParamsFor, importPage } from "nextra/pages";
import { LastUpdated } from "nextra-theme-docs";

import { useMDXComponents as getMDXComponents } from "../../../mdx-components";
import {
    COPY,
    getPageMetadata,
    isSupportedLanguage,
} from "../../site-config";

export const generateStaticParams = generateStaticParamsFor("mdxPath");

export async function generateMetadata({ params }) {
    const { lang, mdxPath } = await params;
    await ensurePageExists(lang, mdxPath);

    const { metadata } = await importPage(mdxPath, lang);
    return getPageMetadata(lang, mdxPath, metadata);
}

const Wrapper = getMDXComponents().wrapper;
const Heading = getMDXComponents().h1;

export default async function Page(props) {
    const params = await props.params;
    await ensurePageExists(params.lang, params.mdxPath);
    const { default: MDXContent, toc, metadata, sourceCode } = await importPage(
        params.mdxPath,
        params.lang,
    );
    const { timestamp, ...wrapperMetadata } = metadata;

    return (
        <Wrapper toc={toc} metadata={wrapperMetadata} sourceCode={sourceCode}>
            <MDXContent
                {...props}
                params={params}
                components={{
                    h1: (headingProps) => (
                        <>
                            <Heading {...headingProps} />
                            <p style={{ marginTop: "1rem", fontSize: "0.875rem" }}>
                                <a
                                    href={`/${params.lang}/contact`}
                                    style={{ textDecoration: "underline" }}
                                >
                                    {params.lang === "fr"
                                        ? "Par Nael Shiab"
                                        : "By Nael Shiab"}
                                </a>
                            </p>
                            {timestamp && (
                                <p
                                    style={{
                                        marginTop: "0.25rem",
                                        fontSize: "0.75rem",
                                        opacity: 0.7,
                                    }}
                                >
                                    <LastUpdated
                                        date={new Date(timestamp)}
                                        locale={params.lang}
                                    >
                                        {COPY[params.lang].lastUpdated}
                                    </LastUpdated>
                                </p>
                            )}
                        </>
                    ),
                }}
            />
        </Wrapper>
    );
}

async function ensurePageExists(lang, mdxPath = []) {
    if (!isSupportedLanguage(lang)) {
        notFound();
    }

    const route = `/${mdxPath.join("/")}`;
    const pageMap = await getPageMap(`/${lang}`);
    if (!pageMapHasRoute(pageMap, route)) {
        notFound();
    }
}

function pageMapHasRoute(pageMap, route) {
    return pageMap.some((item) => {
        if (!("route" in item)) {
            return false;
        }
        if (!("children" in item)) {
            return item.route === route;
        }
        return pageMapHasRoute(item.children, route);
    });
}
