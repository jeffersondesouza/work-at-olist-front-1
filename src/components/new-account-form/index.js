import formHelper from '../../utils/form-helper';
import {
  isValidForm,
  requiredValidator,
  emailValidator,
  minLengthValidator,
  characterValidator,
  numberValidator,
  matchConfirmationValidator
} from '../../utils/form-validator';

/**
 * A form responsable to create new accounts, this is a reusable webcomponent 
 * @tag <new-account-form><new-account-form>
 */
export default class NewAccountForm extends HTMLElement {

  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.formSubmited = false;
    this.formValue = {};
    this.confirPasswordError = false;

  }

  get value() {
    return JSON.parse(this.getAttribute('value'));
  }

  set value(newValue) {
    this.setAttribute('value', JSON.stringify(newValue));
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

  /**
   * @param @override 
   */
  attributeChangedCallback(name, oldValue, newValue) {
  }


  initValueState() {
    if (!this.value) {

      this.formValue = {
        name: formHelper.buildParam({
          value: '',
          validators: { required: requiredValidator }
        }),
        email: formHelper.buildParam({
          value: '',
          validators: { required: requiredValidator, email: emailValidator }
        }),
        password: formHelper.buildParam({
          value: '',
          validators: { required: requiredValidator, minLength: minLengthValidator(6), character: characterValidator, number: numberValidator, }
        }),
        confirmPassword: formHelper.buildParam({
          value: '',
          validators: { required: requiredValidator }
        })
      };

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
      .addEventListener('keyup', this.onInputChange, true);

    this.shadowRoot.querySelector('#jsEmail')
      .addEventListener('keyup', this.onInputChange, true);

    this.shadowRoot.querySelector('#jsPassword')
      .addEventListener('keyup', this.onInputChange, true);

    this.shadowRoot.querySelector('#jsConfirmPassword')
      .addEventListener('keyup', this.onInputChange, true);

  }

  onInputChange({ target }) {
    const { value, name } = target;

    this.formValue = formHelper.updateForm(this.formValue, name, value);

    if (name.toLowerCase() === 'confirmPassword'.toLowerCase()) {
      this.validateConfirmPassword()
    }

    if (isValidForm(this.formValue)) {
      this.submitButton.disabled = false;
    } else {
      this.submitButton.disabled = true;
    }
  }

  onSubmit(e) {
    e.preventDefault();

    console.log('formValue: ', this.formValue);
    // setAttrbute value = this.formValue
  }



  validateConfirmPassword() {
    const macthError = matchConfirmationValidator(
      this.formValue.confirmPassword.value,
      this.formValue.password.value
    );

    this.formValue.confirmPassword.errors.matchConfirmation = macthError;
    this.formValue.confirmPassword.valid = this.formValue.confirmPassword.valid && !macthError;

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
          <input name="confirmPassword" id="jsConfirmPassword" type="password"/>
          <input-feedback><input-feedback>
        </div>
        <button disabled id="jsSubmit">Criar conta</buttom>
        </form>
    `;

    return template;
  }
}

window.customElements.define('new-account-form', NewAccountForm);
