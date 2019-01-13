
/**
 * A form responsable to create new accounts, this is a reusable webcomponent 
 * @tag <new-account-form><new-account-form>
 */

export default class NewAccountForm extends HTMLElement {
  constructor() {
    super();
  }

  onInit() {

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(this.template.content.cloneNode(true));


    this.incrementBtn = this.shadowRoot.querySelector('[increment]');
    this.decrementBtn = this.shadowRoot.querySelector('[decrement]');
    this.displayVal = this.shadowRoot.querySelector('span');
  }

  connectedCallback() {
    this.onInit();


    this.incrementBtn.addEventListener('click', this.increment);
    this.decrementBtn.addEventListener('click', this.decrement);

    if (!this.hasAttribute('value')) {
      this.setAttribute('value', 1);
    }
  }

  initShadowDom() {
    let shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = this.template;
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

  static get observedAttributes() {
    return ['value'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log('attributeChangedCallback: ', { name, oldValue, newValue });
    this.displayVal.innerHTML = this.value;
  }

  get value() {
    return this.getAttribute('value');
  }

  get step() {
    return this.getAttribute('step');
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


  disconnectedCallback() {
    this.incrementBtn.removeEventListener('click', this.increment);
    this.decrementBtn.removeEventListener('click', this.decrement);
  }

  get template() {
    const template = document.createElement('template');

    template.innerHTML = `
      <div>
        <div class="ok">
        </div>
        <input id="name" />
        <input id="password" type="password" />
        <button disabled>Criar conta</buttom>
      </div>
    `;

    return template;
  }
}

window.customElements.define('new-account-form', NewAccountForm);
