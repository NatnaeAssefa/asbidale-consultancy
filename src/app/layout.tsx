import type { Metadata } from "next";
import {
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Noto_Sans_Ethiopic,
  Spectral,
} from "next/font/google";
import "./globals.css";

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-disp",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-mono",
});

const notoSansEthiopic = Noto_Sans_Ethiopic({
  subsets: ["ethiopic"],
  weight: ["500", "600"],
  variable: "--font-eth",
});

export const metadata: Metadata = {
  title:
    "Asbidale Consultancy Services PLC — Clinical Research & AI Health Innovation",
  description:
    "Asbidale bridges clinical research and AI innovation, delivering high-integrity CRO services and data-driven digital health solutions across Ethiopia and beyond.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spectral.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} ${notoSansEthiopic.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
