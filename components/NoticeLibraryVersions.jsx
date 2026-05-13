import { Callout } from "nextra/components";

export default function NoticeLibraryVersions({ lang } = { lang: "en" }) {
    return (
        <div style={{ maxWidth: "550px", margin: "2.5rem auto" }}>
            {pickLanguage(lang)}
        </div>
    );
}

function pickLanguage(lang) {
    if (lang === "fr") {
        return (
            <Callout type="error" emoji="⚠️">
                Bien qu'elle ne soit pas dans les captures d'écran, n'oubliez
                pas l'option{" "}
                <code style={{ whiteSpace: "nowrap" }}>--course</code>. Je l'ai
                ajoutée pour que vous ayez les bonnes versions des librairies,
                même si elles ont continué à évoluer depuis la création de ce
                cours.
            </Callout>
        );
    } else {
        return (
            <Callout type="error" emoji="⚠️">
                Although not shown in the screenshots, don't forget the{" "}
                <code style={{ whiteSpace: "nowrap" }}>--course</code>{" "}
                option. I added it so you get the correct versions of the
                libraries, even if they continued to evolve since this course
                was created.
            </Callout>
        );
    }
}
