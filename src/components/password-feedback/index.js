export default class PasswordFeedback extends HTMLElement {

  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['value'];
  }

  connectedCallback() {
    this.initShadowDom();
    this.feedback = this.value;

  }

  initShadowDom() {
    let shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = this.template;
  }

  attributeChangedCallback(name, oldValue, newValue) {
  }

  get template() {
    return `
      <div id="password-feedback" class="input-feedback">
        <div>
        <input-feedback id="jsPassword-min" value="Pelo menos 6 caracteres"><input-feedback>
        </div>
        <div>
          <input-feedback id="jsPassword-number" value="Pelo menos uma letra maiúscula"><input-feedback>
        </div>
        <div>
          <input-feedback id="jsPassword-char" value="Pelo menos um numero"><input-feedback>
        </div>
      </div>
    `;
  }
}

window.customElements.define('password-feedback', PasswordFeedback);