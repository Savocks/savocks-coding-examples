import {getIcon} from './utils/icon-mapper';
import css from './weather-icon.css';
import weatherIconsCss from './vendor/weather-icons.css';

export class WeatherIcon extends HTMLElement {
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
    const weatherCode = this.getAttribute('weather-code');
    const icon = getIcon(weatherCode);
    this.shadowRoot.innerHTML = `<i class="weather-icon ${icon}"></i>`;
  }
}

customElements.define('weather-icon', WeatherIcon);
