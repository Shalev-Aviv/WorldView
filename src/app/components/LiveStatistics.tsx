import React from 'react';

interface Country {
  code: string;
  name: string;
  continent: string;
}

interface LiveStatisticsProps {
  allCountries: Country[];
  visitedCountryCodes: string[];
  currentContinent: string;
}

const LiveStatistics: React.FC<LiveStatisticsProps> = ({
  allCountries,
  visitedCountryCodes,
  currentContinent,
}) => {
  const totalCountries = allCountries.length;
  const visitedCountries = allCountries.filter(c =>
    visitedCountryCodes.includes(c.code)
  ).length;

  const countriesInContinent = allCountries.filter(
    c => c.continent === currentContinent
  );
  const totalInContinent = countriesInContinent.length;
  const visitedInContinent = countriesInContinent.filter(c =>
    visitedCountryCodes.includes(c.code)
  ).length;

  const percentGlobal = totalCountries
    ? ((visitedCountries / totalCountries) * 100).toFixed(1)
    : '0';
  const percentContinent = totalInContinent
    ? ((visitedInContinent / totalInContinent) * 100).toFixed(1)
    : '0';

  return (
    <div className='justify-center text-center m-0 p-0'>
      <div>
        <strong>Visited countries (world):</strong> {percentGlobal}%
        <span className='ml-2'>
          ({visitedCountries}/{totalCountries})
        </span>
      </div>
      <div>
        <strong>Visited countries ({currentContinent}):</strong> {percentContinent}%
        <span className='ml-2'>
          ({visitedInContinent}/{totalInContinent})
        </span>
      </div>
    </div>
  );
};

export default LiveStatistics;
