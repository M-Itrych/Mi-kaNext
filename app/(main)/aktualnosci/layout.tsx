import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aktualności - Najnowsze Informacje z Branży | MI-KA",
  description: "Bądź na bieżąco z najnowszymi informacjami z branży instalacyjnej i działalnością firmy MI-KA. Sprawdź nasze aktualności, promocje i wydarzenia branżowe.",
  keywords: "aktualności branżowe, news instalacyjne, promocje, wydarzenia instalacyjne, blog firmowy, wiadomości branżowe",
};

export default function AktualnosciLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}