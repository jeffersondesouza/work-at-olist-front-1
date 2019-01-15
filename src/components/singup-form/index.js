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
 * @tag <singup-form><singup-form>
 */
export default class NewAccountForm extends HTMLElement {

  constructor() {
    super();
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.formSubmited = false;
    this.formValue = {};
    this.confirPasswordError = false;

    this.handleNameChanges = this.handleNameChanges.bind(this);
    this.handleEmailChanges = this.handleEmailChanges.bind(this);
    this.handlePasswordChanges = this.handlePasswordChanges.bind(this);
    this.handleConfirmPasswordChanges = this.handleConfirmPasswordChanges.bind(this);
  }

  /**
   * @override
   */
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
    this.addChangesListeners();
  }

  /**
   * @override
   */
  disconnectedCallback() {
    this.nameEl.removeEventListener('keyup', this.onInputChange);
    this.emailEl.removeEventListener('keyup', this.onInputChange);
    this.passwordEl.removeEventListener('keyup', this.onInputChange);
    this.confirmPasswordEl.removeEventListener('keyup', this.onInputChange);
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

  addChangesListeners() {
    this.nameEl.addEventListener('blur', this.handleNameChanges, true);

    this.emailEl.addEventListener('blur', this.handleEmailChanges, true);

    this.passwordEl.addEventListener('keyup', this.handlePasswordChanges, true);
    this.passwordEl.addEventListener('blur', this.handlePasswordChanges, true);

    this.confirmPasswordEl.addEventListener('keyup', this.handleConfirmPasswordChanges, true);
    this.confirmPasswordEl.addEventListener('blur', this.handleConfirmPasswordChanges, true);
  }

  handleNameChanges(event) {
    this.onInputChange(event);
    this.renderInputValidation(this.formValue.name, this.nameEl);
  }

  handleEmailChanges(event) {
    this.onInputChange(event);
    this.renderInputValidation(this.formValue.email, this.emailEl);
  }

  handlePasswordChanges(event) {
    this.onInputChange(event);

    this.passwordFeedback.setAttribute('lengtherror', this.formValue.password.errors.minLength);
    this.passwordFeedback.setAttribute('capitalcaseerror', this.formValue.password.errors.character);
    this.passwordFeedback.setAttribute('numbererror', this.formValue.password.errors.number);

    this.renderInputValidation(this.formValue.password, this.passwordEl);
  }

  handleConfirmPasswordChanges(event) {
    this.onInputChange(event);
    const macthError = matchConfirmationValidator(
      this.formValue.confirmPassword.value,
      this.formValue.password.value
    );

    this.formValue.confirmPassword.errors.matchConfirmation = macthError;
    this.formValue.confirmPassword.valid = this.formValue.confirmPassword.valid && !macthError;

    this.renderInputValidation(this.formValue.confirmPassword, this.confirmPasswordEl);
  }

  renderInputValidation(formValueParam, domEl) {
    if (formValueParam.valid) {
      domEl.classList.add('border--success');
      domEl.classList.remove('border--error');
    } else {
      domEl.classList.add('border--error');
      domEl.classList.remove('border--success');
    }
  }


  onInputChange({ target }) {
    const { value, name } = target;

    this.formValue = formHelper.updateForm(this.formValue, name, value);

    if (isValidForm(this.formValue)) {
      this.submitButton.disabled = false;
    } else {
      this.submitButton.disabled = true;
    }

  }

  onSubmit(e) {
    e.preventDefault();

    this.dispatchEvent(new CustomEvent('onsubmit', {
      detail: formHelper.getFormValue(this.formValue),
    }));

    if (isValidForm(this.formValue)) {

      this.dispatchEvent(new CustomEvent('onsubmit', {
        detail: formHelper.getFormValue(this.formValue),
      }));

      this.submitButton.appendChild(document.createElement('circles-spinner'));
      this.submitButton.disabled = true;

    }
  }

  get value() {
    return JSON.parse(this.getAttribute('value'));
  }

  set value(newValue) {
    this.setAttribute('value', JSON.stringify(newValue));
  }

  get submitButton() {
    return this.shadowRoot.querySelector('#js-submit');
  }

  get nameEl() {
    return this.shadowRoot.querySelector('#js-name');
  }

  get emailEl() {
    return this.shadowRoot.querySelector('#js-email');
  }

  get passwordEl() {
    return this.shadowRoot.querySelector('#js-password');
  }

  get confirmPasswordEl() {
    return this.shadowRoot.querySelector('#js-confirm-password');
  }

  get passwordFeedback() {
    return this.shadowRoot.querySelector('#js-password-feedback');
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
      <form class="form">  
    
        <div class="form__group">
          <label>Nome completo</label>
          <input name="name" id="js-name" />
        </div>

        <div class="form__group">
          <label>E-mail</label>
          <input name="email" id="js-email" />
        </div>

        <div class="form__group">
          <label>Senha</label>
          <input name="password" id="js-password" type="password" />
          <password-feedback id="js-password-feedback" min="6" minCaptals="1" max="2"></password-feedback>
        </div>
        
        <div class="form__group">
          <label>Confirme sua senha</label>
          <input id="js-confirm-password" name="confirmPassword" type="password"/>
        </div>
  
        <div>
          <button disabled id="js-submit">Criar conta</buttom>
        <div>
        </form>
    `;
    return template;
  }
}

window.customElements.define('singup-form', NewAccountForm);
