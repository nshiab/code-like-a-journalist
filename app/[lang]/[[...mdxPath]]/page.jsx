import { notFound } from "next/navigation";
import { getPageMap } from "nextra/page-map";
import { generateStaticParamsFor, importPage } from "nextra/pages";

import { useMDXComponents as getMDXComponents } from "../../../mdx-components";
import {
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

export default async function Page(props) {
    const params = await props.params;
    await ensurePageExists(params.lang, params.mdxPath);
    const { default: MDXContent, toc, metadata, sourceCode } = await importPage(
        params.mdxPath,
        params.lang,
    );

    return (
        <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
            <MDXContent {...props} params={params} />
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
