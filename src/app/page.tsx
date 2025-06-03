"use client";

import React, { useState } from "react";
import AuthStatus from "./components/AuthStatus";
import ContinentNavigation from "./components/ContinentNavigation";
import CountrySearch from "./components/CountrySearch";
import AfricaMap from "./components/AfricaMap";
import EuropeMap from "./components/EuropeMap";
import AsiaMap from "./components/AsiaMap";
import NorthAmericaMap from "./components/NorthAmericaMap";
import SouthAmericaMap from "./components/SouthAmericaMap";
import OceaniaMap from "./components/OceaniaMap";
import AuthModal from "./components/LogicModal";
import LiveStatistics from "./components/LiveStatistics";
import {
  asianCountries,
  africanCountries,
  europeanCountries,
  northAmericanCountries,
  southAmericanCountries,
  oceanianCountries,
} from "./data/countries";
import { user as useUser } from "./hook/user";
import { useVisitedCountries } from "./hook/visitedCountries";

const allCountries = [
  ...asianCountries.map((c) => ({ ...c, continent: "Asia", code: c.name })),
  ...africanCountries.map((c) => ({ ...c, continent: "Africa", code: c.name })),
  ...europeanCountries.map((c) => ({
    ...c,
    continent: "Europe",
    code: c.name,
  })),
  ...northAmericanCountries.map((c) => ({
    ...c,
    continent: "North America",
    code: c.name,
  })),
  ...southAmericanCountries.map((c) => ({
    ...c,
    continent: "South America",
    code: c.name,
  })),
  ...oceanianCountries.map((c) => ({
    ...c,
    continent: "Oceania",
    code: c.name,
  })),
];

export default function HomePage() {
  const {
    user,
    token,
    showModal,
    setShowModal,
    handleAuth,
    handleLogout,
    setUser,
    setToken,
    authError,
    setAuthError,
  } = useUser();

  const [selectedContinent, setSelectedContinent] = useState<string | null>(
    "Asia"
  );
  const [searchedCountryName, setSearchedCountryName] = useState<string | null>(
    null
  );
  const [clickedCountryName, setClickedCountryName] = useState<string | null>(
    null
  );

  const { visitedCountries, handleCountryClick } = useVisitedCountries({
    token,
    setToken,
    setUser,
    setShowModal,
    setClickedCountryName,
    searchedCountryName,
    setSearchedCountryName,
  });

  let MapComponent = null;
  let currentContinentCountries:
    | typeof africanCountries
    | typeof europeanCountries
    | [] = [];

  switch (selectedContinent) {
    case "Africa":
      MapComponent = AfricaMap;
      currentContinentCountries = africanCountries;
      break;
    case "Europe":
      MapComponent = EuropeMap;
      currentContinentCountries = europeanCountries;
      break;
    case "Asia":
      MapComponent = AsiaMap;
      currentContinentCountries = asianCountries;
      break;
    case "North America":
      MapComponent = NorthAmericaMap;
      currentContinentCountries = northAmericanCountries;
      break;
    case "South America":
      MapComponent = SouthAmericaMap;
      currentContinentCountries = southAmericanCountries;
      break;
    case "Oceania":
      MapComponent = OceaniaMap;
      currentContinentCountries = oceanianCountries;
      break;
    default:
      MapComponent = AsiaMap;
      currentContinentCountries = asianCountries;
      break;
  }

  const handleCountrySelectFromDropdown = (countryName: string | null) => {
    setSearchedCountryName(countryName);
  };

  const handleContinentSelect = (continent: string) => {
    setSelectedContinent(continent);
    setSearchedCountryName(null);
    setClickedCountryName(null);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      {user && <AuthStatus email={user.email} onLogout={handleLogout} />}

      <div className="w-full max-w-md">
        <LiveStatistics
          allCountries={allCountries}
          visitedCountryCodes={visitedCountries}
          currentContinent={selectedContinent || ""}
        />
      </div>

      <div>
        <ContinentNavigation
          selectedContinent={selectedContinent}
          onSelectContinent={handleContinentSelect}
        />
      </div>

      <div className="mt-20 mb-8">
        {currentContinentCountries.length > 0 && (
          <CountrySearch
            countries={currentContinentCountries}
            onSelectCountry={handleCountrySelectFromDropdown}
            selectedCountryName={searchedCountryName}
          />
        )}
      </div>

      <div className="mt-10">
        {MapComponent && (
          <MapComponent
            selectedCountryName={searchedCountryName}
            visitedCountries={visitedCountries}
            onCountryClick={handleCountryClick}
          />
        )}
      </div>

      {!user && (
        <>
          <AuthModal
            show={showModal}
            onAuth={handleAuth}
            onClose={() => {
              setShowModal(false);
              setAuthError(null);
            }}
          />
          {authError && (
            <div className="mt-4 text-red-500 text-center">{authError}</div>
          )}
        </>
      )}
    </div>
  );
}
