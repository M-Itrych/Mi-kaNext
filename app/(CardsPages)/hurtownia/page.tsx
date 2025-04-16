"use client";

import InfoCards, { InfoCardsProvider } from "@/componets/info-cards";
import SupplierCarousel from "@/componets/supplier-carousel";
import React from "react";

const Hurtownia: React.FC = () => {
  const installationCards = [
    {
      id: "card-heating",
      title: "Technika grzewcza",
      description:
        "Od kotłów gazowych i pelletowych poprzez grzejniki i wyposażenie kotłowni, aż po instalacje centralnego ogrzewania i wodno-kanalizacyjne, a także akcesoria, zasobniki, filtry, zawory i ogrzewacze wody.",
    },
    {
      id: "card-installation",
      title: "Technika instalacyjna",
      description:
        "Komponenty do kanalizacji oraz instalacji: stalowych, mosiężnych, miedzianych, INOX i z tworzyw sztucznych, a także izolacje do instalacji i systemy mocujące.",
    },
    {
      id: "card-ventilation",
      title: "Wentylacja i rekuperacja",
      description:
        "Klimakonwektory, nagrzewnice i chłodnice, rekuperatory, anemostaty, filtry, grzałki, opaski i wszelkie inne potrzebne produkty.",
    },
    {
      id: "card-outdoor",
      title: "Instalacje zewnętrzne",
      description:
        "Sieci wraz z przyłączami kanalizacyjnymi i wodociągowymi, oczyszczalnie ścieków, zbiorniki na wodę deszczową, osadniki, przepompownie ścieków.",
    },
    {
      id: "card-heatpump",
      title: "Pompy ciepła",
      description:
        "Dostarczamy pompy ciepła wielu markowych producentów oraz wszystkie akcesoria potrzebne do montażu nowoczesnej kotłowni.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f0f0f0]">
      <section className="w-full bg-white py-8 sm:py-10 md:py-14 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] mb-3 sm:mb-4 font-urbanist">
              Hurtownia Instalacyjna
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-[#0F172A] mb-6 sm:mb-8 font-urbanist">
              Największy wybór komponentów instalacyjnych w północnej Polsce!
            </h2>
          </div>
        </div>
      </section>
      <InfoCardsProvider>
        <section className="w-full bg-[#2c2c2c] py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-4 sm:mb-5 md:mb-6">
              <div className="w-full">
                <InfoCards
                  id={installationCards[0].id}
                  title={installationCards[0].title}
                  description={installationCards[0].description}
                />
              </div>
              <div className="w-full">
                <InfoCards
                  id={installationCards[1].id}
                  title={installationCards[1].title}
                  description={installationCards[1].description}
                />
              </div>
              <div className="w-full sm:col-span-2 lg:col-span-1">
                <InfoCards
                  id={installationCards[2].id}
                  title={installationCards[2].title}
                  description={installationCards[2].description}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 w-full sm:w-11/12 md:w-5/6 lg:w-3/4 mx-auto">
              <div className="w-full">
                <InfoCards
                  id={installationCards[3].id}
                  title={installationCards[3].title}
                  description={installationCards[3].description}
                />
              </div>
              <div className="w-full">
                <InfoCards
                  id={installationCards[4].id}
                  title={installationCards[4].title}
                  description={installationCards[4].description}
                />
              </div>
            </div>
          </div>
        </section>
      </InfoCardsProvider>
      <SupplierCarousel />
      <section className="w-full bg-white py-8 sm:py-10 md:py-12 lg:py-14 border-t border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-4xl text-center">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#0F172A] mb-4 sm:mb-5 md:mb-6 font-urbanist">
            Zapraszamy do zapoznania się z naszą ofertą.
          </h2>
          <p className="text-base sm:text-lg text-[#0F172A]/80 mb-6 sm:mb-7 md:mb-8 font-inter">
            Jesteśmy gotowi, by wspierać Państwa w realizacji projektów
            budowlanych i instalacyjnych!
          </p>
        </div>
      </section>
    </div>
  );
};

export default Hurtownia;
