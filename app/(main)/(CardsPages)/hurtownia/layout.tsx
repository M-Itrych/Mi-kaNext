import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hurtownia Instalacyjna - Pompy Ciepła i Technika Grzewcza | MI-KA",
  description: "Największy wybór komponentów instalacyjnych w północnej Polsce - pompy ciepła, kotły gazowe, systemy wentylacji i rekuperacji. Zaufany dostawca dla instalatorów i klientów indywidualnych.",
  keywords: "hurtownia instalacyjna, hurtownia hydrauliczna, technika grzewcza, pompy ciepła, kotły gazowe, instalacje sanitarne, wentylacja, rekuperacja, materiały hydrauliczne, zawory, rury, grzejniki, izolacje, płyty grzewcze, ogrzewanie podłogowe, armatura łazienkowa, zbiorniki, kanalizacja, PEX, Wejherowo, Puck, Gdańsk, Gdynia, Sopot, Pomorze, instalacje wodne, armatura sanitarna, zbiorniki buforowe, Vaillant, Termet, Beretta, Wolf, kocioł kondensacyjny, pompa monoblok, pompa split, przewody hydrauliczne, kolektory słoneczne, panele fotowoltaiczne, moduły fotowoltaiczne, kształtki, złączki, zawory bezpieczeństwa, odpowietrzniki, naczynia wzbiorcze, pompy obiegowe, wymienniki ciepła, bojlery, podgrzewacze, separatory, filtry, osadniki, wodomierze, manometry, termometry, sterowniki, automatyka, czujniki, regulatory, zawory mieszające, rozdzielacze, sprzęgła hydrauliczne, rury wielowarstwowe, rury miedziane, rury stalowe, rury PP, rury PEX, rury kanalizacyjne, kształtki zaciskowe, węże przyłączeniowe, otuliny izolacyjne, kleje, pasty, teflon, pakuły, silikony, uszczelniacze, armatura przemysłowa, materiały instalacyjne, technika sanitarna, urządzenia grzewcze, hurtownia Kopernika 23, hurtownia Topolowa 11, kompletacja zamówień",
};

export default function HurtowniaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}