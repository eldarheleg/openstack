const Country = ({ country }) => {
  const capital = country.capital?.[0] || "N/A";
  const languages = country.languages || {};

  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>
        <p>capital {capital}</p>
        <p>area {country.area} km²</p>
      </div>
      <div>
        <h3>languages</h3>
        <ul>
          {Object.values(languages).map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
      </div>
      <img
        src={country.flags.png}
        alt={`${country.name.common} flag`}
        width="100"
      />
    </div>
  );
};

export default Country;
