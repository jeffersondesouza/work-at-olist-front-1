import styleHelper from '../../utils/style-helper';

/**
 * @tag <password-strength><password-strength>
 */
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
    this.setErrosCounterClass(name, +newValue);
  }

  setErrosCounterClass(name, total) {
    if (this.shadowRoot && name === 'total') {

      Array.from(this.errosEl).map((element, i) => {
        const index = i + 1;

        if (total >= index) {
          element.classList.add(`counter__bar--${total}`);
        }

        if (total < 3) {
          element.classList.remove(`counter__bar--3`);
        }

        if (total < 2) {
          element.classList.remove(`counter__bar--2`);
        }

        if (total < 1) {
          element.classList.remove(`counter__bar--1`);
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
    return `
      <style>
          .counter{
            display:flex;
            padding: .8rem 0 1.6rem;
          }

          .counter__bar{
            width: 119.67px;
            height: 8px;
            background-color: ${styleHelper.constants.grayColor};
            border-radius: 1rem;
          }

          .counter__bar:not(:last-child){
            margin-right:.5rem;
          }

          .counter__bar--0{
            background-color: ${styleHelper.constants.grayColor};
          }

          .counter__bar--1{
            background-color: ${styleHelper.constants.errorColor};
          }

          .counter__bar--2{
            background-color: ${styleHelper.constants.warningColor};
          }

          .counter__bar--3{
            background-color: ${styleHelper.constants.successColor};
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

window.customElements.define('password-strength', PasswordErrorsCounter);