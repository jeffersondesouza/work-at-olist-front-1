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

  get name() {
    return this.shadowRoot.querySelector('#jsName');
  }

  get email() {
    return this.shadowRoot.querySelector('#jsEmail');
  }

  get password() {
    return this.shadowRoot.querySelector('#jsPassword');
  }

  get confirmPassword() {
    return this.shadowRoot.querySelector('#jsConfirmPassword');
  }

  get feedbackTemplateElements() {
    return {
      nameRequired: this.shadowRoot.querySelector('#jsName-required'),
      emailRequired: this.shadowRoot.querySelector('#jsEmail-required'),
      emailFormat: this.shadowRoot.querySelector('#jsEmail-email'),
      passwordRequired: this.shadowRoot.querySelector('#jsPassword-required'),
      passwordMin: this.shadowRoot.querySelector('#jsPassword-min'),
      passwordNumber: this.shadowRoot.querySelector('#jsPassword-number'),
      passwordChar: this.shadowRoot.querySelector('#jsPassword-char'),
      confirmPasswordRequired: this.shadowRoot.querySelector('#jsConfirmPassword-required'),
      confirmPasswordMatch: this.shadowRoot.querySelector('#jsConfirmPassword-match'),
    }
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
    this.name.addEventListener('keyup', this.onInputChange, true);
    this.email.addEventListener('keyup', this.onInputChange, true);
    this.password.addEventListener('keyup', this.onInputChange, true);
    this.confirmPassword.addEventListener('keyup', this.onInputChange, true);

    this.email.addEventListener('blur', () => {
      this.feedbackTemplateElements.emailRequired.setAttribute(
        'value',
        (this.formValue.email.errors.email) ? 'Informe um email em formato válido (ex: exemplo@email.com)' : ''
      );
    });

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
    if (isValidForm(this.formValue)) {
      console.log('formValue: ', this.formValue);
    }

    console.log('formValue: ', this.formValue);

    this.feedbackTemplateElements.nameRequired.setAttribute(
      'value',
      (this.formValue.name.errors.required) ? 'Por favor informe seu nome' : ''
    );



    this.feedbackTemplateElements.emailRequired.setAttribute(
      'value',
      (this.formValue.email.errors.required) ? 'Por favor informe seu email' : ''
    );

    this.feedbackTemplateElements.confirmPasswordRequired.setAttribute(
      'value',
      (this.formValue.confirmPassword.errors.required) ? 'Por favor, confrime sua senha' : ''
    );




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
    this.name.removeEventListener('keyup', this.onInputChange);
    this.email.removeEventListener('keyup', this.onInputChange);
    this.password.removeEventListener('keyup', this.onInputChange);
    this.confirmPassword.removeEventListener('keyup', this.onInputChange);
  }

  get template() {
    const template = document.createElement('template');

    template.innerHTML = `
      <form class="form">  

        <div class="form__group">
          <label>Nome completo</label>
          <input name="name" id="jsName" />
          <input-feedback id="jsName-required" value=''><input-feedback>
        </div>

        <div class="form__group">
          <label>E-mail</label>
          <input name="email" id="jsEmail" />
          <div>
           <input-feedback id="jsEmail-required" value="Por favor informe seu nome"><input-feedback>
          </div>
        </div>

        <div class="form__group">
          <label>Senha</label>
          <input name="password" id="jsPassword" type="password" />
          <password-feedback></password-feedback>
        </div>
        
        <div class="form__group">
          <label>Confirme sua senha</label>
          <input id="jsConfirmPassword" name="confirmPassword" type="password"/>
          <div>
            <input-feedback id="jsConfirmPassword-required" value="Por favor, confirme sua Senha"><input-feedback>
          </div>
        </div>
  
        <div>
          <button id="jsSubmit">Criar conta</buttom>
        <div>
        </form>
    `;

    return template;
  }
}

window.customElements.define('new-account-form', NewAccountForm);
