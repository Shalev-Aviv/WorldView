'use client';

import React, { useState, useEffect } from 'react';
import AuthStatus from './components/AuthStatus';
import ContinentNavigation from './components/ContinentNavigation';
import CountrySearch from './components/CountrySearch';
import AfricaMap from './components/AfricaMap';
import EuropeMap from './components/EuropeMap';
import AsiaMap from './components/AsiaMap';
import NorthAmericaMap from './components/NorthAmericaMap';
import SouthAmericaMap from './components/SouthAmericaMap';
import OceaniaMap from './components/OceaniaMap';
import AuthModal from './components/LogicModal';

const asianCountries = [
  { name: 'Afghanistan' },
  { name: 'Armenia' },
  { name: 'Azerbaijan' },
  { name: 'Bahrain' },
  { name: 'Bangladesh' },
  { name: 'Bhutan' },
  { name: 'Brunei' },
  { name: 'Cambodia' },
  { name: 'China' },
  { name: 'Georgia' },
  { name: 'India' },
  { name: 'Indonesia' },
  { name: 'Iran' },
  { name: 'Iraq' },
  { name: 'Israel' },
  { name: 'Japan' },
  { name: 'Jordan' },
  { name: 'Kazakhstan' },
  { name: 'Kuwait' },
  { name: 'Kyrgyzstan' },
  { name: 'Laos' },
  { name: 'Lebanon' },
  { name: 'Malaysia' },
  { name: 'Maldives' },
  { name: 'Mongolia' },
  { name: 'Myanmar (Burma)' },
  { name: 'Nepal' },
  { name: 'North Korea' },
  { name: 'Northern Mariana Islands' },
  { name: 'Oman' },
  { name: 'Pakistan' },
  { name: 'Philippines' },
  { name: 'Qatar' },
  { name: 'Russia' },
  { name: 'Saudi Arabia' },
  { name: 'South Korea' },
  { name: 'Sri Lanka' },
  { name: 'Syria' },
  { name: 'Taiwan' },
  { name: 'Tajikistan' },
  { name: 'Timor-Leste'},
  { name: 'Thailand' },
  { name: 'Turkey' },
  { name: 'Turkmenistan' },
  { name: 'United Arab Emirates' },
  { name: 'Uzbekistan' },
  { name: 'Vietnam' },
  { name: 'Yemen' },
];

const africanCountries = [
  { name: 'Angola' },
  { name: 'Burundi' },
  { name: 'Benin' },
  { name: 'Burkina Faso' },
  { name: 'Botswana' },
  { name: 'Central African Rep.' },
  { name: 'Côte d\'Ivoire' },
  { name: 'Cameroon' },
  { name: 'Dem. Rep. Congo' },
  { name: 'Congo' },
  { name: 'Djibouti' },
  { name: 'Algeria' },
  { name: 'Egypt' },
  { name: 'Eritrea' },
  { name: 'Ethiopia' },
  { name: 'Gabon' },
  { name: 'Ghana' },
  { name: 'Guinea' },
  { name: 'Gambia' },
  { name: 'Guinea-Bissau' },
  { name: 'Eq. Guinea' },
  { name: 'Kenya' },
  { name: 'Liberia' },
  { name: 'Libya' },
  { name: 'Lesotho' },
  { name: 'Morocco' },
  { name: 'Madagascar' },
  { name: 'Mali' },
  { name: 'Mozambique' },
  { name: 'Mauritania' },
  { name: 'Malawi' },
  { name: 'Namibia' },
  { name: 'Niger' },
  { name: 'Nigeria' },
  { name: 'Rwanda' },
  { name: 'Western Sahara' },
  { name: 'Sudan' },
  { name: 'South Sudan' },
  { name: 'Senegal' },
  { name: 'Sierra Leone' },
  { name: 'Eswatini' },
  { name: 'Chad' },
  { name: 'Togo' },
  { name: 'Tunisia' },
  { name: 'Tanzania' },
  { name: 'Uganda' },
  { name: 'South Africa' },
  { name: 'Zambia' },
  { name: 'Zimbabwe' },
  { name: 'Somalia' },
];

const northAmericanCountries = [
  { name: 'Alaska' },
  { name: 'Antigua and Barbuda' },
  { name: 'Antilles' },
  { name: 'Aruba' },
  { name: 'Bahamas' },
  { name: 'Barbados' },
  { name: 'Belize' },
  { name: 'British Virgin Islands' },
  { name: 'Canada' },
  { name: 'Caribbean Netherlands' },
  { name: 'Cayman Islands' },
  { name: 'Costa Rica' },
  { name: 'Cuba' },
  { name: 'Curaçao' },
  { name: 'Dominica' },
  { name: 'Dominican Republic' },
  { name: 'El Salvador' },
  { name: 'Greenland' },
  { name: 'Grenada' },
  { name: 'Guam' },
  { name: 'Guatemala' },
  { name: 'Haiti' },
  { name: 'Hawaii' },
  { name: 'Honduras' },
  { name: 'Jamaica' },
  { name: 'Martinique' },
  { name: 'Mexico' },
  { name: 'Montserrat' },
  { name: 'Nicaragua' },
  { name: 'Panama' },
  { name: 'Puerto Rico' },
  { name: 'Saint Kitts and Nevis' },
  { name: 'Saint Lucia' },
  { name: 'Saint Vincent and the Grenadines' },
  { name: 'Trinidad and Tobago' },
  { name: 'Turks and Caicos Islands' },
  { name: 'United States' },
  { name: 'U.S. Virgin Islands' },
];

const southAmericanCountries = [
  { name: 'Argentina' },
  { name: 'Bolivia' },
  { name: 'Brazil' },
  { name: 'Chile' },
  { name: 'Colombia' },
  { name: 'Ecuador' },
  { name: 'Falkland Islands' },
  { name: 'French Guiana' },
  { name: 'Guyana' },
  { name: 'Paraguay' },
  { name: 'Peru' },
  { name: 'Suriname' },
  { name: 'Uruguay' },
  { name: 'Venezuela' },
];

const europeanCountries = [
  { name: 'Albania' },
  { name: 'Austria' },
  { name: 'Belgium' },
  { name: 'Bulgaria' },
  { name: 'Bosnia and Herzegovina' },
  { name: 'Belarus' },
  { name: 'Germany' },
  { name: 'Denmark' },
  { name: 'Estonia' },
  { name: 'Finland' },
  { name: 'France' },
  { name: 'Greece' },
  { name: 'Croatia' },
  { name: 'Hungary' },
  { name: 'Ireland' },
  { name: 'Iceland' },
  { name: 'Italy' },
  { name: 'Luxembourg' },
  { name: 'Latvia' },
  { name: 'Lithuania' },
  { name: 'Moldova' },
  { name: 'Macedonia' },
  { name: 'Montenegro' },
  { name: 'Netherlands' },
  { name: 'Norway' },
  { name: 'Poland' },
  { name: 'Portugal' },
  { name: 'Romania' },
  { name: 'Serbia' },
  { name: 'Slovakia' },
  { name: 'Svalbard' },
  { name: 'Switzerland' },
  { name: 'Slovenia' },
  { name: 'Sweden' },
  { name: 'Ukraine' },
  { name: 'United Kingdon'},
  { name: 'Spain' },
  { name: 'Cyprus' },
  { name: 'Czechia' },
  { name: 'Malta' },
  { name: 'Kosovo' },
  { name: 'Turkey' },
  { name: 'Russia' },
];

const oceaniaCountries = [
  { name: 'Australia' },
  { name: 'Fiji' },
  { name: 'New Caledonia' },
  { name: 'New Zealand' },
  { name: 'Papua New Guinea' },
  { name: 'Solomon Islands' },
  { name: 'Vanuatu' },
];

export default function HomePage() {
  // State to keep track of the selected continent
  const [selectedContinent, setSelectedContinent] = useState<string | null>('Asia');

  // State to potentially hold the selected country ID from the dropdown
  const [selectedCountryName, setSelectedCountryName] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [visitedCountries, setVisitedCountries] = useState<string[]>([]);
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    // Example: get user from localStorage or cookie
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if (token && email) {
      setToken(token);
      setUser({ email });
      setShowModal(false);
      fetchVisited(token);
    } else {
      setToken(null);
      setUser(null);
      setShowModal(true);
    }
  }, []);

  async function fetchVisited(token: string) {
    const res = await fetch('/api/visit-country', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) {
      const data = await res.json();
      setVisitedCountries(data.visitedCountries || []);
    } else if (res.status === 401) {
      // Token invalid or expired: clear and show modal
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      setToken(null);
      setUser(null);
      setShowModal(true);
      setVisitedCountries([]);
    }
  }

  async function handleAuth(mode: 'login' | 'signup', email: string, password: string) {
    const res = await fetch(`/api/auth/${mode}`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    });
    if (res.ok) {
      const { token, user } = await res.json();
      localStorage.setItem('token', token);
      localStorage.setItem('email', user.email);
      setToken(token);
      setUser({ email: user.email });
      setShowModal(false);
      fetchVisited(token);
    } else {
      alert('Authentication failed');
    }
  }

  async function handleCountryClick(countryName: string) {
    if (!token) return setShowModal(true);
    setSelectedCountryName(countryName);
    const res = await fetch('/api/visit-country', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ countryName })
    });
    if (res.ok) {
      setVisitedCountries((prev) =>
        prev.includes(countryName) ? prev : [...prev, countryName]
      );
    } else if (res.status === 401) {
      // Token invalid or expired: clear and show modal
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      setToken(null);
      setUser(null);
      setShowModal(true);
    }
  }

  const handleCountrySelectFromDropdown = (countryName: string | null) => {
    setSelectedCountryName(countryName);
    // TODO: Implement logic to highlight this country on the currently displayed map
  };

  // Handler for when a continent is selected from the navigation
  const handleContinentSelect = (continent: string) => {
    setSelectedContinent(continent); // Update the continent state
    setSelectedCountryName(null); // Clear any selected country when changing continent
    // TODO: Potentially update the list of countries passed to the dropdown based on the selected continent
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setToken(null);
    setUser(null);
    setShowModal(true);
    setVisitedCountries([]);
  };

  // --- Conditional Rendering of the Map and Country Dropdown ---
  let MapComponent = null;
  let currentContinentCountries: typeof africanCountries | typeof europeanCountries | [] = []; // Define type

  switch (selectedContinent) {
    case 'Africa':
      MapComponent = AfricaMap;
      currentContinentCountries = africanCountries;
      break;
    case 'Europe':
      MapComponent = EuropeMap;
      currentContinentCountries = europeanCountries;
      break;
    case 'Asia':
      MapComponent = AsiaMap;
      currentContinentCountries = asianCountries;
      break;
    case 'North America':
      MapComponent = NorthAmericaMap;
      currentContinentCountries = northAmericanCountries;
      break;
    case 'South America':
      MapComponent = SouthAmericaMap;
      currentContinentCountries = southAmericanCountries;
      break;
    case 'Oceania':
      MapComponent = OceaniaMap;
      currentContinentCountries = oceaniaCountries;
      break;
    default:
      MapComponent = AsiaMap;
      currentContinentCountries = asianCountries;
      break;
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      {/* Auth status and logout */}
      {user && (
        <AuthStatus email={user.email} onLogout={handleLogout} />
      )}

      {/* Continent navigation */}
      <div>
        <ContinentNavigation selectedContinent={selectedContinent}
          onSelectContinent={handleContinentSelect}
        />
      </div>

      {/* Countries drop down */}
      <div className="mt-20 mb-8">
        {currentContinentCountries.length > 0 && (
          <CountrySearch
            countries={currentContinentCountries}
            onSelectCountry={handleCountrySelectFromDropdown}
            onFocus={() => setSelectedCountryName(null)}
            selectedCountryName={selectedCountryName}
          />
        )}
      </div>

      {/* Render the selected map component */}
      <div className='mt-10'>
        {MapComponent && <MapComponent selectedCountryName={selectedCountryName} visitedCountries={visitedCountries} onCountryClick={handleCountryClick} />}
      </div>

      {/* Optional: Display selected country */}
      {selectedCountryName && (
        <p className="mt-4 text-lg">Selected Country: {selectedCountryName}</p>
      )}

      {/* Auth modal for login/signup */}
      {!user && (
        <AuthModal show={showModal} onAuth={handleAuth} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}