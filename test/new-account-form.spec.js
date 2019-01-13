const assert = require('assert');
const showroom = require('showroom/puppeteer')();

describe('<new-account-form>', (finish) => {

  let wrapper;

  before(async () => {
    await showroom.start();
    // starts showroom server
  });

  after(async () => {
    await showroom.stop();
    // stops the showroom server
  });

  beforeEach(async () => {
    wrapper = await showroom.setTestSubject('new-account-form');
  });

  describe('when init the form component', () => {

    it('should NAME and password input be empty', async () => {
      const nameInput = await showroom.find('// #name');
      const innerText = await showroom.getProperty('value', nameInput);
      assert.equal(innerText, '');


      const passwordInput = await showroom.find('// #password');
      const innerPassword = await showroom.getProperty('value', passwordInput);
      assert.equal(innerPassword, '');
    });


    it('should  the submit button must be disabled until the form is valid', async () => {
      const submit = await showroom.find('// button');
      const disabled = await showroom.getProperty('disabled', submit);
      assert.equal(disabled, true);
    });

  });


  describe('when submit an black form', () => {
    
/*     it('should show Name and Email is required.', async () => {
      const submit = await showroom.find('// #nameErros');
      const disabled = await showroom.getProperty('disabled', submit);
      assert.equal(disabled, true);
    }); */


  });


});