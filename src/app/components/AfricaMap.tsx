'use client';

import React from 'react';
import { africanCountries } from '../data/countries';

interface AfricaMapProps {
    selectedCountryName: string | null;
    visitedCountries: string[];
    onCountryClick: (countryId: string) => void;
}

const AfricaMap: React.FC<AfricaMapProps> = ({ selectedCountryName, visitedCountries, onCountryClick }) => (
    <div>
        <svg xmlns="http://www.w3.org/2000/svg"
            version="1.2" id="svg2"
            style={{ strokeLinejoin: 'round' }}
            className='stroke-black stroke-[0.2px] fill-white w-[1000px] h-[1001px]'
            enableBackground="new 0 0 1000 1001"
            viewBox="0 0 1000 1001"
            >
            
            {africanCountries.map((country) => {
                let fillClass = '';
                if (country.dataName === selectedCountryName) {
                    fillClass = 'fill-green-500';
                } else if (visitedCountries.includes(country.dataName)) {
                    fillClass = 'fill-purple-500';
                }
                return (
                    <path
                        className={`cursor-pointer transition transform duration-200 ease-in-out fill-opacity-200 hover:fill-gray-300 ${fillClass}`}
                        key={country.dataName}
                        data-name={country.dataName}
                        d={country.d}
                        onClick={() => onCountryClick(country.dataName)}
                    />
                );
            })}
        </svg>
    </div>
);

export default AfricaMap;