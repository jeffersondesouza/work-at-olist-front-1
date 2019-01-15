/**
 * @tag <input-feedback><input-feedback>
 */
export default class InputFeedback extends HTMLElement {

  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['value', 'valid', 'showstatus'];
  }

  connectedCallback() {
    this.initShadowDom();
    this.feedback = this.value;
  }

  initShadowDom() {
    let shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = this.template;
    this.statusEl.hidden = !this.showstatus;

  }

  attributeChangedCallback(name, oldValue, newValue) {

    if (this.shadowRoot) {

      if (name === 'value') {
        this.feedback = newValue;
      }

      this.setStatusIcon(name, newValue);

    }
  }

  setStatusIcon(name, newValue) {
    if (name === 'valid') {
      if (JSON.parse(newValue)) {
        this.statusEl.classList.add('feedback__status--success');
        this.statusEl.classList.remove('feedback__status--error');
      } else {
        this.statusEl.classList.add('feedback__status--error');
        this.statusEl.classList.remove('feedback__status--success');
      }
    }
  }

  get value() {
    return this.getAttribute('value');
  }

  set value(newValue) {
    this.setAttribute('value', newValue);
  }

  get valid() {
    return this.getAttribute('valid');
  }

  set valid(value) {
    this.setAttribute('valid', value);
  }

  get showstatus() {
    return this.getAttribute('showstatus');
  }

  set showstatus(value) {
    this.setAttribute('showstatus', value);
  }

  get statusEl() {
    return this.shadowRoot.querySelector('#js-status');
  }

  get feedback() {
    return this.shadowRoot.querySelector('#input-feedback');
  }

  set feedback(msg) {
    return this.feedback.querySelector('span').innerHTML = msg || '';
  }

  get style() {
   
    return `
      <style>
        .feedback{
          display: flex;
          align-items:center;
        }
        
        .feedback__status{
          background-color: #EAEAF4;
          height: 10px;
          margin-right:5px;
          width: 10px;
          border-radius:100%;
        }
        .feedback__status--success{
          background-color:#1FE6A8;
        }
        
        .feedback__status--error{
          background-color:#F79682;
        }

      </style>
    `
  }

  get template() {
    return `
      ${this.style}
      <div id="input-feedback" class="feedback">
        <div id="js-status" class="feedback__status"></div>
        <span></span>
      </div>
    `;
  }
}

window.customElements.define('input-feedback', InputFeedback);