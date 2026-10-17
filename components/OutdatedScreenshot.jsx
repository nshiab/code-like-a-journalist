import { ImageZoom } from "nextra/components";

export default function OutdatedScreenshot({ src, alt, lang = "en" }) {
    return (
        <figure
            data-pagefind-ignore
            style={{
                border: "3px solid #dc2626",
                borderRadius: "8px",
                margin: "1.5rem 0",
                overflow: "hidden",
            }}
        >
            <figcaption
                style={{
                    background: "#fef2f2",
                    color: "#991b1b",
                    padding: "0.6rem 0.9rem",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                }}
            >
                {lang === "fr"
                    ? "Capture d’écran à mettre à jour — suivez les instructions du texte."
                    : "Screenshot needs updating — follow the written instructions."}
            </figcaption>
            <ImageZoom
                src={src}
                alt={alt}
                loading="lazy"
                style={{ display: "block", width: "100%", height: "auto", margin: 0 }}
            />
        </figure>
    );
}
