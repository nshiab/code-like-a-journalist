export default function ByLine(lang="en") {
    if (lang === "en") {
        return (
            <span style={{display: "block", textDecoration: "underline"}}>
                By <a href="https://www.naelshiab.com/" target="_blank">Nael Shiab</a>
            </span>
        )
    } else if (lang === "fr") {
        return (
            <span style={{display: "block", textDecoration: "underline"}}>
                Par <a href="https://www.naelshiab.com/fr" target="_blank">Nael Shiab</a>
            </span>
        )
    }
}