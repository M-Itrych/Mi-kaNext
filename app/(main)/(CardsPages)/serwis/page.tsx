"use client";

import React from "react";
import InfoCards, { InfoCardsProvider } from "@/components/info-cards";

const Serwis: React.FC = () => {
  const serviceCards = [
    {
      id: "card-review",
      title: "Przeglądy kotłów gazowych i pomp ciepła",
      description:
        "Dzięki nam możesz być pewien, że Twoje urządzenia grzewcze będą działały bezawaryjnie przez kolejny rok.",
    },
    {
      id: "card-post-warranty",
      title: "Opieka pogwarancyjna urządzeń",
      description:
        "Szybko reagujemy na zgłoszenia i wykonujemy naprawy w szerokim zakresie.",
    },
    {
      id: "card-first-launch",
      title: "Pierwsze uruchomienie kotłów",
      description:
        "Pierwsze gwarancyjne uruchomienie kotłów gazowych firmy Vaillant, Termet, Beretta i Wolf.",
    },
    {
      id: "card-warranty",
      title: "Opieka gwarancyjna pomp ciepła i kotłów gazowych",
      description:
        "Jesteśmy autoryzowanym serwisem dla urządzeń wielu znanych marek.",
    },
    {
      id: "card-gas-checks",
      title: "Przeglądy gazowe",
      description:
        "Wykonujemy przeglądy szczelności instalacji gazowych, które zapewniają bezpieczeństwo mieszkańcom i użytkownikom. Współpracujemy ze spółdzielniami mieszkaniowymi i wspólnotami.",
    },
    {
      id: "card-installation",
      title: "Montaż pomp ciepła i kotłów gazowych",
      description:
        "Zapewniamy pełną obsługę urządzeń aż do momentu ich uruchomienia.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f0f0f0] overflow-x-hidden">
      <section className="w-full bg-white py-8 sm:py-10 md:py-14 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] mb-3 sm:mb-4 font-urbanist">
              Wybierz autoryzowany serwis pomp ciepła i kotłów gazowych!
            </h1>
          </div>
        </div>
      </section>
      <InfoCardsProvider>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 bg-[#2c2c2c] py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-[12.5rem] gap-6">
          {serviceCards.slice(0, 4).map((card) => (
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
          <div className="w-full h-full flex">
            <div className="w-full flex flex-col">
              <InfoCards
                id={serviceCards[4].id}
                title={serviceCards[4].title}
                description={serviceCards[4].description}
                customClass="h-full flex-1"
              />
            </div>
          </div>
          <div className="w-full h-full flex">
            <div className="w-full flex flex-col">
              <InfoCards
                id={serviceCards[5].id}
                title={serviceCards[5].title}
                description={serviceCards[5].description}
                customClass="h-full flex-1"
              />
            </div>
          </div>
        </div>
      </InfoCardsProvider>
      <section className="w-full bg-white py-8 sm:py-10 md:py-12 lg:py-14 border-t border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-4xl text-center">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#0F172A] mb-4 sm:mb-5 md:mb-6 font-urbanist">
            Zadzwoń i umów swój serwis!
          </h2>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-orange-500 mb-4 sm:mb-5 md:mb-6 font-urbanist">
            +48 605 255 524
          </h2>
        </div>
      </section>
    </div>
  );
};

export default Serwis;
