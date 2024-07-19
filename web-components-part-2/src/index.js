import './components/weather-card/weather-card';
import './components/header/header';
import {
  coordinates,
  CoordinatesInitEvent,
  getLocationNameFromCoordinates,
  initCoordinates
} from './utils/geolocalization';
import {getCityWeather, initWeatherApi, italyTopCitiesWeather, TopCitiesEventKey} from './api/weather';
import '../public/styles.css';


let root = null;

const renderApp = async () => {
  root = document.getElementById('root');
  root.innerHTML = `
    <app-header></app-header>
    <main class="container">
      <h2 class="m-y-2">Current City</h2>
      ${await createCurrentLocationWeatherCard()}
      <h2 class="m-y-2">Top Cities</h2>
      <div class="weather-cards-container">
        ${createTopCitiesWeatherCards()}
      </div>
    </main>
  `;
}

const createCurrentLocationWeatherCard = async () => {
  const currentCityWeather = await getCityWeather(coordinates.latitude, coordinates.longitude);
  const currentCityName = await getLocationNameFromCoordinates(coordinates.latitude, coordinates.longitude);
  return `<weather-card
            name="${currentCityName}"
            temperature="${currentCityWeather.temperature}"
            humidity="${currentCityWeather.humidity}"
            weather-code="${currentCityWeather.weatherCode}"
           ></weather-card>`;
}

const createTopCitiesWeatherCards = () => {
  return italyTopCitiesWeather.map(topCityWeather =>
    `<weather-card
        name="${topCityWeather.name}"
        temperature="${topCityWeather.temperature}"
        humidity="${topCityWeather.humidity}"
        weather-code="${topCityWeather.weatherCode}"
     ></weather-card>`).join('');
}

const coordinatesEventPromise = new Promise((resolve, reject) => {
  document.addEventListener(CoordinatesInitEvent, () => resolve(CoordinatesInitEvent));
});

const topCitiesEventPromise = new Promise((resolve, reject) => {
  document.addEventListener(TopCitiesEventKey, () => resolve(TopCitiesEventKey));
})

const appBoostrap = () => {
  initCoordinates();
  initWeatherApi();

  Promise.all([coordinatesEventPromise, topCitiesEventPromise])
    .then((_) => renderApp())

}

document.addEventListener('DOMContentLoaded', appBoostrap);


