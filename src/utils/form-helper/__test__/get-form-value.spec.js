import getFormValue from '../get-form-value';

describe('getFormValue', () => {

  describe('when a form is submited on form form', () => {

    it('should converte the value to a key value format', () => {
      expect(getFormValue(SUBMIT_MOCK)).toEqual(EXPECTED_MOCK);
    });

  });

});

const SUBMIT_MOCK = {
  'name': {
    'validators': {},
    'value': 'Segundo Silva',
    'errors': {
      'required': false
    },
    'valid': true
  },
  'email': {
    'validators': {},
    'value': 'dev1@email.com',
    'errors': {
      'required': false,
      'email': false
    },
    'valid': true
  },
  'password': {
    'validators': {},
    'value': 'Aa11111',
    'errors': {
      'required': false,
      'minLength': false,
      'character': false,
      'number': false
    },
    'valid': true
  },
  'confirmPassword': {
    'validators': {},
    'value': 'Aa11111',
    'errors': {
      'required': false,
      'matchConfirmation': false
    },
    'valid': true
  }
};


const EXPECTED_MOCK = {
  'name': 'Segundo Silva',
  'email': 'dev1@email.com',
  'password': 'Aa11111',
  'confirmPassword': 'Aa11111',
};