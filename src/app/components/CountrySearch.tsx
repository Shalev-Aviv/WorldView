'use client';

import React, { useState, useMemo } from 'react';

interface Country {
    id: string;
    name: string;
}
  
interface CountrySearchProps {
    countries: Country[];
    onSelectCountry: (countryId: string | null) => void;
    onFocus?: () => void; // Add this
}
  
    const CountrySearch: React.FC<CountrySearchProps> = ({ countries, onSelectCountry, onFocus }) => {
        const [searchTerm, setSearchTerm] = useState('');
        const [isOpen, setIsOpen] = useState(false);

        const filteredCountries = useMemo(() => {
            if (!searchTerm) {
                return countries;
            }
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            return countries.filter(country =>
                country.name.toLowerCase().includes(lowerCaseSearchTerm)
            );
        }, [countries, searchTerm]);
    
        const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(event.target.value);
            setIsOpen(true);
        };
        
        const handleInputFocus = () => {
           setSearchTerm('');
           setIsOpen(true);
        };
    
        const handleInputBlur = () => {
          setTimeout(() => setIsOpen(false), 100);
        };
    
        const handleSelectCountry = (country: Country) => {
          setSearchTerm(country.name);
          setIsOpen(false);
          onSelectCountry(country.id);
        };
    
        return (
            <div className="relative w-64">

            {/* Dropdown */}
            <input type="text" placeholder="Looking for..."
                className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                value={searchTerm}
                onChange={handleInputChange}
                onFocus={(e) => {
                    handleInputFocus();
                    if(onFocus) onFocus();
                }}
            />

            {/* Dropdown list of countries */}
            {isOpen && filteredCountries.length > 0 && (
                <ul className="absolute z-10 w-full bg-black border border-gray-400 rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
                    {filteredCountries.map(country => (
                        <li key={country.id} onClick={() => handleSelectCountry(country)}
                            className="px-3 py-2 cursor-pointer hover:bg-white hover:text-black text-white"
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
