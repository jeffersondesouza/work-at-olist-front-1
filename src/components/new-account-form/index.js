import formHelper from '../../utils/form-helper';
import { isValidForm } from '../../utils/form-validator';

/**
 * A form responsable to create new accounts, this is a reusable webcomponent 
 * @tag <new-account-form><new-account-form>
 */
export default class NewAccountForm extends HTMLElement {

  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.formSubmited = false;
  }

  get value() {
    return JSON.parse(this.getAttribute('value'));
  }

  set value(newValue) {
    this.setAttribute('value', JSON.stringify(newValue));
  }

  setValue(newValue) {
    this.value = {
      ...this.value,
      ...newValue
    }
  }

  get submitButton() {
    return this.shadowRoot.querySelector('#jsSubmit');
  }

  static get observedAttributes() {
    return ['value'];
  }

  /**
   * @override
   */
  connectedCallback() {
    this.initShadowDom();
    this.initValueState();
    this.addSubmitListeners();
    this.addBlurListeners();
  }

  initValueState() {
    if (!this.value) {

      const value = JSON.stringify({
        name: formHelper.buildParam({ valid: false }),
        email: formHelper.buildParam({ valid: false }),
        password: formHelper.buildParam({ valid: false }),
        confirmPassword: formHelper.buildParam({ valid: false })
      });

      this.setAttribute('value', value);
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


  updateFormValueParam(key, value){
    this.value = {
      ...this.value,
      [key]: formHelper.updateParam(this.value.key, value)
    }
  }

  addBlurListeners() {
    this.shadowRoot.querySelector('#jsName')
      .addEventListener('blur', (e) => {

        console.log(e.target.value, e.target.name);
        this.updateFormValueParam('name', e.target.value);

        if (isValidForm(this.value)) {
          this.submitButton.disabled = false;
        }

      });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log('submit', { value: this.value });

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
        <button disabled id="jsSubmit">Criar conta</buttom>
        </form>
    `;

    return template;
  }
}

window.customElements.define('new-account-form', NewAccountForm);
