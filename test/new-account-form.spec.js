
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

    it('should name and email inputs be empty', async () => {
      const nameInput = await showroom.find('// #jsName');
      const innerText = await showroom.getProperty('value', nameInput);
      assert.equal(innerText, '');


      const emailInput = await showroom.find('// #jsEmail');
      const inneremail = await showroom.getProperty('value', emailInput);
      assert.equal(inneremail, '');
    });

    it('should Password and confirm password be empty', async () => {
      const password = await showroom.find('// #jsPassword');
      const innerpassword = await showroom.getProperty('value', password);
      assert.equal(innerpassword, '');


      const confirmInput = await showroom.find('// #jsConfirmPassword');
      const innerConfirm = await showroom.getProperty('value', confirmInput);
      assert.equal(innerConfirm, '');
    });


    it('should The submit button must be disabled until the form is valid.', async () => {
      const submit = await showroom.find('// #js-submit');
      const disabled = await showroom.getProperty('disabled', submit);
      assert.equal(disabled, false);
    });


  });

});