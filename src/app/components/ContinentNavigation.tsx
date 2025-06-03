// app/components/ContinentNavigation.tsx
"use client";

import React from "react";

interface ContinentNavigationProps {
  selectedContinent: string | null;
  onSelectContinent: (continent: string) => void;
}

const continents = [
  "Asia",
  "Africa",
  "North America",
  "South America",
  "Europe",
  "Oceania",
];

const ContinentNavigation: React.FC<ContinentNavigationProps> = ({
  selectedContinent,
  onSelectContinent,
}) => {
  return (
    <menu className="fixed h-full left-0 top-0 rounded-l-none rounded-r-lg text-white flex flex-col justify-between pt-32 pb-32 w-50 p-4 z-1 bg-gradient-to-br from-[#ffffff50] to-black border-1 border-solid border-white">
      {continents.map((continent) => (
        <li
          className="py-2 border-2 border-transparent hover:text-purple-500 transition-colors duration-100 cursor-pointer text-center font-bold font-mono underline"
          key={continent}
          onClick={() => onSelectContinent(continent)}
        >
          {continent}
        </li>
      ))}
    </menu>
  );
};

export default ContinentNavigation;
