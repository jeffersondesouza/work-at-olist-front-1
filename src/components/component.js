
export default class Component extends HTMLElement {
  constructor() {
    super();
  }

  /**
   * @override
   * @observedAttributes Must return an aray of atributes that coul be oberserved on Changes
   * 
   * static get observedAttributes(){ return ['atribute_name'] } 
   */

  /**
   * @override Invoked each time the custom element is appended into a document-connected element. 
   */
  connectedCallback() {
    this.init();
    this.onInit();
  }

  /**
   * @override invoked when atributes set in @observedAttributes changes
   */
  attributeChangedCallback(name, oldValue, newValue) {
    console.log('attributeChangedCallback', { name, oldValue, newValue });
    this.onChanges({ name, oldValue, newValue })
  }

  /**
    * @overrideInvoked each time the custom element is disconnected from the document's DOM.
    */
  disconnectedCallback() {
    this.onDestroy();
  }


  /**
   * Called in @connectedCallback to  set childern shadowDOM
   */
  init() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(this.render());
  }

  /**
   * Wrappwer and set the Template of the WebComponent insertinf the styles and the template
   */
  render() {
    const templateComp = document.createElement('template');
    templateComp.innerHTML = `
      ${this.styles()}
      ${this.template()}
    `;
    return templateComp.content.cloneNode(true);
  }

  /// childrens 

  onInit() { }
  onDestroy() { }
  onChanges() { }



  styles() { return ''; }

  template() {
    const template = document.createElement('template');

    template.innerHTML = `
      ${this.styles()}
    `;
    return template;
  }

}
