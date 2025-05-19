'use client';

import React, { useState, useMemo, useEffect } from 'react';

interface Country {
    name: string;
}
  
interface CountrySearchProps {
    countries: Country[];
    onSelectCountry: (countryId: string | null) => void;
    onFocus?: () => void;
    selectedCountryName?: string | null; // <-- Add this prop
}
  
    const CountrySearch: React.FC<CountrySearchProps> = ({ countries, onSelectCountry, onFocus, selectedCountryName }) => {
        const [searchTerm, setSearchTerm] = useState('');
        const [isOpen, setIsOpen] = useState(false);

        // Sync input value with selectedCountryName from parent
        useEffect(() => {
            if (selectedCountryName) {
                setSearchTerm(selectedCountryName);
            }
        }, [selectedCountryName]);

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
          onSelectCountry(country.name);
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
                onBlur={handleInputBlur}
            />

            {/* Dropdown list of countries */}
            {isOpen && filteredCountries.length > 0 && (
                <ul className="absolute z-10 w-full bg-black border border-gray-400 rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
                    {filteredCountries.map(country => (
                        <li key={country.name} onClick={() => handleSelectCountry(country)}
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
