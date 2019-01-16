import styleHelper from '../../utils/style-helper';

/**
 * @tag <singup-feedback><singup-feedback>
 */
export default class SignupFeedback extends HTMLElement {

  connectedCallback() {
    let shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = this.template;
  }

  get style() {
    return `
      <style>
        .feedback{
          width:22rem;
          padding: 6rem 7.7rem 4rem;
          ${styleHelper.mixins.absColumnMidleCenter}
        }

        .feedback__check-box{
          border: 3px solid #17D499;
          box-sizing: border-box;
          border-radius:100%;
          height: 8.4rem;
          margin-bottom:1.6rem;
          width: 8.4rem;
          ${styleHelper.mixins.absColumnMidleCenter}
        }

        .feedback__title{
          line-height: 3rem;
          font-size: 2.2rem;
          margin:0; 
          margin-bottom:1.6rem;

        }

        .feedback__explain{
          line-height: 2.6rem;
          text-align:center;
          margin:0
        }

      </style>
    `;
  }

  get template() {
    return `
      ${this.style}
      <div class="feedback">
          <div class="feedback__check-box">
            <svg width="36" height="27" viewBox="0 0 36 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.0001 21.3399L3.66007 12.9999L0.820069 15.8199L12.0001 26.9999L36.0001 2.99993L33.1801 0.179932L12.0001 21.3399Z" fill="#17D499"/></svg>
          </div>
          <h3 class="feedback__title">Tudo certo</h3>
          <p class="feedback__explain">Verifique sua caixa de entrada para confirmar seu email</p>
      </div>
    `;
  }
}

window.customElements.define('singup-feedback', SignupFeedback);