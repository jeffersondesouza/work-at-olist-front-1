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
    if (JSON.parse(hasError) === true) {
      this.feedbackElements[name].classList.add('feeback-error');
      this.feedbackElements[name].classList.remove('feeback-success');
    }else{
      this.feedbackElements[name].classList.add('feeback-success');
      this.feedbackElements[name].classList.remove('feeback-error');
    }
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
    }
  }

  get style() {
    return `
      <style>
          .feeback-success{
            background-color:green;
          }
          .feeback-error{
            background-color:red;
          }
      </style>
    `
  }

  get template() {
    return `
      ${this.style}
      <div>
        <password-errors-counter id="js-errors"></password-errors-counter>
        
        <div id="js-lengtherror">6</div> 
        <div id="js-capitalcaseerror">1m</div> 
        <div id="js-numbererror">1n</div> 
      </div>
    `;
  }
}

window.customElements.define('password-feedback', PasswordFeedback);