import { useEffect, useState } from "react";
import service from "../assets/service";

const Country = ({ country }) => {
  const capital = country.capital?.[0] || "N/A";
  const languages = country.languages || {};
  const [weather, setWeather] = useState({
    temp_c: null,
    wind_kph: null,
    icon: null,
  });
  useEffect(() => {
    service.getWeather(capital).then((weatherData) => {
      console.log(weatherData);
      setWeather({
        temp_c: weatherData.current.temp_c,
        wind_kph: weatherData.current.wind_kph,
        icon: weatherData.current.condition.icon,
      });
    });
  }, [capital, country]);

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
      <h2>Weather in {capital}</h2>
      <img src={weather.icon} alt="Weather icon" width={100} height={100} />
      <p>Temperature: {weather.temp_c}°C</p>
      <p>Wind Speed: {weather.wind_kph} km/h</p>
    </div>
  );
};

export default Country;
