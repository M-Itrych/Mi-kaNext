import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Kontakt - Skontaktuj się z Nami | MI-KA",
    description: "Skontaktuj się z firmą MI-KA. Nasze biuro, hurtownia i serwis w Gościcinie i Pucku są do Twojej dyspozycji. Wyślij zapytanie przez formularz kontaktowy lub zadzwoń do nas.",
    keywords: "kontakt MI-KA, formularz kontaktowy, adres firmy, telefon, e-mail, lokalizacja, mapa dojazdu, Gościcino, Puck",
  };

export default function KontaktLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}