import InfoCards, { InfoCardsProvider } from "@/componets/info-cards";
import React from "react";

const OnasPage = () => {
  const cards = [
    {
      id: "card-1",
      title: "Szeroki asortyment",
      description:
        "Oferujemy produkty od sprawdzonych i renomowanych producentów, które zapewniają niezawodność i trwałość.",
    },
    {
      id: "card-2",
      title: "Nowoczesne technologie",
      description:
        "Dostosowujemy naszą ofertę do współczesnych wymagań energooszczędności, ekologii oraz innowacyjności.",
    },
    {
      id: "card-3",
      title: "Profesjonalne doradztwo",
      description:
        "Nasi eksperci zawsze chętnie doradzą przy doborze odpowiednich produktów, dostosowanych do indywidualnych potrzeb.",
    },
    {
      id: "card-4",
      title: "Bezpieczne i komfortowe rozwiązania",
      description:
        "Pomagamy w realizacji inwestycji, które zapewniają komfort użytkowania oraz oszczędności energetyczne.",
    },
  ];

  return (
    <div className="pt-4 sm:pt-8 md:pt-12">
      <div className="max-w-full">
        <div className="flex flex-col items-center p-4 sm:p-6 md:p-8 lg:p-12 gap-4 sm:gap-6 rounded-[0.3125rem] bg-white max-w-4xl mx-auto">
          <h1 className="text-[#0F172A]  text-center font-urbanist text-3xl sm:text-4xl md:text-5xl font-bold ">
            MI-KA
          </h1>
          <p className="text-[rgba(15,23,42,0.75)] font-inter text-sm sm:text-base font-normal ">
            Firma MI-KA działa na rynku od 2008 roku. Prowadzimy sprzedaż
            hurtową i detaliczną nowoczesnych systemów grzewczych oraz artykułów
            instalacyjno-sanitarnych.
          </p>
          <p className="text-[rgba(15,23,42,0.75)] font-inter text-sm sm:text-base font-normal">
            Z pasją i zaangażowaniem zajmujemy się kompleksową obsługą w
            dziedzinie systemów grzewczych, serwisu technicznego oraz nadzoru
            budowlanego. Nasza misja to dostarczanie innowacyjnych rozwiązań
            grzewczych, profesjonalnego serwisu oraz kompleksowego wsparcia w
            realizacji projektów budowlanych.
          </p>
          <p className="text-[rgba(15,23,42,0.75)] font-inter text-sm sm:text-base font-normal ">
            Nasza Firma jest członkiem{" "}
            <span className="font-bold">grupy PHI</span>, co daje nam większe
            możliwości w zakresie współpracy z dostawcami towarów handlowych.
            Dzięki temu możemy oferować produkty najwyższej jakości w
            najlepszych cenach rynkowych z krótkim terminem realizacji.
          </p>
        </div>
        <div className="mx-auto mt-6 sm:mt-8 md:mt-10 px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-black text-center">
            Dlaczego warto wybrać naszą hurtownię?
          </h2>
        </div>
      </div>
      <InfoCardsProvider>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 bg-[#2c2c2c] py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-[12.5rem] items-center gap-6 md:gap-8 lg:gap-12">
          {cards.map((card) => (
            <div key={card.id} className="w-full">
              <InfoCards
                id={card.id}
                title={card.title}
                description={card.description}
              />
            </div>
          ))}
        </div>
      </InfoCardsProvider>
    </div>
  );
};

export default OnasPage;
