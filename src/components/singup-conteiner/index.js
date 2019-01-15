/**
 * A form responsable to create new accounts, this is a reusable webcomponent 
 * @tag <singup-container><singup-container>
 */
export default class NewAccountContainer extends HTMLElement {

  constructor() {
    super();
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
    console.log({ value });

  }

  get formEl() {
    return this.shadowRoot.querySelector('#js-form');
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

        <div class="signup__form-block">
          <singup-form id="js-form"></singup-form>
        </div>
        
        <div class="signup__feedback">
          <singup-feedback id="js-feedback"></singup-feedback>
        </div>

      </div>
    `;
    return template;
  }
}

window.customElements.define('singup-container', NewAccountContainer);
