"use client";

import React, { useEffect } from "react";
import type { Map as LeafletMap } from "leaflet";

interface LeafletElement extends HTMLElement {
  _leaflet_id?: number;
  _leaflet_map?: any;
}

const MainPageFooter = () => {
  const time = new Date().getFullYear();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const container = document.getElementById("map") as LeafletElement;
      if (container && !container._leaflet_id) {
        if (!document.getElementById("leaflet-css")) {
          const linkElement = document.createElement("link");
          linkElement.id = "leaflet-css";
          linkElement.rel = "stylesheet";
          linkElement.href =
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css";
          document.head.appendChild(linkElement);
        }

        import("leaflet")
          .then((L) => {
            const map: LeafletMap = L.map("map", {
              center: [54.66, 18.28],
              zoom: 9,
              zoomControl: true,
              scrollWheelZoom: false,
              attributionControl: false,
            });

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
              attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map);

            const redMarkerHtml = `
            <div class="relative">
              <div class="absolute w-6 h-6 bg-red-600 rounded-full -top-3 -left-3 border-2 border-white shadow-lg flex items-center justify-center">
                <div class="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div class="absolute h-5 w-1 bg-red-600 -top-3 left-0 -translate-x-0.5 shadow-md transform rotate-45"></div>
            </div>
          `;

            const blueMarkerHtml = `
            <div class="relative">
              <div class="absolute w-6 h-6 bg-blue-600 rounded-full -top-3 -left-3 border-2 border-white shadow-lg flex items-center justify-center">
                <div class="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div class="absolute h-5 w-1 bg-blue-600 -top-3 left-0 -translate-x-0.5 shadow-md transform rotate-45"></div>
            </div>
          `;

            const redIcon = L.divIcon({
              className: "custom-marker",
              html: redMarkerHtml,
              iconSize: [24, 36],
              iconAnchor: [12, 36],
            });

            const blueIcon = L.divIcon({
              className: "custom-marker",
              html: blueMarkerHtml,
              iconSize: [24, 36],
              iconAnchor: [12, 36],
            });

            const customPopupOptions = {
              className: "custom-popup",
              minWidth: 200,
              maxWidth: 250,
              closeButton: true,
            };

            const goscicinPopupContent = `
            <div class="p-2">
              <h3 class="font-bold text-base mb-1">Mi-Ka sp.z.o.o</h3>
              <p class="mb-1">ul. Kopernika 23</p>
              <p class="mb-1">84-241 Gościcino</p>
              <p class="mt-2">
                <a href="https://maps.app.goo.gl/3gA2UAhjLSPtx2HH7" target="_blank" class="text-blue-600 underline">Pokaż trasę</a>
              </p>
            </div>
          `;

            const puckPopupContent = `
            <div class="p-2">
              <h3 class="font-bold text-base mb-1">Mi-Ka sp.z.o.o</h3>
              <p class="mb-1">ul. Topolowa 11</p>
              <p class="mb-1">84-100 Puck</p>
              <p class="mt-2">
                <a href="https://maps.app.goo.gl/XePuU5vYr6jFtWBu7" target="_blank" class="text-blue-600 underline">Pokaż trasę</a>
              </p>
            </div>
          `;
            L.marker([54.6142, 18.149], { icon: redIcon })
              .addTo(map)
              .bindPopup(goscicinPopupContent, customPopupOptions);

            L.marker([54.7121, 18.4081], { icon: blueIcon })
              .addTo(map)
              .bindPopup(puckPopupContent, customPopupOptions);

            if (!document.getElementById("custom-leaflet-styles")) {
              const styleElement = document.createElement("style");
              styleElement.id = "custom-leaflet-styles";
              styleElement.textContent = `
              .custom-popup .leaflet-popup-content-wrapper {
                border-radius: 8px;
                padding: 0;
                overflow: hidden;
              }
              .custom-popup .leaflet-popup-tip {
                background-color: white;
              }
              .leaflet-popup-close-button {
                padding: 8px !important;
              }
            `;
              document.head.appendChild(styleElement);
            }
          })
          .catch((error) => console.error("Error loading Leaflet:", error));
      }
    }
    return () => {
      if (typeof window !== "undefined") {
        const container = document.getElementById("map") as LeafletElement;
        if (container && container._leaflet_id && (window as any).L) {
          (window as any).L.map(container).remove();
        }
      }
    };
  }, []);

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white text-black py-8">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="grid grid-cols-4 gap-20 w-full max-w-7xl px-4">
          <div className="flex flex-col">
            <h3 className="font-bold mb-2">
              Należymy do Grupy Polskie Hurtownie Instalacyjne, która zrzesza
              PONAD 40 przedsiębiorstw z branży instalacyjnej, grzewczej i
              sanitarnej.
            </h3>
            <img
              src="/images/logo.png"
              alt="Grupa Polskie Hurtownie Instalacyjne"
              className="w-1/2 h-auto"
            />
          </div>

          <div className="flex flex-col">
            <h3 className="font-bold mb-2">MI-KA SP. Z.O.O</h3>
            <p className="mb-2 font-bold">
              Hurtownia Hydrauliczna, Biuro Projektowe, Serwis
            </p>
            <p className="mb-2">ul. Kopernika 23</p>
            <p className="mb-2">84-241 Gościcino</p>
            <p className="mb-2">
              tel. <span className="text-orange-500">58 74 44 500</span>
            </p>
            <p className="mb-2 font-bold">Oddział Hurtowni w Pucku</p>
            <p className="mb-2">ul. Topolowa 11</p>
            <p className="mb-2">84-100 Puck</p>
          </div>

          <div className="flex flex-col">
            <h3 className="font-bold mb-2">Centrala:</h3>
            <p className="mb-2">
              tel. <span className="text-orange-500">+48 605 255 552</span>
            </p>
            <p className="mb-2">
              E-Mail:{" "}
              <a
                href="mailto:administracja@mi-ka.pl"
                className="text-orange-500"
              >
                administracja@mi-ka.pl
              </a>
            </p>
          </div>

          <div className="flex flex-col">
            <h3 className="font-bold mb-2">Nasze lokalizacje</h3>
            <div className="w-full h-60 bg-gray-200 rounded overflow-hidden">
              <div id="map" className="w-full h-full" />
            </div>
          </div>
        </div>

        <div className="mt-8 text-center flex">
          <a className="mr-4 cursor-pointer font-bold">Polityka prywatności</a>
          <div>© {time} Mi-Ka sp.z.o.o. Wszelkie prawa zastrzeżone.</div>
        </div>
      </div>
    </div>
  );
};

export default MainPageFooter;
