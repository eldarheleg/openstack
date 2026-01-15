import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

const getAllCountries = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getWeather = (city) => {
  const apiKey = import.meta.env.VITE_SOME_KEY;
  const weatherUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  const request = axios.get(weatherUrl);
  return request.then((response) => response.data);
};

export default {
  getAllCountries: getAllCountries,
  getWeather: getWeather,
};
