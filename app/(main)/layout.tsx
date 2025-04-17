import { NavBar } from "@/components/navigation/NavBar";
import MainPageFooter from "@/components/navigation/MainPageFooter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MI-KA - Hurtownia Instalacyjna, Biuro Projektowe i Serwis | Wejherowo",
  description: "Kompleksowe usługi w branży instalacyjno-sanitarnej i grzewczej. Oferujemy najszerszy wybór pomp ciepła, kotłów i materiałów instalacyjnych na Pomorzu od 2008 roku.",
  keywords: "MI-KA, Wejherowo, Puck, Gościcino, hurtownia instalacyjna, hurtownia hydrauliczna, biuro projektowe, serwis kotłów, pompy ciepła, kotły gazowe, technika grzewcza, instalacje sanitarne, materiały instalacyjne, Pomorze, sklep hydrauliczny, Trójmiasto, Grupa PHI, hurtownia grzewcza, systemy grzewcze, instalacje CO, systemy rekuperacji, przyłącza wodociągowe, Lębork, Rumia, Reda, Gdańsk, Gdynia, Sopot, Kaszuby, województwo pomorskie, sprzedaż hurtowa, detal, instalacje grzewcze, artykuły hydrauliczne, dystrybucja materiałów budowlanych, sklep instalatorski, ogrzewanie podłogowe, ciepła woda użytkowa, OZE, energia odnawialna, tanie ogrzewanie, kompleksowe instalacje, termo modernizacja, projektowanie instalacji, usługi serwisowe, przeglądy okresowe, kotłownie, systemy kominowe, zbiorniki, studnie, kanalizacja, hydrofornie, oczyszczalnie przydomowe, autoryzowany dystrybutor, autoryzowany serwis, kompletacja inwestycji, zaopatrzenie budowy, gwarancja, pomiar, doradztwo techniczne, nadzór budowlany",
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
