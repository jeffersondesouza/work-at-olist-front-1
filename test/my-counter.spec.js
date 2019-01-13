const assert = require('assert');
const showroom = require('showroom/puppeteer')();

describe('my-counter', (finish) => {
  let wrapper;

  before((done) => {
    showroom.start()
      .then(v => {
        done();
      });
    // starts showroom server
  });

  after((done) => {
    showroom.stop()
      .then(v => {
        done();
      });
    // stops the showroom server
  });

  beforeEach((done) => {
    showroom.setTestSubject('my-counter')
      .then(v => {
        wrapper = v;
        done();
      });
  });


  it('Should display initial time', (done) => {

    showroom.setAttribute('value', '10', wrapper)
      .then(text => {
        return showroom.getProperty('value');
      })
      .then(text => {
        innerText = text;
        assert.equal(innerText, '10');
        done();
      });


  });

});