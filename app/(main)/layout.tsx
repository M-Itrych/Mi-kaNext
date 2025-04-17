import { NavBar } from "@/components/navigation/NavBar";
import MainPageFooter from "@/components/navigation/MainPageFooter";
import { Metadata } from "next";

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
        <div className="relative min-h-screen flex flex-col">
          <NavBar />
          <div className="flex-grow">{children}</div>
          <MainPageFooter />
        </div>
  );
}
