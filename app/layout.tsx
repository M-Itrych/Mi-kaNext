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
  title: "Mi-Ka - Hurtownia Instalacyjna, Biuro Projektowe i Serwis | Wejherowo",
  description: "MI-KA to kompleksowe usługi w branży instalacyjno-sanitarnej i grzewczej. Oferujemy profesjonalną hurtownię, biuro projektowe oraz serwis techniczny na Pomorzu od 2008 roku.",
  keywords: "MI-KA, Wejherowo, hurtownia instalacyjna, biuro projektowe, serwis kotłów, pompy ciepła, technika grzewcza, instalacje sanitarne",
 };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
