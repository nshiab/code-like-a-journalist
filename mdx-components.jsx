import { useMDXComponents as getThemeComponents } from "nextra-theme-docs";
import OutdatedScreenshot from "./components/OutdatedScreenshot.jsx";

const themeComponents = getThemeComponents();

export function useMDXComponents(components) {
    return {
        ...themeComponents,
        OutdatedScreenshot,
        ...components,
    };
}
