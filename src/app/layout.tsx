import type { Metadata } from "next";
import { display, body, mono } from "@/lib/fonts";
import { getSiteContent } from "@/lib/site";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

const SITE_URL = "https://gabrielmarinho.arq.br";

export function generateMetadata(): Metadata {
  const { identity } = getSiteContent();
  const title = `${identity.name} — ${identity.role}`;
  const description = identity.tagline;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s — ${identity.name}`,
    },
    description,
    keywords: [
      "arquitetura",
      "arquiteto",
      "restauro",
      "patrimônio histórico",
      "BIM",
      "arquitetura social",
      "Campinas",
    ],
    authors: [{ name: identity.name }],
    openGraph: {
      title,
      description,
      url: SITE_URL,
      siteName: title,
      locale: "pt_BR",
      type: "website",
      images: [
        { url: "/images/home/hero.svg", width: 1920, height: 1200, alt: title },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/home/hero.svg"],
    },
    robots: { index: true, follow: true },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        <SmoothScroll />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
