import { Callout } from "nextra/components";

export default function NoticeIntro({ lang } = { lang: "en" }) {
    return (
        <div style={{ maxWidth: "550px", margin: "2.5rem auto" }}>
            {pickLanguage(lang)}
        </div>
    );
}

function pickLanguage(lang) {
    if (lang === "fr") {
        return (
            <Callout emoji="">
                Vous voulez être prévenu quand de nouvelles leçons sont
                publiées ? Abonnez-vous à{" "}
                <a
                    style={{ textDecoration: "underline", fontWeight: "bold" }}
                    href="https://mailchi.mp/0db676437a2f/code-like-a-journalist"
                >
                    l'infolettre ✉️
                </a>{" "}
                et donnez une ⭐ au cours sur{" "}
                <a
                    style={{ textDecoration: "underline", fontWeight: "bold" }}
                    href="https://github.com/nshiab/code-like-a-journalist"
                >
                    GitHub
                </a>{" "}
                pour me garder motivé !{" "}
                <a
                    style={{ textDecoration: "underline", fontWeight: "bold" }}
                    href="/contact"
                >
                    Cliquez ici
                </a>{" "}
                pour me contacter.
            </Callout>
        );
    } else {
        return (
            <Callout emoji="">
                Want to know when new lessons are available? Subscribe to the
                {" "}
                <a
                    style={{ textDecoration: "underline", fontWeight: "bold" }}
                    href="https://mailchi.mp/0db676437a2f/code-like-a-journalist"
                >
                    newsletter ✉️
                </a>{" "}
                and give a ⭐ to the{" "}
                <a
                    style={{ textDecoration: "underline", fontWeight: "bold" }}
                    href="https://github.com/nshiab/code-like-a-journalist"
                >
                    GitHub repository
                </a>{" "}
                to keep me motivated!{" "}
                <a
                    style={{ textDecoration: "underline", fontWeight: "bold" }}
                    href="/contact"
                >
                    Click here
                </a>{" "}
                to get in touch.
            </Callout>
        );
    }
}
