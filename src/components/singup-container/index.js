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

    // error - #F79682
    // warning - #F7BC1C
    // success - #1FE6A8

    return `
      <style>
      .border--error{
         border: none;
         border: 2px solid #F79682;
       }

       .border--success{
          border: none;
          border: 2px solid #1FE6A8;
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
          <h1>Work at Olist</h1>
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
