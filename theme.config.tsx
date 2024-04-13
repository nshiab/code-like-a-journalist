import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: <span>Code Like a Journalist</span>,
  project: {
    link: "https://github.com/nshiab/code-like-a-journalist",
  },
  docsRepositoryBase: "https://github.com/nshiab/code-like-a-journalist",
  editLink: {
    component: null,
  },
  feedback: {
    content: null,
  },
  useNextSeoProps() {
    return {
      titleTemplate: "%s",
    };
  },
  head: (
    <>
      <meta
        property="og:description"
        content="Free online data analysis and data visualization course using JavaScript/TypeScript"
      />
    </>
  ),
  footer: {
    text: (
      <div style={{ width: "100%" }}>
        <p>
          <a
            href="https://www.code-like-a-journalist.com/"
            className="nx-text-primary-600 nx-underline nx-decoration-from-font [text-underline-position:from-font]"
            target="_blank"
          >
            Code Like a Journalist
          </a>{" "}
          © {new Date().getFullYear()} by{" "}
          <a
            href="https://github.com/nshiab/code-like-a-journalist"
            className="nx-text-primary-600 nx-underline nx-decoration-from-font [text-underline-position:from-font]"
            target="_blank"
          >
            Nael Shiab
          </a>{" "}
          is licensed under{" "}
          <a
            href="https://creativecommons.org/licenses/by/4.0/?ref=chooser-v1"
            target="_blank"
            className="nx-text-primary-600 nx-underline nx-decoration-from-font [text-underline-position:from-font]"
          >
            Creative Commons Attribution 4.0 International
          </a>
          .
        </p>
      </div>
    ),
  },
};

export default config;
