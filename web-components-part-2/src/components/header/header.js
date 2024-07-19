import css from './header.css';

export class Header extends HTMLElement {
  constructor() {
    super();
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(css);
    this.attachShadow({mode: 'open'});
    this.shadowRoot.adoptedStyleSheets = [sheet];
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <header class="header">
        <h1>Italy's Top City Weather</h1>
      </header>
    `;
  }
}

customElements.define('app-header', Header);

