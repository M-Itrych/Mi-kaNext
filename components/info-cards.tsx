"use client";
import React, { useState, createContext, useContext } from "react";

interface HoverContextType {
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
}

const HoverContext = createContext<HoverContextType>({
  hoveredId: null,
  setHoveredId: () => {},
});

export const InfoCardsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <HoverContext.Provider value={{ hoveredId, setHoveredId }}>
      {children}
    </HoverContext.Provider>
  );
};

const useHover = () => useContext(HoverContext);

interface InfoCardsProps {
  title: string;
  description: string;
  customClass?: string;
  id?: string;
}

const InfoCards: React.FC<InfoCardsProps> = ({
  title,
  description,
  customClass = "",
  id = "defaultId",
}) => {
  const { hoveredId, setHoveredId } = useHover();
  const isActive = hoveredId === null || hoveredId === id;

  return (
    <div
      className={`
        rounded-[10px] 
        p-4 sm:p-6 md:p-8 lg:p-[50px]
        ${isActive ? "bg-white" : "bg-black"}
        flex
        h-auto min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:h-[400px]
        w-full
        justify-center
        flex-col
        gap-2 sm:gap-3 md:gap-4
        transition-all duration-700 sm:duration-1100 ease-in-out
        ${
          isActive
            ? "hover:transform hover:scale-[1.02] sm:hover:scale-105 hover:shadow-xl"
            : ""
        }
        ${customClass}
      `}
      onMouseEnter={() => setHoveredId(id)}
      onMouseLeave={() => setHoveredId(null)}
    >
      <h2
        className={`${
          isActive ? "text-black" : "text-white"
        } text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-urbanist`}
      >
        {title}
      </h2>
      <p
        className={`${
          isActive ? "text-black" : "text-white"
        } text-sm sm:text-base font-normal leading-relaxed font-inter`}
      >
        {description}
      </p>
    </div>
  );
};

export default InfoCards;
