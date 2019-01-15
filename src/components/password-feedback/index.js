export default class PasswordFeedback extends HTMLElement {

  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['lengtherror', 'capitalcaseerror', 'numbererror'];
  }

  connectedCallback() {
    this.initShadowDom();
  }

  initShadowDom() {
    let shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = this.template;
  }

  attributeChangedCallback(name, oldValue, newValue) {

    if (this.shadowRoot) {
      this.setErrosFeedBack(name, oldValue, newValue);
    }
  }

  setErrosFeedBack(name, oldValue, hasError) {

    if (name !== 'errors') {
      this.feedbackElements[name].setAttribute('valid', !JSON.parse(hasError))
    }

    if (JSON.parse(hasError) === true) {
      this.feedbackElements[name].classList.add('feeback-error');
      this.feedbackElements[name].classList.remove('feeback-success');
    } else {
      this.feedbackElements[name].classList.add('feeback-success');
      this.feedbackElements[name].classList.remove('feeback-error');
    }

    this.feedbackElements.errors.setAttribute('total', this.feedbackElements.feebackSuccess.length);



  }

  get lengtherror() {
    return this.getAttribute('lengtherror');
  }

  get capitalcaseerror() {
    return this.getAttribute('capitalcaseerror');
  }

  get numbererror() {
    return this.getAttribute('numbererror');
  }

  set lengtherror(value) {
    this.setAttribute('lengtherror', value);
  }

  set capitalcaseerror(value) {
    this.setAttribute('capitalcaseerror', value);
  }

  set numbererror(value) {
    this.setAttribute('numbererror', value);
  }

  get feedbackElements() {
    return {
      errors: this.shadowRoot.getElementById('js-errors'),
      lengtherror: this.shadowRoot.getElementById('js-lengtherror'),
      capitalcaseerror: this.shadowRoot.getElementById('js-capitalcaseerror'),
      numbererror: this.shadowRoot.getElementById('js-numbererror'),
      feebackSuccess: this.shadowRoot.querySelectorAll('.feeback-success'),
    }
  }

  get template() {
    return `
      <div>
        <password-strength id="js-errors"></password-strength>

        <input-feedback id="js-lengtherror" showstatus="true" value="Pelo menos 6 caracteres"></input-feedback>

        <input-feedback id="js-capitalcaseerror" showstatus="true" value="Pelo menos 1 letra maiúscula"></input-feedback>     

        <input-feedback id="js-numbererror" showstatus="true" value="Pelo menos 1 número"></input-feedback>
      </div>
    `;
  }
}

window.customElements.define('password-feedback', PasswordFeedback);