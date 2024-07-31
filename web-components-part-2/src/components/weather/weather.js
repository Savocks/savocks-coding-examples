import {getCityWeather, italyTopCitiesWeather} from '../../api/weather';
import {coordinates, getLocationNameFromCoordinates} from '../../utils/geolocalization';

export class Weather extends HTMLElement {
  constructor() {
    super();
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(`
    .weather-cards-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 3em;
    }`);
    this.attachShadow({mode: 'open'});
    this.shadowRoot.adoptedStyleSheets = [sheet];
  }

  async connectedCallback() {
    await this.render();
  }

  async getCurrentLocationWeather() {
    const currentCityWeather = await getCityWeather(coordinates.latitude, coordinates.longitude);
    const currentCityName = await getLocationNameFromCoordinates(coordinates.latitude, coordinates.longitude);
    return [currentCityName, currentCityWeather];
  }

  async render() {
    const currentLocationWeatherElement = await this.createCurrentLocationWeatherElement();
    const topCitiesWeatherElement = await this.createTopCitiesWeatherElement();
    this.shadowRoot.innerHTML = `
      <div>
        <h2 class="m-y-2" >Current Location</h2>
        ${currentLocationWeatherElement}
        <h2 class="m-y-2">Italy's top cities</h2>
        <div class="weather-cards-container">
          ${topCitiesWeatherElement}
        </div>
      </div>
    `;
  }

  async createCurrentLocationWeatherElement() {
    const [currentLocationName, currentLocationWeather] = await this.getCurrentLocationWeather();
    return `<weather-card
            name="${currentLocationName}"
            temperature="${currentLocationWeather.temperature}"
            humidity="${currentLocationWeather.humidity}"
            weather-code="${currentLocationWeather.weatherCode}"
           ></weather-card>`;
  }

  async createTopCitiesWeatherElement() {
    return italyTopCitiesWeather.map(topCityWeather =>
      `<weather-card
        name="${topCityWeather.name}"
        temperature="${topCityWeather.temperature}"
        humidity="${topCityWeather.humidity}"
        weather-code="${topCityWeather.weatherCode}"
     ></weather-card>`).join('');
  }
}

customElements.define('weather-app', Weather);
