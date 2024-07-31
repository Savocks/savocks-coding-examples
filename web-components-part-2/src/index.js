import './components/weather-card/weather-card';
import './components/header/header';
import './components/weather-icon/weather-icon';
import './components/weather/weather';
import {
  CoordinatesInitEvent,
  initCoordinates
} from './utils/geolocalization';
import {initWeatherApi, TopCitiesEventKey} from './api/weather';
import '../public/styles.css';


let root = null;

const renderApp = async () => {
  root = document.getElementById('root');
  root.innerHTML = `
    <app-header></app-header>
    <main class="container">
        <weather-app></weather-app>
    </main>
  `;
}

const coordinatesEventPromise = new Promise((resolve) => {
  document.addEventListener(CoordinatesInitEvent, () => resolve(CoordinatesInitEvent));
});

const topCitiesEventPromise = new Promise((resolve) => {
  document.addEventListener(TopCitiesEventKey, () => resolve(TopCitiesEventKey));
})

const appBoostrap = () => {
  initCoordinates();
  initWeatherApi();

  Promise.all([coordinatesEventPromise, topCitiesEventPromise])
    .then((_) => renderApp())

}

document.addEventListener('DOMContentLoaded', appBoostrap);


