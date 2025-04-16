"use client";

import React from "react";
import InfoCards, { InfoCardsProvider } from "@/componets/info-cards";

const Projekty: React.FC = () => {
  const projectCards = [
    {
      id: "card-supervision",
      title: "Nadzory budowlane",
      description:
        "Zapewniamy nadzór nad realizacją inwestycji, dbając o zgodność z projektem, przepisami prawa oraz terminowość wykonania.",
    },
    {
      id: "card-custom-projects",
      title: "Indywidualne projekty budowlane",
      description:
        "Oferujemy kompleksową obsługę projektową indywidualnych projektów budowlanych, od koncepcji po gotowy projekt, dostosowany do Państwa potrzeb i przepisów prawa oraz reprezentację przed organami administracji.",
    },
    {
      id: "card-adaptation",
      title: "Adaptacja gotowych projektów",
      description:
        "Oferujemy adaptację wybranego projektu budowlanego do warunków działki i wymagań przepisów prawa budowlanego, obejmując analizę lokalną, dostosowanie do planu zagospodarowania, przygotowanie dokumentacji oraz reprezentację przed organami administracji.",
    },
    {
      id: "card-installations",
      title: "Projekty instalacji",
      description:
        "Projektujemy instalacje grzewcze, elektryczne, wodno-kanalizacyjne i inne, zapewniając ich efektywność i bezpieczeństwo.",
    },
    {
      id: "card-connections",
      title: "Projekty przyłączy",
      description:
        "Oferujemy pełną obsługę w zakresie projektowania przyłączy wodociągowych, kanalizacyjnych, gazowych i elektrycznych, zgodnie z obowiązującymi normami i przepisami.",
    },
    {
      id: "card-ready-projects",
      title: "Sprzedaży gotowych projektów budowlanych",
      description:
        "Oferujemy szeroką gamę gotowych projektów budowlanych, które spełniają wysokie standardy jakości, funkcjonalności oraz estetyki. Współpracujemy z wieloma biurami projektowymi.",
    },
    {
      id: "card-consulting",
      title: "Doradztwo budowlane",
      description:
        "Nasz zespół ekspertów udzieli fachowych porad dotyczących wszelkich kwestii związanych z budową i projektowaniem, pomagając podjąć najlepsze decyzje.",
    },
    {
      id: "card-documentation",
      title: "Kompleksowa pomoc w przygotowaniu dokumentów",
      description:
        "Specjalizujemy się we wsparciu administracyjnym procesu uzyskiwania pozwolenia na budowę oraz odbioru budynku, reprezentując inwestora przed organami administracyjnymi, przygotowując niezbędną dokumentację, pozyskując opinie i składając wnioski.",
    },
    {
      id: "card-certificates",
      title: "Certyfikaty energetyczne budynków i Audyty energetyczne budynków",
      description:
        "Oferujemy wykonanie certyfikatów energetycznych i audytów energetycznych dla budynków, obejmujące analizę zużycia energii i sporządzenie wymaganych dokumentów zgodnych z przepisami.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f0f0f0] overflow-x-hidden">
      <section className="w-full bg-white py-8 sm:py-10 md:py-14 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] mb-3 sm:mb-4 font-urbanist">
              Biuro Projektowe
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-[#0F172A] mb-6 sm:mb-8 font-urbanist">
              Twoje Zaufane Wsparcie w Branży Budowlanej
            </h2>
          </div>
        </div>
      </section>
      <InfoCardsProvider>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 bg-[#2c2c2c] py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-[12.5rem] gap-6">
          {projectCards.slice(0, 8).map((card) => (
            <div key={card.id} className="w-full h-full flex">
              <div className="w-full flex flex-col">
                <InfoCards
                  id={card.id}
                  title={card.title}
                  description={card.description}
                  customClass="h-full flex-1"
                />
              </div>
            </div>
          ))}
          <div className="w-full h-full flex sm:col-span-2 mx-auto lg:w-1/2 md:w-2/3 sm:w-3/4">
            <div className="w-full flex flex-col">
              <InfoCards
                id={projectCards[8].id}
                title={projectCards[8].title}
                description={projectCards[8].description}
                customClass="h-full flex-1"
              />
            </div>
          </div>
        </div>
      </InfoCardsProvider>
      <section className="w-full bg-white py-8 sm:py-10 md:py-12 lg:py-14 border-t border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-4xl text-center">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#0F172A] mb-4 sm:mb-5 md:mb-6 font-urbanist">
            Zapraszamy do współpracy!
          </h2>
          <p className="text-base sm:text-lg text-[#0F172A]/80 mb-6 sm:mb-7 md:mb-8 font-inter">
            Jesteśmy gotowi, by pomóc Państwu w realizacji każdego projektu
            budowlanego, zapewniając kompleksową obsługę na każdym etapie
            inwestycji.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Projekty;
