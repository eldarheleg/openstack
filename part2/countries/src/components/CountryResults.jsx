import Country from "./Country";

const CountryResults = ({ filteredCountries, query }) => {
  if (!query) return null;
  if (filteredCountries.length > 10) return <p>Too many matches...</p>;
  if (filteredCountries.length === 1)
    return <Country country={filteredCountries[0]} />;
  return filteredCountries.map((country) => (
    <p key={country.cca2}>{country.name.common}</p>
  ));
};

export default CountryResults;
