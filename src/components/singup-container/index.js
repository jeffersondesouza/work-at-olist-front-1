import styleHelper from '../../utils/style-helper';

/**
 * @tag <singup-container><singup-container>
 */
export default class SignUpContainer extends HTMLElement {

  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @override
   */
  connectedCallback() {
    this.initShadowDom();
    this.addSubmitListeners();
  }

  /**
   * @override
   */
  disconnectedCallback() {
    this.nameEl.removeEventListener('keyup', this.onInputChange);
  }

  initShadowDom() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(this.template.content.cloneNode(true));
  }

  addSubmitListeners() {
    this.formEl.addEventListener('onsubmit', this.onSubmit);
  }

  onSubmit(value) {
    setTimeout(() => {
      console.log({ value });
      this.formEl.hidden = true;
      this.feedbackEl.hidden = false;
    }, 2000);

  }

  get formEl() {
    return this.shadowRoot.querySelector('#js-form');
  }

  get feedbackEl() {
    return this.shadowRoot.querySelector('#js-feedback');
  }

  get style() {

    return `
      <style>
        h1, h2{
          margin:0
        }

        .signup{
          background-color:${styleHelper.constants.whiteColor};
          width: 515px;
          height: 740px;
          border: 3px solid #F2F2F2;
          box-sizing: border-box;
          padding: 6rem 7rem 4.8rem;

          ${styleHelper.mixins.absCenter};
        }

        .signup__title{
          margin-bottom:2.4rem;
          text-align: center;
        }
        .signup__sub-title{
          line-height: 3px;
          text-aling:center;
          font-size: 2.2rem;
          margin-bottom:3.7rem;
        }

      </style>
    `
  }

  get template() {
    const template = document.createElement('template');

    template.innerHTML = `
      ${this.style}
      <div class="signup">      
        <header>  
          <h1 class="signup__title"><logo-type></logo-type></h1>
          <h2 class="signup__sub-title">Crie sua Conta</h2>
        </header>  

        <div class="signup__body">
          <singup-form id="js-form"></singup-form>
          <singup-feedback hidden id="js-feedback"></singup-feedback>
        </div>
        

      </div>
    `;
    return template;
  }
}

window.customElements.define('singup-container', SignUpContainer);
