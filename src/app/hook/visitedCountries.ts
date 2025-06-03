import { useState, useEffect } from "react";

interface UseVisitedCountriesProps {
  token: string | null;
  setToken: (token: string | null) => void;
  setUser: (user: { email: string } | null) => void;
  setShowModal: (show: boolean) => void;
  setClickedCountryName: (name: string | null) => void;
  searchedCountryName: string | null;
  setSearchedCountryName: (name: string | null) => void;
}

export function useVisitedCountries({
  token,
  setToken,
  setUser,
  setShowModal,
  setClickedCountryName,
  searchedCountryName,
  setSearchedCountryName,
}: UseVisitedCountriesProps) {
  const [visitedCountries, setVisitedCountries] = useState<string[]>([]);

  useEffect(() => {
    if (token) {
      fetchVisitedCountries(token);
    } else {
      setVisitedCountries([]);
    }
  }, [token]);

  async function fetchVisitedCountries(token: string) {
    const res = await fetch("/api/visit-country", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setVisitedCountries(data.visitedCountries || []);
    } else if (res.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      setToken(null);
      setUser(null);
      setShowModal(true);
      setVisitedCountries([]);
    }
  }

  async function handleCountryClick(countryName: string) {
    if (!token) return setShowModal(true);
    setClickedCountryName(countryName);
    if (searchedCountryName === countryName) {
      setSearchedCountryName(null);
    }
    const res = await fetch("/api/visit-country", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ countryName }),
    });
    if (res.ok) {
      setVisitedCountries((prev) =>
        prev.includes(countryName) ? prev : [...prev, countryName]
      );
    } else if (res.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      setToken(null);
      setUser(null);
      setShowModal(true);
    }
  }

  return {
    visitedCountries,
    setVisitedCountries,
    fetchVisitedCountries,
    handleCountryClick,
  };
}
