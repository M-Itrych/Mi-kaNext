import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/navigation/NavBar";
import MainPageFooter from "@/components/navigation/MainPageFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | MI-KA",
    default: "MI-KA - Hurtownia Instalacyjna, Biuro Projektowe i Serwis | Wejherowo"
  },
  description: "MI-KA to kompleksowe usługi w branży instalacyjno-sanitarnej i grzewczej. Oferujemy profesjonalną hurtownię, biuro projektowe oraz serwis techniczny na Pomorzu od 2008 roku.",
  keywords: "MI-KA, hurtownia instalacyjna, biuro projektowe, serwis techniczny, Wejherowo, Puck, Pomorze, pompy ciepła, kotły gazowe, technika grzewcza, instalacje sanitarne, projekty budowlane, autoryzowany serwis, nadzór budowlany, doradztwo techniczne, Grupa PHI",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "https://mi-ka.pl/",
    siteName: "MI-KA",
    title: "MI-KA - Hurtownia Instalacyjna, Biuro Projektowe i Serwis",
    description: "MI-KA to kompleksowe usługi w branży instalacyjno-sanitarnej i grzewczej. Oferujemy profesjonalną hurtownię, biuro projektowe oraz serwis techniczny na Pomorzu.",
  },
  alternates: {
    canonical: "https://mi-ka.pl"
  },
  authors: [{ name: "MI-KA" }],
  generator: "Next.js",
  applicationName: "MI-KA",
  referrer: "origin-when-cross-origin",
  creator: "MI-KA",
  publisher: "MI-KA",
  verification: {
    google: "bkdtL5vshuYzBkMbYGD_vSM1UYDC_itpjz21wxbo2Oo",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f8f8f8]`}
      >
        <div className="relative min-h-screen flex flex-col">
          <div className="flex-grow">{children}</div>
        </div>
      </body>
    </html>
  );
}
