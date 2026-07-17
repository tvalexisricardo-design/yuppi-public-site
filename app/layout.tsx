import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://www.yuppi.pt";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Yuppi | Festas Infantis com os Melhores Profissionais em Portugal",
    template: "%s | Yuppi",
  },
  description:
    "A Yuppi liga famílias aos melhores animadores, mágicos, mascotes e profissionais de festas infantis em Portugal. Organiza a festa perfeita, sem complicações.",
  keywords: [
    "festas infantis",
    "animadores infantis",
    "animação infantil",
    "mágicos para festas",
    "mascotes para festas",
    "pinturas faciais",
    "organizar festa infantil",
    "insufláveis",
    "modelagem de balões",
    "decoração festa infantil",
    "fotógrafo festa infantil",
    "dj festa infantil",
  ],
  authors: [{ name: "Yuppi" }],
  creator: "Yuppi",
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: SITE_URL,
    siteName: "Yuppi",
    title: "Yuppi | Festas Infantis com os Melhores Profissionais em Portugal",
    description:
      "Encontramos os melhores profissionais para festas infantis e tratamos de todo o processo por ti.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Yuppi — Festas incríveis. Momentos felizes.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yuppi | Festas Infantis com os Melhores Profissionais em Portugal",
    description:
      "Encontramos os melhores profissionais para festas infantis e tratamos de todo o processo por ti.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Yuppi",
    url: SITE_URL,
    logo: `${SITE_URL}/yuppi-logo.png`,
    description:
      "A Yuppi liga famílias aos melhores profissionais de festas infantis em Portugal.",
    areaServed: {
      "@type": "Country",
      name: "Portugal",
    },
    sameAs: [],
  };

  return (
    <html lang="pt-PT" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
