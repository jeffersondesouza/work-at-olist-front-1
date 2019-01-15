import styleHelper from '../../utils/style-helper';

/**
 * @tag <circles-spinner><circles-spinner>
 */
export default class CirclesSppiner extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    this.initShadowDom();
  }

  initShadowDom() {
    let shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = this.template;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.setErrosCounterClass(name, +newValue);
  }

  get style() {
    return `
      <style>

        @keyframes pulse{
          0%{ transform: scale(1); }
          25%{ transform: scale(.7); }
          50%{ transform: scale(.4); }
          25%{ transform: scale(.7); }
          100%{ transform: scale(1); }
        }

        @keyframes pulse-2{
          0%{ transform: scale(.7); }
          25%{ transform: scale(1); }
          50%{ transform: scale(.7); }
          25%{ transform: scale(1); }
          100%{ transform: scale(.7); }
        }

        @keyframes pulse-3{
          0%{ transform: scale(.4); }
          25%{ transform: scale(.7); }
          50%{ transform: scale(1); }
          25%{ transform: scale(.7); }
          100%{ transform: scale(.4); }
        }

        .spinner{
          width:100%;
          display:flex;
          justify-content:center;
        }
        
        .circle{
          margin: 0 3.5px;
          width:10px;
          height:10px;
          background-color:${styleHelper.constants.whiteColor};
          border-radius:100%;
        } 

        .circle--1{
          animation: pulse .5s infinite;
        }

        .circle--2{
          animation: pulse-2 .5s infinite;
        }

        .circle--3{
          animation: pulse-3 .5s infinite;
        }

      </style>
    `
  }

  get template() {
    return `
    ${this.style}
      <div class="spinner">
        <div class="circle circle--1"></div>
        <div class="circle circle--2"></div>
        <div class="circle circle--3"></div>
      </div>
    `;
  }
}

window.customElements.define('circles-spinner', CirclesSppiner);

/* 



*/