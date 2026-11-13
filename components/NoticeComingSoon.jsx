import { Callout } from "nextra/components";

export default function NoticeComingSoon({ lang = "en" }) {
    return (
        <div style={{ maxWidth: "550px", margin: "1.5rem auto 2.5rem" }}>
            <Callout emoji="" style={{ lineHeight: 1.7 }}>
                {lang === "fr" ? (
                    <>
                        Je travaille encore sur ce chapitre. Abonnez-vous à{" "}
                        <a
                            style={{ textDecoration: "underline" }}
                            href="https://mailchi.mp/0db676437a2f/code-like-a-journalist"
                        >
                            l'infolettre ✉️
                        </a>{" "}
                        pour savoir quand il sera publié. En attendant,
                        découvrez les{" "}
                        <a
                            style={{ textDecoration: "underline" }}
                            href="https://github.com/nshiab/simple-data-analysis"
                        >
                            exemples de Simple Data Analysis
                        </a>{" "}
                        et profitez-en pour ajouter un ⭐ au repo !
                    </>
                ) : (
                    <>
                        I'm still working on this chapter. Subscribe to the{" "}
                        <a
                            style={{ textDecoration: "underline" }}
                            href="https://mailchi.mp/0db676437a2f/code-like-a-journalist"
                        >
                            newsletter ✉️
                        </a>{" "}
                        to find out when it's published. In the meantime, explore
                        the{" "}
                        <a
                            style={{ textDecoration: "underline" }}
                            href="https://github.com/nshiab/simple-data-analysis"
                        >
                            Simple Data Analysis examples
                        </a>{" "}
                        and, while you're at it, give the repository a ⭐!
                    </>
                )}
            </Callout>
        </div>
    );
}
