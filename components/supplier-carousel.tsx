"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";

interface Supplier {
  url: string;
  link: string;
}

const SupplierCarousel: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const suppliers: Supplier[] = [
    { url: "1.webp", link: "http://www.aco.pl" },
    { url: "2.webp", link: "http://www.afriso.pl/" },
    { url: "3.webp", link: "http://www.agaflex.pl" },
    { url: "4.webp", link: "http://www.agam.com.pl/" },
    { url: "5.webp", link: "http://www.armacell.com/pl" },
    { url: "6.webp", link: "http://www.grupa-armatura.com" },
    { url: "7.webp", link: "https://www.atagor.com" },
    { url: "8.webp", link: "http://www.beretta.pl" },
    { url: "9.webp", link: "http://www.bmeters.pl/" },
    { url: "10.webp", link: "http://www.bohamet-armatura.pl" },
    { url: "11.webp", link: "https://www.caleffi.com/poland/pl" },
    { url: "12.webp", link: "http://www.comap.pl/pl" },
    { url: "13.webp", link: "http://deante.pl/" },
    { url: "14.webp", link: "https://www.dksystem.pl/" },
    { url: "15.webp", link: "http://www.ecomess.pl/" },
    { url: "16.webp", link: "http://www.esbe.eu/pl/pl-pl" },
    { url: "17.webp", link: "http://www.euroster.pl/" },
    { url: "18.webp", link: "https://www.ferro.pl/" },
    { url: "19.webp", link: "http://www.fireangel-polska.pl" },
    { url: "20.webp", link: "http://www.fitting.pl/" },
    { url: "21.webp", link: "https://www.flamcogroup.com/pl" },
    { url: "22.webp", link: "http://www.fondital.com/pl/pl/" },
    { url: "23.webp", link: "http://www.franke.com/countries/pl/pl/home.html" },
    { url: "24.webp", link: "http://galmet.com.pl/" },
    { url: "25.webp", link: "http://www.giacomini.com" },
    { url: "26.webp", link: "http://www.gorgiel.com.pl/" },
    { url: "27.webp", link: "http://www.hel-wita.com.pl/" },
    { url: "28.webp", link: "http://www.husty.pl" },
    { url: "29.webp", link: "http://www.hutmen.pl/" },
    { url: "30.webp", link: "http://www.ibpgroup.com.pl/" },
    { url: "31.webp", link: "http://www.immergas.com.pl/" },
    { url: "32.webp", link: "http://www.instalprojekt.com.pl/" },
    { url: "33.webp", link: "http://www.invena.pl/pl" },
    { url: "34.webp", link: "http://www.joule-pl.pl/" },
    { url: "35.webp", link: "http://www.kamen.com.pl/" },
    { url: "36.webp", link: "http://www.kanplast.pl/" },
    { url: "37.webp", link: "http://www.kflex.com" },
    { url: "38.webp", link: "http://www.klechniowska.com/" },
    { url: "39.webp", link: "https://www.korado.pl/" },
    { url: "40.webp", link: "http://www.kotar.pl/pl/kotar.html" },
    { url: "41.webp", link: "http://www.heating-polska.pl" },
    { url: "42.webp", link: "http://www.kuchinox.pl/" },
    { url: "43.webp", link: "http://www.mcalpine.pl/" },
    { url: "44.webp", link: "http://www.mkzary.pl/" },
    { url: "45.webp", link: "http://www.newheat.pl" },
    { url: "46.webp", link: "http://www.eeodlewnia.pl/" },
    { url: "47.webp", link: "https://www.ottone.pl/" },
    { url: "48.webp", link: "http://www.perfexim.pl/" },
    { url: "49.webp", link: "http://www.pipelife.com/pl/" },
    { url: "50.webp", link: "http://www.prandelli.pl/" },
    { url: "51.webp", link: "http://www.qualt.pl" },
    { url: "52.webp", link: "http://rawiplast.pl/" },
    { url: "53.webp", link: "http://www.ricomenergy.pl/" },
    { url: "54.webp", link: "http://www.saniteisenberg.pl/" },
    { url: "55.webp", link: "http://www.sanplast.pl/" },
    { url: "56.webp", link: "http://www.santech.com.pl/" },
    { url: "57.webp", link: "http://www.schedpol.pl" },
    { url: "58.webp", link: "http://www.schlosser.com.pl/pl/" },
    { url: "59.webp", link: "http://www.sigmali.pl/" },
    { url: "60.webp", link: "http://www.sonniger.com/" },
    { url: "61.webp", link: "http://www.spiroflex.pl/" },
    { url: "62.webp", link: "http://www.stalmark.pl" },
    { url: "63.webp", link: "http://www.stiebel-eltron.pl" },
    { url: "64.webp", link: "http://www.techmet.pl/" },
    { url: "65.webp", link: "http://www.teklakotly.pl/" },
    { url: "66.webp", link: "http://www.termet.com.pl/" },
    { url: "67.webp", link: "https://thermaflex.com/pl" },
    { url: "68.webp", link: "http://www.tiasystem.pl/" },
    { url: "69.webp", link: "http://www.topvac.pl" },
    { url: "70.webp", link: "http://www.unipak.pl/" },
    { url: "71.webp", link: "https://www.ustm.pl/" },
    { url: "72.webp", link: "http://www.valsir.pl/" },
    { url: "73.webp", link: "http://valvex.com/" },
    { url: "74.webp", link: "http://vesbopoland.pl/" },
    { url: "75.webp", link: "http://walraven.com/pl/" },
    { url: "76.webp", link: "http://www.wilo.pl/" },
    { url: "77.webp", link: "http://winkiel.pl" },
    { url: "78.webp", link: "http://www.wolf-polska.pl/" },
    { url: "79.webp", link: "https://www.archon.pl/" },
    { url: "80.webp", link: "https://projekty.muratordom.pl/" },
    { url: "81.webp", link: "https://www.extradom.pl/" },
    { url: "82.webp", link: "https://www.studioatrium.pl/" },
    { url: "83.webp", link: "https://z500.pl/" },
    { url: "84.webp", link: "https://www.dobredomy.pl/" },
    { url: "85.webp", link: "https://www.werit.eu/pl/" },
    { url: "86.webp", link: "https://www.dyka.com/en/" },
    { url: "87.webp", link: "https://aalberts-hfc.com/pl" },
    { url: "88.webp", link: "https://kotlydrewmet.pl/" },
    { url: "89.webp", link: "https://www.techsterowniki.pl/" },
    { url: "90.webp", link: "https://emmeti.com/en/" },
    { url: "91.webp", link: "https://groupe-atlantic.pl/" },
    { url: "92.webp", link: "https://kospel.pl/" },
    { url: "93.webp", link: "https://www.xylem.com/pl-pl/" },
    { url: "94.webp", link: "https://www.skoberne.de/PL/" },
    { url: "95.webp", link: "https://www.kessel.pl/" },
    { url: "96.webp", link: "https://www.viessmann.pl/" },
    { url: "97.webp", link: "https://womix.pl/" },
    { url: "98.webp", link: "https://www.faren.com/en/" },
    { url: "99.webp", link: "https://www.purmo.com/pl-pl" },
    { url: "100.webp", link: "https://ground-therm.com/" },
    { url: "101.webp", link: "https://korell.pl/" },
    { url: "102.webp", link: "https://inova.pl/" },
    { url: "103.webp", link: "https://www.vaillant.pl/klienci-indywidualni/" },
  ];

  const getDomain = (url: string): string => {
    let domain = url.replace(/^(https?:\/\/)?(www\.)?/, "");
    domain = domain.replace(/\/$/, "");
    return domain.split("/")[0].toLowerCase();
  };
  const sortedSuppliers = [...suppliers].sort((a, b) => {
    const domainA = getDomain(a.link);
    const domainB = getDomain(b.link);
    return domainA.localeCompare(domainB);
  });

  if (!mounted) {
    return null;
  }

  return (
    <section className="w-full bg-white py-10 md:py-14">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#0F172A] mb-8 font-urbanist">
          Nasi dostawcy
        </h2>

        <div className="mx-auto max-w-6xl relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              skipSnaps: true,
              slidesToScroll: 3,
            }}
            className="w-full px-10"
          >
            <CarouselContent className="-ml-4">
              {sortedSuppliers.map((supplier, index) => (
                <CarouselItem
                  key={`supplier-${index}`}
                  className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                >
                  <Link
                    href={supplier.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-4 h-28 bg-white border border-gray-100 rounded-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={`/dostawcy/${supplier.url}`}
                        alt={`Dostawca ${getDomain(supplier.link)}`}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                        className="object-contain"
                        priority={index < 10}
                      />
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 bg-white hover:bg-white hover:text-orange-500 border-0 shadow-none" />
            <CarouselNext className="right-0 bg-white hover:bg-white hover:text-orange-500 border-0 shadow-none" />
          </Carousel>
        </div>
        <div className="text-center mt-8">
          <Link
            href="/dostawcy"
            className="inline-block px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-medium transition-colors shadow-md hover:shadow-lg"
          >
            Zobacz wszystkich dostawców
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SupplierCarousel;
