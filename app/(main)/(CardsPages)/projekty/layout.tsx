import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Biuro Projektowe - Kompleksowe Projekty Budowlane i Instalacyjne | MI-KA",
  description: "Profesjonalne usługi projektowe: nadzory budowlane, projekty instalacji, przyłączy oraz adaptacje projektów. Twoje zaufane wsparcie w branży budowlanej.",
  keywords: "biuro projektowe, projekty budowlane, nadzór budowlany, projekty instalacji, projekty przyłączy, adaptacja projektów, doradztwo budowlane, certyfikaty energetyczne",
};

export default function ProjektyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}