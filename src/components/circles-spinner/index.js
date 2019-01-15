import styleHelper from '../../utils/style-helper';

/**
 * @tag <circles-spinner><circles-spinner>
 */
export default class CirclesSppiner extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    this.initShadowDom();
  }

  initShadowDom() {
    let shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = this.template;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.setErrosCounterClass(name, +newValue);
  }

  get style() {
    return `
      <style>
      </style>
    `
  }

  get template() {
    return `
    ${this.style}
      <div id="js-counter" class="counter">
          XXX
      </div>
    `;
  }
}

window.customElements.define('circles-spinner', CirclesSppiner);