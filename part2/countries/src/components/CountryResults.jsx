import { useState } from "react";
import Country from "./Country";
import "./components.css";

const CountryResults = ({ filteredCountries, query }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  if (!query) return null;
  if (filteredCountries.length > 10)
    return <p>Too many matches, specify another filter</p>;
  if (filteredCountries.length === 1)
    return <Country country={filteredCountries[0]} />;

  const handleToggle = (countryCode) => {
    setSelectedCountry(selectedCountry === countryCode ? null : countryCode);
  };

  return (
    <>
      {filteredCountries.map((country) => (
        <div key={country.cca2} className="country">
          <div className="country-header">
            <span>{country.name.common}</span>
            <button onClick={() => handleToggle(country.cca2)}>
              {selectedCountry === country.cca2 ? "hide" : "show"}
            </button>
          </div>
          <div className="country-details">
            {selectedCountry === country.cca2 && <Country country={country} />}
          </div>
        </div>
      ))}
    </>
  );
};

export default CountryResults;
