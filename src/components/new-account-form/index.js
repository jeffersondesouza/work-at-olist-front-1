//  import '../my-counter';

/**
 * A form responsable to create new accounts, this is a reusable webcomponent 
 * @tag <new-account-form><new-account-form>
 */
export default class NewAccountForm extends HTMLElement {

  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  get value() {
    return this.getAttribute('value')
  }

  get email() {
    this.shadowRoot.querySelector('#jsEmail');
  }

  set value(newValue) {
    this.setAttribute('value', newValue);
  }

  set step(newValue) {
    this.setAttribute('step', newValue);
  }


  static get observedAttributes() {
    return ['value'];
  }

  /**
   * @override
   */
  connectedCallback() {
    this.initShadowDom();
    this.initState();
    this.addSubmitListeners();
    this.addBlurListeners();
  }

  initState() {

    if (!this.value) {
      this.setAttribute('value', JSON.stringify({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      }));
    }
  }

  initShadowDom() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(this.template.content.cloneNode(true));
  }

  addSubmitListeners() {

    this.shadowRoot.querySelector('form')
      .addEventListener('submit', this.onSubmit);
  }



  addBlurListeners() {
    this.shadowRoot.querySelector('#jsName')
      .addEventListener('blur', (e) => {
        console.log(e.target.value, e.target.name);
      });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log('submit', { value: JSON.parse(this.value) });

  }



  attributeChangedCallback(name, oldValue, newValue) {
    console.log({ name, oldValue, newValue });

  }




  disconnectedCallback() {
    this.incrementBtn.removeEventListener('click', this.increment);
    this.decrementBtn.removeEventListener('click', this.decrement);
  }

  get template() {
    const template = document.createElement('template');

    template.innerHTML = `
      <form class="form">  

        <div class="form__group">
          <label>Nome completo</label>
          <input name="name" id="jsName" />
          <input-feedback id="feedback1" value="Error msg"><input-feedback>
        </div>

        <div class="form__group">
          <label>E-mail</label>
          <input name="email" id="jsEmail" />
          <input-feedback><input-feedback>
        </div>

        <div class="form__group">
          <label>Senha</label>
          <input name="password" id="jsPassword" type="password" />
          <password-feedback><password-feedback>
        </div>
       
        <div class="form__group">
          <label>Confirme sua senha</label>
          <input name="confirmPassword" id="jsConfirmPassword" />
          <input-feedback><input-feedback>
        </div>
        <button  id="js-submit">Criar conta</buttom>
        </form>
    `;

    return template;
  }
}

window.customElements.define('new-account-form', NewAccountForm);
