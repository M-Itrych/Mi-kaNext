import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Biuro Projektowe - Projekty Instalacji i Nadzór Budowlany | MI-KA",
  description: "Profesjonalne projekty instalacji, przyłączy, adaptacje i nadzór budowlany z gwarancją jakości. Współpracujemy z inwestorami indywidualnymi i deweloperami na terenie całego Pomorza.",
  keywords: "biuro projektowe, projekty budowlane, nadzór budowlany, projekty instalacji, projekty hydrauliczne, projekty przyłączy, adaptacja projektów, doradztwo budowlane, certyfikaty energetyczne, kierownik budowy, inspektor nadzoru, audyt energetyczny, pozwolenie na budowę, przyłącza gazowe, przyłącza kanalizacyjne, przyłącza wodociągowe, Wejherowo, Puck, Gdańsk, Gdynia, Pomorze, projektowanie CO, dokumentacja techniczna, inwestycje budowlane, opiniowanie projektów, kosztorysy budowlane, obliczenia cieplne, bilans cieplny, dobór pomp ciepła, dobór kotłów, dobór grzejników, projekty instalacji elektrycznych, projekty wentylacji, projekty klimatyzacji, projekt ogrzewania podłogowego, projekt ogrzewania ściennego, modernizacja instalacji, charakterystyka energetyczna, audyty termomodernizacyjne, optymalizacja kosztów, ekspertyzy techniczne, nadzór autorski, świadectwa energetyczne, projekty budowy domów, projekty przebudowy, projekty rozbudowy, adaptacja poddasza, zmiana sposobu użytkowania, konsultacje projektowe, weryfikacja projektów, analizy techniczne, projekty wykonawcze, założenia projektowe, dokumentacja przetargowa, pozwolenia wodnoprawne, uzgodnienia branżowe, inwentaryzacja, wizja lokalna, dobór urządzeń, rysunki techniczne, specyfikacje techniczne, odbiory techniczne, opinie techniczne, harmonogramy prac, koordynacja projektowa",
};

export default function ProjektyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}