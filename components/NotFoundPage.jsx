"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const COPY = {
  en: {
    title: "Page not found",
    description:
      "The page you are looking for does not exist or may have moved.",
    link: "Back to the welcome page",
  },
  fr: {
    title: "Page introuvable",
    description:
      "La page que vous cherchez n’existe pas ou a peut-être été déplacée.",
    link: "Retour à la page d’accueil",
  },
};

export default function NotFoundPage() {
  const pathname = usePathname();
  const lang = pathname === "/fr" || pathname.startsWith("/fr/") ? "fr" : "en";
  const copy = COPY[lang];

  return (
    <main style={styles.main}>
      <p style={styles.code}>404</p>
      <h1 style={styles.title}>{copy.title}</h1>
      <p style={styles.description}>{copy.description}</p>
      <Link href={`/${lang}`} style={styles.link}>
        {copy.link}
      </Link>
    </main>
  );
}

const styles = {
  main: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: "0 auto",
    minHeight: "60vh",
    padding: "4rem 1.5rem",
    textAlign: "center",
  },
  code: {
    fontSize: "1rem",
    fontWeight: 700,
    letterSpacing: "0.12em",
    margin: 0,
  },
  title: {
    fontSize: "2rem",
    margin: "0.75rem 0",
  },
  description: {
    margin: "0 0 1.5rem",
    maxWidth: "32rem",
  },
  link: {
    border: "1px solid currentColor",
    borderRadius: "0.5rem",
    fontWeight: 600,
    padding: "0.65rem 1rem",
    textDecoration: "none",
  },
};
