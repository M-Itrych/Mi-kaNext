import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Serwis Pomp Ciepła i Kotłów Gazowych | Przeglądy i Naprawy | MI-KA",
  description: "Autoryzowany serwis pomp ciepła i kotłów gazowych Vaillant, Termet, Beretta i Wolf. Oferujemy przeglądy, naprawy, pierwsze uruchomienia i serwis gwarancyjny w województwie pomorskim.",
  keywords: "serwis kotłów, naprawa kotłów, przeglądy kotłów gazowych, serwis pomp ciepła, naprawa pomp ciepła, autoryzowany serwis Vaillant, autoryzowany serwis Termet, autoryzowany serwis Beretta, autoryzowany serwis Wolf, przeglądy gazowe, montaż kotłów, uruchomienie kotła, serwis gwarancyjny, serwis pogwarancyjny, przegląd instalacji gazowej, konserwacja systemu grzewczego, wymiana części, czyszczenie kotła, wymiana filtrów, Wejherowo, Puck, Lębork, Rumia, Reda, Pomorze, awaria kotła, awaria ogrzewania, regulacja kotła, awaria pompy ciepła, cieknący kocioł, hałasujący kocioł, kocioł się wyłącza, kocioł puka, kocioł gwiżdże, serwis pieca, przegląd pieca, kocioł nie grzeje, słabe ciśnienie wody, wymiana anody, czyszczenie wymiennika, konserwacja palnika, odpowietrzanie instalacji, uzupełnianie ciśnienia, wymiana pompy, przeczyszczanie instalacji, płukanie wymiennika, uszczelnianie instalacji, naprawa sterownika, programowanie sterownika, czyszczenie dysz, wymiana zaworów, przeczyszczanie filtrów, wymiana zasobnika, przegląd roczny, badanie szczelności, detekcja wycieków, modernizacja kotłowni, likwidacja kotła, przegląd kominiarski, diagnostyka kotła, diagnostyka pompy ciepła, optymalizacja pracy, regulacja parametrów, serwis gwiazdkowy, serwis wakacyjny, pogotowie serwisowe, pilny serwis, konserwacja klimatyzacji, serwis wentylacji, konserwacja rekuperatora, awarie instalacji wodnej",
};
  

export default function SerwisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}