import {getIcon} from './utils/icon-mapper';
import icons from './vendor/remixicon.symbol.svg';

export class WeatherIcon extends HTMLElement {
  constructor() {
    super();
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(`
    .icon {
      height: 90px;
      width: 90px;
      position: absolute;
      top: 0;
      left: 0;
      fill: #FFF;
    }
    `);
    this.attachShadow({mode: 'open'});
    this.shadowRoot.adoptedStyleSheets = [sheet];
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const weatherCode = this.getAttribute('weather-code');
    const icon = getIcon(weatherCode);
    this.shadowRoot.innerHTML = `
      <svg class="icon">
        <use xlink:href="${icons}#${icon}"></use>
      </svg>
    `;
  }
}

customElements.define('weather-icon', WeatherIcon);
