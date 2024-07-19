import css from './weather-card.css';

export class WeatherCard extends HTMLElement {
  constructor() {
    super();
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(`${css}`);
    this.attachShadow({mode: 'open'});
    this.shadowRoot.adoptedStyleSheets = [sheet];
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const name = this.getAttribute('name');
    const temperature = this.getAttribute('temperature');
    const weatherCode = this.getAttribute('weather-code');

    this.shadowRoot.innerHTML = `
      <div class="weather-card">
        ${name ? `<h2 class="weather-location">${name}</h2>` : ''}
        <p class="weather-temperature">${temperature}</p>
        <p class="weather-description"></p>
        <weather-icon weather-code="${weatherCode}"></weather-icon>
      </div>
    `;
  }
}

customElements.define('weather-card', WeatherCard);

