import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Autoryzowany Serwis Pomp Ciepła i Kotłów Gazowych | MI-KA",
  description: "Profesjonalny serwis i przeglądy techniczne kotłów gazowych oraz pomp ciepła. Pierwsze uruchomienia, opieka gwarancyjna i pogwarancyjna, przeglądy gazowe.",
  keywords: "serwis kotłów, przeglądy kotłów gazowych, serwis pomp ciepła, autoryzowany serwis, przeglądy gazowe, montaż kotłów, Vaillant, Termet, Beretta, Wolf",
};
  

export default function SerwisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}