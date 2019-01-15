export default class PasswordErrorsCounter extends HTMLElement {

  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['total'];
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
      this.feedback = newValue;
    }
  }

  get total() {
    return this.getAttribute('total');
  }

  set total(newValue) {
    this.setAttribute('total', newValue);
  }

  get style() {
    return `
      <style>
          .counter{
            display:flex;
          }

          .counter__bar{
            width: 119.67px;
            height: 8px;
            background-color: #EAEAF4;
            border-radius: 1rem;
          }
          
          .counter__bar:not(:last-child){
            margin-right:.5rem;
          }


      </style>
    `
  }
  
  get template() {
    return `
    ${this.style}

      <div class="counter">
          <div class="counter__bar"></div>
          <div class="counter__bar"></div>
          <div class="counter__bar"></div>
      </div>
    `;
  }
}

window.customElements.define('password-errors-counter', PasswordErrorsCounter);