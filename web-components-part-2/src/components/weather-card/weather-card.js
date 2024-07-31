export class WeatherCard extends HTMLElement {
  constructor() {
    super();
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(`
    .weather-card {
      color: #FFF;
      max-width: 400px;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 15px 0 rgba(0,0,0,0.5);
      text-align: center;
      background: rgb(12,55,170);
      background: linear-gradient(315deg, rgba(12,55,170,1) 0%, rgba(0,212,255,1) 100%);
      backdrop-filter: blur(10px);
      position: relative;
      overflow: hidden;
      z-index: 10;
    }

    .weather-location {
      margin: 2.5em 0 0 0;
      font-size: 2em;
      font-weight: bold;
    }

    .weather-temperature {
      color: #FFF;
      font-size: 1.5em;
      margin: 20px 0;
    }

    .weather-description {
      font-size: 1em;
      color: #FFF;
    }`);
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

