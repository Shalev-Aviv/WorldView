'use client';

import React, { MouseEvent } from 'react';

const AustraliaMap: React.FC = () => {

    const handleCountryClick = (event: MouseEvent<SVGPathElement | SVGGElement>) => {
      const countryId = event.currentTarget.id;
      if (countryId) {
        console.log(`Clicked on country: ${countryId}`);
      }
    };

    return (
        <div>
            
        </div>
    )
}

export default AustraliaMap;
