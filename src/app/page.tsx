'use client';

import { useState, useEffect } from 'react';

import ContinentNavigation from './components/ContinentNavigation';
import CountrySearch from './components/CountrySearch';
import AfricaMap from './components/AfricaMap';
import EuropeMap from './components/EuropeMap';
import AsiaMap from './components/AsiaMap';
import NorthAmericaMap from './components/NorthAmericaMap';
import SouthAmericaMap from './components/SouthAmericaMap';
import AntarcticaMap from './components/AntarcticaMap';
import OceaniaMap from './components/OceaniaMap';
import AuthModal from './components/LogicModal';

const africanCountries = [
  { id: 'AO', name: 'Angola' },
  { id: 'BI', name: 'Burundi' },
  { id: 'BJ', name: 'Benin' },
  { id: 'BF', name: 'Burkina Faso' },
  { id: 'BW', name: 'Botswana' },
  { id: 'CF', name: 'Central African Rep.' },
  { id: 'CI', name: 'Côte d\'Ivoire' },
  { id: 'CM', name: 'Cameroon' },
  { id: 'CD', name: 'Dem. Rep. Congo' },
  { id: 'CG', name: 'Congo' },
  { id: 'DJ', name: 'Djibouti' },
  { id: 'DZ', name: 'Algeria' },
  { id: 'EG', name: 'Egypt' },
  { id: 'ER', name: 'Eritrea' },
  { id: 'ET', name: 'Ethiopia' },
  { id: 'GA', name: 'Gabon' },
  { id: 'GH', name: 'Ghana' },
  { id: 'GN', name: 'Guinea' },
  { id: 'GM', name: 'Gambia' },
  { id: 'GW', name: 'Guinea-Bissau' },
  { id: 'GQ', name: 'Eq. Guinea' },
  { id: 'KE', name: 'Kenya' },
  { id: 'LR', name: 'Liberia' },
  { id: 'LY', name: 'Libya' },
  { id: 'LS', name: 'Lesotho' },
  { id: 'MA', name: 'Morocco' },
  { id: 'MG', name: 'Madagascar' },
  { id: 'ML', name: 'Mali' },
  { id: 'MZ', name: 'Mozambique' },
  { id: 'MR', name: 'Mauritania' },
  { id: 'MW', name: 'Malawi' },
  { id: 'NA', name: 'Namibia' },
  { id: 'NE', name: 'Niger' },
  { id: 'NG', name: 'Nigeria' },
  { id: 'RW', name: 'Rwanda' },
  { id: 'EH', name: 'W. Sahara' },
  { id: 'SD', name: 'Sudan' },
  { id: 'SS', name: 'S. Sudan' },
  { id: 'SN', name: 'Senegal' },
  { id: 'SL', name: 'Sierra Leone' },
  { id: 'SZ', name: 'Swaziland' },
  { id: 'TD', name: 'Chad' },
  { id: 'TG', name: 'Togo' },
  { id: 'TN', name: 'Tunisia' },
  { id: 'TZ', name: 'Tanzania' },
  { id: 'UG', name: 'Uganda' },
  { id: 'ZA', name: 'South Africa' },
  { id: 'ZM', name: 'Zambia' },
  { id: 'ZW', name: 'Zimbabwe' },
  { id: 'SO', name: 'Somalia' },
];

const europeanCountries = [
  { id: 'AL', name: 'Albania' },
  { id: 'AT', name: 'Austria' },
  { id: 'BE', name: 'Belgium' },
  { id: 'BG', name: 'Bulgaria' },
  { id: 'BA', name: 'Bosnia and Herzegovina' },
  { id: 'BY', name: 'Belarus' },
  { id: 'DE', name: 'Germany' },
  { id: 'DK', name: 'Denmark' },
  { id: 'EE', name: 'Estonia' },
  { id: 'FI', name: 'Finland' },
  { id: 'FR', name: 'France' },
  { id: 'GR', name: 'Greece' },
  { id: 'HR', name: 'Croatia' },
  { id: 'HU', name: 'Hungary' },
  { id: 'IE', name: 'Ireland' },
  { id: 'IS', name: 'Iceland' },
  { id: 'IT', name: 'Italy' },
  { id: 'LU', name: 'Luxembourg' },
  { id: 'LV', name: 'Latvia' },
  { id: 'LT', name: 'Lithuania' },
  { id: 'MD', name: 'Moldova' },
  { id: 'MK', name: 'Macedonia' },
  { id: 'ME', name: 'Montenegro' },
  { id: 'NL', name: 'Netherlands' },
  { id: 'NO', name: 'Norway' },
  { id: 'PL', name: 'Poland' },
  { id: 'PT', name: 'Portugal' },
  { id: 'RO', name: 'Romania' },
  { id: 'RS', name: 'Serbia' },
  { id: 'SK', name: 'Slovakia' },
  { id: 'SW', name: 'Switzerland' },
  { id: 'SN', name: 'Slovenia' },
  { id: 'SE', name: 'Sweden' },
  { id: 'UA', name: 'Ukraine' },
  { id: 'UK', name: 'United Kingdon'},
  { id: 'ES', name: 'Spain' },
  { id: 'CY', name: 'Cyprus' },
  { id: 'CZ', name: 'Czechia' },
  { id: 'MT', name: 'Malta' },
  { id: 'KO', name: 'Kosovo' },
  { id: 'TU', name: 'Turkey' },
  { id: 'RU', name: 'Russia' },
];

const asianCountries = [
  { id: 'AF', name: 'Afghanistan' },
  { id: 'AM', name: 'Armenia' },
  { id: 'AZ', name: 'Azerbaijan' },
  { id: 'BH', name: 'Bahrain' },
  { id: 'BD', name: 'Bangladesh' },
  { id: 'BT', name: 'Bhutan' },
  { id: 'BN', name: 'Brunei' },
  { id: 'KH', name: 'Cambodia' },
  { id: 'CN', name: 'China' },
  { id: 'CY', name: 'Cyprus' },
  { id: 'GE', name: 'Georgia' },
  { id: 'IN', name: 'India' },
  { id: 'ID', name: 'Indonesia' },
  { id: 'IR', name: 'Iran' },
  { id: 'IQ', name: 'Iraq' },
  { id: 'IL', name: 'Israel' },
  { id: 'JP', name: 'Japan' },
  { id: 'JO', name: 'Jordan' },
  { id: 'KZ', name: 'Kazakhstan' },
  { id: 'KW', name: 'Kuwait' },
  { id: 'KG', name: 'Kyrgyzstan' },
  { id: 'LA', name: 'Laos' },
  { id: 'LB', name: 'Lebanon' },
  { id: 'MY', name: 'Malaysia' },
  { id: 'MV', name: 'Maldives' },
  { id: 'MN', name: 'Mongolia' },
  { id: 'MM', name: 'Myanmar (Burma)' },
  { id: 'NP', name: 'Nepal' },
  { id: 'KP', name: 'North Korea' },
  { id: 'OM', name: 'Oman' },
  { id: 'PK', name: 'Pakistan' },
  { id: 'PH', name: 'Philippines' },
  { id: 'QA', name: 'Qatar' },
  { id: 'RU', name: 'Russia' },
  { id: 'SA', name: 'Saudi Arabia' },
  { id: 'SG', name: 'Singapore' },
  { id: 'KR', name: 'South Korea' },
  { id: 'LK', name: 'Sri Lanka' },
  { id: 'SY', name: 'Syria' },
  { id: 'TJ', name: 'Tajikistan' },
  { id: 'TH', name: 'Thailand' },
  { id: 'TR', name: 'Turkey' },
  { id: 'TM', name: 'Turkmenistan' },
  { id: 'AE', name: 'United Arab Emirates' },
  { id: 'UZ', name: 'Uzbekistan' },
  { id: 'VN', name: 'Vietnam' },
  { id: 'YE', name: 'Yemen' },
];

const northAmericanCountries = [
  { id: 'AG', name: 'Antigua and Barbuda' },
  { id: 'BS', name: 'Bahamas' },
  { id: 'BB', name: 'Barbados' },
  { id: 'BZ', name: 'Belize' },
  { id: 'CA', name: 'Canada' },
  { id: 'CR', name: 'Costa Rica' },
  { id: 'CU', name: 'Cuba' },
  { id: 'DM', name: 'Dominica' },
  { id: 'DO', name: 'Dominican Republic' },
  { id: 'SV', name: 'El Salvador' },
  { id: 'GD', name: 'Grenada' },
  { id: 'GT', name: 'Guatemala' },
  { id: 'HT', name: 'Haiti' },
  { id: 'HN', name: 'Honduras' },
  { id: 'JM', name: 'Jamaica' },
  { id: 'MX', name: 'Mexico' },
  { id: 'NI', name: 'Nicaragua' },
  { id: 'PA', name: 'Panama' },
  { id: 'KN', name: 'Saint Kitts and Nevis' },
  { id: 'LC', name: 'Saint Lucia' },
  { id: 'VC', name: 'Saint Vincent and the Grenadines' },
  { id: 'TT', name: 'Trinidad and Tobago' },
  { id: 'US', name: 'United States' },
];

const southAmericanCountries = [
  { id: 'AR', name: 'Argentina' },
  { id: 'BO', name: 'Bolivia' },
  { id: 'BR', name: 'Brazil' },
  { id: 'CL', name: 'Chile' },
  { id: 'CO', name: 'Colombia' },
  { id: 'EC', name: 'Ecuador' },
  { id: 'GY', name: 'Guyana' },
  { id: 'PY', name: 'Paraguay' },
  { id: 'PE', name: 'Peru' },
  { id: 'SR', name: 'Suriname' },
  { id: 'UY', name: 'Uruguay' },
  { id: 'VE', name: 'Venezuela' },
];

const oceaniaCountries = [
  { id: 'AU', name: 'Australia' },
  { id: 'FJ', name: 'Fiji' },
  { id: 'KI', name: 'Kiribati' },
  { id: 'MH', name: 'Marshall Islands' },
  { id: 'FM', name: 'Micronesia' },
  { id: 'NR', name: 'Nauru' },
  { id: 'NZ', name: 'New Zealand' },
  { id: 'PW', name: 'Palau' },
  { id: 'PG', name: 'Papua New Guinea' },
  { id: 'WS', name: 'Samoa' },
  { id: 'SB', name: 'Solomon Islands' },
  { id: 'TO', name: 'Tonga' },
  { id: 'TV', name: 'Tuvalu' },
  { id: 'VU', name: 'Vanuatu' },
];

const antarcticaCountries = []; // Antarctica has no countries

export default function Home() {
  // State to keep track of the selected continent
  const [selectedContinent, setSelectedContinent] = useState<string | null>('Asia');

  // State to potentially hold the selected country ID from the dropdown
  const [selectedCountryName, setSelectedCountryName] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [visitedCountries, setVisitedCountries] = useState<string[]>([]);
  const [user, setUser] = useState<{ id: number, email: string, username?: string } | null>(null);

  useEffect(() => {
    const t = localStorage.getItem('token');
    const u = localStorage.getItem('user');
    if (u) setUser(JSON.parse(u));
    if (!t) setShowModal(true);
    else {
      setToken(t);
      fetchVisited(t);
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
      localStorage.removeItem('user');
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
      localStorage.setItem('user', JSON.stringify(user));
      setToken(token);
      setUser(user);
      setShowModal(false);
      fetchVisited(token);
    } else {
      alert('Authentication failed');
    }
  }

  async function handleCountryClick(countryId: string) {
    if (!token) return setShowModal(true);
    setSelectedCountryName(countryId);
    const res = await fetch('/api/visit-country', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ countryId })
    });
    if (res.ok) {
      setVisitedCountries((prev) =>
        prev.includes(countryId) ? prev : [...prev, countryId]
      );
    } else if (res.status === 401) {
      // Token invalid or expired: clear and show modal
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setToken(null);
      setUser(null);
      setShowModal(true);
    }
  }

  const handleCountrySelectFromDropdown = (countryId: string | null) => {
    console.log("Country selected from dropdown:", countryId);
    setSelectedCountryName(countryId);
    // TODO: Implement logic to highlight this country on the currently displayed map
  };

  // Handler for when a continent is selected from the navigation
  const handleContinentSelect = (continent: string) => {
    console.log("Continent selected:", continent);
    setSelectedContinent(continent); // Update the continent state
    setSelectedCountryName(null); // Clear any selected country when changing continent
    // TODO: Potentially update the list of countries passed to the dropdown based on the selected continent
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
    case 'Antarctica':
      MapComponent = AntarcticaMap;
      currentContinentCountries = []; // No countries to show for Antarctica
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
    <div className="flex flex-col items-center  min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      {/* User info top left */}
      <div className='absolute top-10 left-10 z-100'>
        {user && (
          <span className="bg-gray-800 text-white px-3 py-1 rounded">
            {user.username || user.email}
          </span>
        )}
      </div>
      {/* Continent navigation */}
      <div className=''>
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
          />
        )}
      </div>

      {/* Render the selected map component */}
      <div className='mt-10'>
        {MapComponent && <MapComponent selectedCountryName={selectedCountryName} visitedCountries={visitedCountries} onCountryClick={handleCountryClick} />}
      </div>

      {/* Optional: Display selected country */}
      {selectedCountryName && (
        <p className="mt-4 text-lg">Selected Country ID: {selectedCountryName}</p>
      )}

      <AuthModal show={showModal} onAuth={handleAuth} onClose={()=>setShowModal(false)} />

    </div>
  );
}