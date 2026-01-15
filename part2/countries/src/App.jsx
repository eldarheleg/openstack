import { useState, useEffect } from "react";
import "./App.css";
import CountryResults from "./components/CountryResults";
import service from "./assets/service";

function App() {
  const [countries, setCountries] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    service.getAllCountries().then((data) => setCountries(data));
  }, []);

  const filteredCountries = countries
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <>
      <label>
        Search Countries:{" "}
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
      </label>
      <div>
        <CountryResults filteredCountries={filteredCountries} query={query} />
      </div>
    </>
  );
}

export default App;
