class InputFeedback extends HTMLElement {

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
    console.log({ name, oldValue, newValue });
  }

  get value() {
    return this.getAttribute('value');
  }

  set value(newValue) {
    this.setAttribute('value', newValue);
  }

  get feedback() {
    return this.shadowRoot.querySelector('#input-feedback');
  }

  set feedback(msg) {
    return this.feedback.innerHTML = msg || '';
  }

  get template() {
    return `
      <div id="input-feedback" class="input-feedback">
          Error
      </div>
    `;
  }
}

customElements.define('input-feedback', InputFeedback);