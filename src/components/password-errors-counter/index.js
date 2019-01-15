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
    this.setErrosCounterClass(name, newValue);
  }

  setErrosCounterClass(name, total) {
    if (this.shadowRoot && name === 'total') {

      Array.from(this.errosEl).map((element, index) => {

        if (+total >= (index+1)) {
          element.classList.add(`counter__bar--${total}`);
        }

      })
    }
  }

  get total() {
    return this.getAttribute('total');
  }

  set total(newValue) {
    this.setAttribute('total', newValue);
  }

  get errosEl() {
    return this.shadowRoot.querySelectorAll('.counter__bar');
  }


  get style() {

    // error - #F79682
    // warning - #F7BC1C
    // success - #1FE6A8

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

          .counter__bar--1{
            background-color: #F79682;
          }

          .counter__bar--2{
            background-color: #F7BC1C;
          }

          .counter__bar--3{
            background-color: #1FE6A8;
          }

      </style>
    `
  }

  get template() {
    return `
    ${this.style}

      <div id="js-counter" class="counter">
          <div class="counter__bar"></div>
          <div class="counter__bar"></div>
          <div class="counter__bar"></div>
      </div>
    `;
  }
}

window.customElements.define('password-errors-counter', PasswordErrorsCounter);