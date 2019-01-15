export default class SignupFeedback extends HTMLElement {

  connectedCallback() {
    let shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = this.template;
  }

  get style() {
    return `
      <style>

      </style>
    `;
  }

  get template() {
    return `
      ${this.style}
      <div>
      Bem vindo
      </div>
    `;
  }
}

window.customElements.define('new-account-feedback', SignupFeedback);