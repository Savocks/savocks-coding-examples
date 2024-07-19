import css from './weather-card.css';
import weatherIconsCss from './weather-icons.css';
import {getIcon} from './utils/icon-mapper';

export class WeatherCard extends HTMLElement {
  constructor() {
    super();
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(`${css} ${weatherIconsCss}`);
    this.attachShadow({mode: 'open'});
    this.shadowRoot.adoptedStyleSheets = [sheet];
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const name = this.getAttribute('name');
    const temperature = this.getAttribute('temperature');
    const humidity = this.getAttribute('humidity');
    const weatherCode = this.getAttribute('weather-code');
    const icon = getIcon(weatherCode);

    this.shadowRoot.innerHTML = `
      <div class="weather-card">
        ${name ? `<h2 class="weather-location">${name}</h2>` : ''}
        <p class="weather-temperature">${temperature}</p>
        <p class="weather-description"></p>
        <i class="weather-icon ${icon}"></i>
      </div>
    `;
  }
}

customElements.define('weather-card', WeatherCard);

