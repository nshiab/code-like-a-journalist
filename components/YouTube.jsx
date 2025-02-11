const YouTube = ({ videoId, lang = "en" }) => {
    return (
        <>
            {lang === "fr" && (
                <span
                    style={{
                        display: "block",
                        fontStyle: "italic",
                        marginTop: "1rem",
                        marginBottom: "0.5rem",
                    }}
                >
                    Les sous-titres sont disponibles en français.
                </span>
            )}
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    margin: lang === "fr"
                        ? "0rem auto 2.5rem auto"
                        : "1rem auto 2.5rem auto",
                    overflow: "hidden",
                    borderRadius: "5px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.025)", // Softer shadow
                }}
            >
                <iframe
                    width="100%"
                    height="475"
                    style={{
                        width: "100%",
                        height: "475px",
                        border: "none",
                        display: "block",
                        borderRadius: "5px", // Matches the container
                    }}
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                >
                </iframe>
            </div>
        </>
    );
};

export default YouTube;
