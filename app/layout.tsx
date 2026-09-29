import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vlad-crasnojon.github.io"),
  title: "Vlad Crasnojon — Junior AI / Full-Stack Engineer",
  description:
    "I ship AI products end-to-end — from LLM-powered backends and RAG pipelines to polished interfaces. Built, deployed, and operated two production platforms: AILIN (legal-tech) and ABC MATE (e-commerce). Source on GitHub.",
  keywords: [
    "AI Engineer",
    "Full-Stack Engineer",
    "FastAPI",
    "Next.js",
    "RAG",
    "Python",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "Vlad Crasnojon" }],
  openGraph: {
    title: "Vlad Crasnojon — Junior AI / Full-Stack Engineer",
    description:
      "I ship AI products end-to-end. Built, deployed, and operated two production platforms — AILIN (legal-tech) and ABC MATE (e-commerce). Source on GitHub.",
    url: "https://vlad-crasnojon.github.io",
    siteName: "Vlad Crasnojon",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vlad Crasnojon — Junior AI / Full-Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vlad Crasnojon — Junior AI / Full-Stack Engineer",
    description:
      "I ship AI products end-to-end. Built, deployed, and operated two production platforms — AILIN (legal-tech) and ABC MATE (e-commerce).",
    images: ["/assets/og-image.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#09090B] text-[#FAFAFA]">
        {children}
      </body>
    </html>
  );
}