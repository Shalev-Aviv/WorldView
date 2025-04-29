'use client';

import React, { useState, useMemo } from 'react';

interface Country {
    id: string; // e.g., "AO"
    name: string; // e.g., "Angola"
}
  
interface CountrySearchProps {
    countries: Country[]; // This component will receive the list of countries as a prop
    onSelectCountry: (countryId: string | null) => void; // Function to call when a country is selected
}
  
    const CountrySearch: React.FC<CountrySearchProps> = ({ countries, onSelectCountry }) => {
        const [searchTerm, setSearchTerm] = useState('');
        const [isOpen, setIsOpen] = useState(false); // State to control dropdown visibility
  
        // Filter countries based on search term
        const filteredCountries = useMemo(() => {
            if (!searchTerm) {
                return countries; // Show all countries if search term is empty
            }
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            return countries.filter(country =>
                country.name.toLowerCase().includes(lowerCaseSearchTerm)
            );
        }, [countries, searchTerm]); // Recalculate only when countries or searchTerm changes
    
        const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(event.target.value);
            setIsOpen(true); // Open dropdown when typing
        };
        
        const handleInputFocus = () => {
           // --- MODIFIED LOGIC HERE ---
           // Clear the search term and open the dropdown for a fresh search
           setSearchTerm('');
           setIsOpen(true);
           // ---------------------------
        };
    
        const handleInputBlur = () => {
          // Delay closing the dropdown so click on item can register
          setTimeout(() => setIsOpen(false), 100);
        };
    
        const handleSelectCountry = (country: Country) => {
          setSearchTerm(country.name); // Put selected country name in input
          setIsOpen(false); // Close dropdown
          onSelectCountry(country.id); // Call the prop function with the country ID
        };
    
        return (
            <div className="relative w-64"> {/* Container for input and dropdown */}

            {/* Dropdown */}
            <input type="text"
                placeholder="Looking for..."
                className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                value={searchTerm}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
            />

            {/* Dropdown list of countries */}
            {isOpen && filteredCountries.length > 0 && (
                <ul className="absolute z-10 w-full bg-black border border-gray-400 rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
                    {filteredCountries.map(country => (
                        <li key={country.id}
                            className="px-3 py-2 cursor-pointer hover:bg-white hover:text-black text-white"
                            onClick={() => handleSelectCountry(country)}
                        >
                        {country.name}
                        </li>
                    ))}
                </ul>
            )}

            {/* Optional: Display a message if no countries match */}
            {isOpen && filteredCountries.length === 0 && searchTerm !== '' && (
                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 px-3 py-2 text-black">
                    No countries found
                </div>
            )}
          </div>
        );
    };
  
export default CountrySearch;
