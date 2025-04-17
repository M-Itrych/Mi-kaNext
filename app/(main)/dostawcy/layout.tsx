import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nasi Dostawcy - Renomowani Producenci Techniki Grzewczej | MI-KA",
  description: "Współpracujemy z ponad 100 renomowanymi producentami techniki grzewczej, sanitarnej i instalacyjnej. Dzięki członkostwu w grupie PHI oferujemy produkty najwyższej jakości w konkurencyjnych cenach.",
  keywords: "dostawcy instalacyjni, partnerzy biznesowi, producenci kotłów, producenci instalacji, producenci pomp ciepła, Vaillant, Termet, Beretta, Wolf, grupa PHI, hurtownia hydrauliczna, sklep instalacyjny, hurtownia grzewcza, autoryzowany dystrybutor, oficjalny partner, kotły gazowe, pompy ciepła, systemy wentylacji, rekuperacja, ogrzewanie, artykuły hydrauliczne, marki premium, producenci grzejników, producenci armatury, zaufani producenci, certyfikowani dostawcy, komponenty instalacyjne, asortyment hurtowni, europejscy producenci, polscy producenci, wiodące marki, uznane firmy, bestsellery, najpopularniejsze produkty, nowości na rynku, liderzy technologii, najwyższa jakość, gwarancja producenta, oryginalne części, renomowane kotły, niezawodne pompy, energooszczędne urządzenia, ekologiczne rozwiązania, zaawansowane technologie, innowacyjne systemy, katalogi producentów, parametry techniczne, nowoczesny design, trwałe materiały, odporność na korozję, długa żywotność, łatwość montażu, komfort użytkowania, szybki serwis, najlepsze ceny, sprawdzone rozwiązania, czołowi producenci, kompleksowe systemy, produkty z certyfikatem, produkty z atestem, zgodność z normami, bezpieczeństwo użytkowania, niskoemisyjne urządzenia, wysoka wydajność, oszczędna eksploatacja, komponenty najwyższej jakości, akcesoria montażowe, materiały eksploatacyjne, chemiczne środki czyszczące, materiały uszczelniające, osprzęt kotłowni, automatyka domowa, bezprzewodowe sterowanie, inteligentne zarządzanie",
};

export default function DostawcyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}