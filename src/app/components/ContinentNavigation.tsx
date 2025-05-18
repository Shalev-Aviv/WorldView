// app/components/ContinentNavigation.tsx
'use client';

import React from 'react';

interface ContinentNavigationProps {
  selectedContinent: string | null;
  onSelectContinent: (continent: string) => void;
}

const continents = [
    'Asia',
    'Africa',
    'North America',
    'South America',
    'Antarctica',
    'Europe',
    'Oceania'
];

const ContinentNavigation: React.FC<ContinentNavigationProps> = ({ selectedContinent, onSelectContinent }) => {

    return (
        <menu className="absolute h-full right-0 top-0 rounded-lg text-white
                        flex flex-col justify-between pt-8 pb-8 w-50 bg-gray-800 p-4
                        z-1">
            {continents.map(continent => (
                <li className="py-2 border-2 border-transparent
                          hover:text-purple-500 transition-colors duration-100
                            cursor-pointer text-center font-bold font-mono underline"
                    key={continent}
                    onClick={() => onSelectContinent(continent)}>
                    
                    {continent}
                </li>
            ))}
        </menu>
    )
}

export default ContinentNavigation;
