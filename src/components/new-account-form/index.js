//  import '../my-counter';

/**
 * A form responsable to create new accounts, this is a reusable webcomponent 
 * @tag <new-account-form><new-account-form>
 */
class NewAccountForm extends HTMLElement {

  constructor() {
    super();
  }

  get value() {
    return this.getAttribute('value');
  }

  get min() {
    return this.getAttribute('min');
  }

  get max() {
    return this.getAttribute('max');
  }

  set value(newValue) {
    this.setAttribute('value', newValue);
  }

  set step(newValue) {
    this.setAttribute('step', newValue);
  }

  set min(newValue) {
    this.setAttribute('min', newValue);
  }

  set max(newValue) {
    this.setAttribute('max', newValue);
  }

  static get observedAttributes() {
    return ['value'];
  }
  
  /**
   * @override
   */
  connectedCallback() {
    this.initShadowDom();
    this.addEventListeners();
  }

  initShadowDom() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(this.template.content.cloneNode(true));
  }

  addEventListeners() {

  }


  increment() {
    const step = +this.step || 1;
    const newValue = +this.value + step;

    if (this.max) {
      this.value = (newValue > +this.max)
        ? +this.max
        : +newValue;
    } else {
      this.value = +newValue;
    }

    this.dispatchEvent(new CustomEvent('onincrement', {
      detail: this.value
    }));
  }

  decrement() {
    const step = +this.step || 1;
    const newValue = +this.value - step;

    if (this.min) {
      this.value = (newValue <= +this.min)
        ? +this.min
        : + newValue;
    } else {
      this.value = +newValue;
    }
  }

 

  attributeChangedCallback(name, oldValue, newValue) {
    this.displayVal.innerHTML = this.value;
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
          <input id="js-name" />
          <input-feedback value="Error msg"><input-feedback>
        </div>

        <div class="form__group">
          <label>E-mail</label>
          <input id="js-email" />
          <input-feedback><input-feedback>
        </div>

        <div class="form__group">
          <label>Senha</label>
          <input id="js-password" type="password" />
          <password-feedback><password-feedback>
        </div>
       
        <div class="form__group">
          <label>E-mail</label>
          <input id="js-name" />
          <input-feedback><input-feedback>
        </div>
        <input id="js-confirm-password" type="password" />
        <div class="ok">
        </div>
        <button disabled id="js-submit">Criar conta</buttom>
        </form>

    `;

    return template;
  }
}

window.customElements.define('new-account-form', NewAccountForm);
