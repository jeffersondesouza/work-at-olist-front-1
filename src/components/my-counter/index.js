/**
 * Summary. (use period)
 *
 * Description. (use period)
 *
 * @since      x.x.x
 * @deprecated x.x.x Use new_function_name() instead.
 * @access     private
 *
 * @class
 * @augments parent
 * @mixes    mixin
 * 
 * @alias    realName
 * @memberof namespace
 *
 * @see  Function/class relied on
 * @link URL
 * @global
 *
 * @fires   eventName
 * @fires   className#eventName
 * @listens event:eventName
 * @listens className~event:eventName
 *
 * @param {type}   var           Description.
 * @param {type}   [var]         Description of optional variable.
 * @param {type}   [var=default] Description of optional variable with default variable.
 * @param {Object} objectVar     Description.
 * @param {type}   objectVar.key Description of a key in the objectVar parameter.
 * 
 * @return {type} Description.
 */

export default class MyCounter extends HTMLElement {
  constructor() {
    super();

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);

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
      <style>
        button,
        span {
          font-size: 3rem;
          font-family: monospace;
          padding: 0 .5rem;
        }
    
    
        button:active {
          background: #ad3d55;
          color: white;
        }
      </style>
      <div>
        <button type="button" increment>+</button>
        <span id="contador"></span>
        <button type="button" decrement>-</button>
      </div>
    `;

    return template;
  }
}

window.customElements.define('my-counter', MyCounter);