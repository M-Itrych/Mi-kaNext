import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aktualności i Porady Instalacyjne | Blog Branżowy | MI-KA",
  description: "Najnowsze informacje z branży instalacyjnej, poradniki techniczne, nowości produktowe i aktualności firmowe. Bądź na bieżąco z wiedzą o pompach ciepła i rozwiązaniach grzewczych.",
  keywords: "aktualności branżowe, blog instalacyjny, porady techniczne, pompy ciepła, systemy grzewcze, nowości produktowe, wydarzenia branżowe, porady hydrauliczne, obsługa kotła, porady dla instalatorów, porady dla inwestorów, nowości grzewcze, efektywność energetyczna, dotacje na pompy ciepła, dofinansowania, czyste powietrze, wydarzenia MI-KA, szkolenia instalacyjne, promocje, nowoczesne technologie grzewcze, porównanie systemów grzewczych, ogrzewanie domu, koszty ogrzewania, promocje produktowe, targi branżowe, katalogi produktów, ulotki techniczne, instrukcje obsługi, przewodniki montażowe, filmy instruktażowe, webinary, trendy w ogrzewaniu, nowe przepisy, normy techniczne, ekologiczne ogrzewanie, oszczędne systemy, dobór mocy grzewczej, modernizacja ogrzewania, wymiana kotła, przejście na OZE, koszt instalacji pompy ciepła, instalacja fotowoltaiki, słoneczne podgrzewanie wody, porównanie systemów ogrzewania, instalacja klimatyzacji, przewaga pomp ciepła, ekonomiczna eksploatacja, długość gwarancji, magazynowanie energii, samodzielne naprawy, testy produktów, opinie użytkowników, forum instalacyjne, porady ekspertów, wywiady branżowe, publikacje techniczne, galerie realizacji, przykładowe montaże, innowacje technologiczne, przyszłość ogrzewania",
};

export default function AktualnosciLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}