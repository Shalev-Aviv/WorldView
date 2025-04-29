// app/components/ContinentNavigation.tsx
'use client';

import React from 'react';

// Define the props for the navigation component
interface ContinentNavigationProps {
  selectedContinent: string | null; // Still accept this prop, even if not used for styling here
  onSelectContinent: (continent: string) => void; // Function to call when a continent is clicked
}

// Define a list of continents (can be moved outside the component if preferred)
const continents = [
    'Asia',
    'Africa',
    'North America',
    'South America',
    'Antarctica', // Note: Antarctica isn't typically clickable on a country map
    'Europe',
    'Australia' // Or 'Oceania' depending on desired grouping
];

// Pass the props to the component
const ContinentNavigation: React.FC<ContinentNavigationProps> = ({ selectedContinent, onSelectContinent }) => {

    return (
        // Adjusted top-10 to top-0 because the parent div now has mb-8 for spacing
        <menu className="absolute h-full right-0 top-0 rounded-lg text-white
                        flex flex-col justify-between pt-8 pb-8 w-40 bg-gray-800 p-4
                        z-1">
            {continents.map(continent => (
                <li className="py-2 border-2 border-transparent
                          hover:border-purple-500 transition-colors duration-100
                            cursor-pointer text-center"
                    key={continent}
                    onClick={() => onSelectContinent(continent)}>
                    
                    {continent}
                </li>
            ))}
        </menu>
    )
}

export default ContinentNavigation;
