export const LOCALES = [
    { locale: "en", name: "English" },
    { locale: "fr", name: "Français" },
];

export const LANGUAGES = LOCALES.map(({ locale }) => locale);
export const DEFAULT_LANGUAGE = LOCALES[0].locale;

export function isSupportedLanguage(lang) {
    return LANGUAGES.includes(lang);
}
