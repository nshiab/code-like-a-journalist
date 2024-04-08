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
  footer: {
    text: (
      <span>
        MIT {new Date().getFullYear()} ©{" "}
        <a href="https://github.com/nshiab" target="_blank">
          Nael Shiab
        </a>
        .
      </span>
    ),
  },
};

export default config;
