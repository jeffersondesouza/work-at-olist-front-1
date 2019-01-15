export default class PasswordFeedback extends HTMLElement {

  constructor() {
    super();
  }

  get passwordMin() {
    return this.shadowRoot.querySelector('#jsPassword-min');
  }

  get passwordNumber() {
    return this.shadowRoot.querySelector('#jsPassword-number');
  }
  get passwordChar() {
    return this.shadowRoot.querySelector('#jsPassword-char');
  }


  static get observedAttributes() {
    return ['value'];
  }

  connectedCallback() {
    this.initShadowDom();
  }

  initShadowDom() {
    let shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = this.template;
  }

  attributeChangedCallback(name, oldValue, newValue) {
  }

  get template() {
    return `
      <style>
        .input-feedback{
          position:relative;
          padding-left:1rem;
        }  

        .input-feedback::before{
          content:'';
          background-color:#EAEAF4;
          border-radius:100px;
          height:10px;
          position:absolute;
          top: 50%;
          left:0;
          transform: translate(0, -50%);
          width:10px;
        }
      </style>

      <div id="password-feedback" >
        <div class="input-feedback">
          <input-feedback id="jsPassword-min" value="Pelo menos 6 caracteres" ></input-feedback>
        </div>
        <div class="input-feedback">
          <input-feedback id="jsPassword-number" value="Pelo menos uma letra maiúscula" ></input-feedback>
        </div>
        <div class="input-feedback">
          <input-feedback id="jsPassword-char" value="Pelo menos um numero" ></input-feedback>
        </div>
      </div>
    `;
  }
}

window.customElements.define('password-feedback', PasswordFeedback);