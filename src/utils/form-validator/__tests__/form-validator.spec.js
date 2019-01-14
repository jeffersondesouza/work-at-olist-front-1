import formHelper from '../../form-helper';
import { isValidForm, requiredValidator, emailValidator } from '../';

let formValue = {
  name: formHelper.buildParam({
    value: '',
    validators: { required: requiredValidator }
  }),
  email: formHelper.buildParam({
    value: '',
    validators: { required: requiredValidator, email: emailValidator }
  }),
  password: formHelper.buildParam({
    value: '',
    validators: { required: requiredValidator }
  }),
  confirmPassword: formHelper.buildParam({
    value: '',
    validators: { required: requiredValidator }
  })
};

describe('FORM: all params required', () => {

  describe('when not inform the name', () => {

//    formValue = formHelper.updateForm(formValue, 'name', 'joao');
    formValue = formHelper.updateForm(formValue, 'email', 'joao@email.com');
    formValue = formHelper.updateForm(formValue, 'password', '1234Asdf');
    formValue = formHelper.updateForm(formValue, 'confirmPassword', '1234Asdf');

    
    it('should return name is required', () => {
      const valid = isValidForm(formValue);

      expect(valid).toBeFalsy();
      expect(formValue.name.errors.required).toBeTruthy();
      expect(formValue.name.valid).toBeFalsy();
    });

  });


  /* describe('when form init INVALID on email', () => {
    let formValue;

    beforeEach(() => {
      formValue = {
        name: formHelper.buildParam({
          value: 'joao',
          validators: [requiredValidator]
        }),
        email: formHelper.buildParam({
          value: 'joa',
          validators: [requiredValidator, emailValidator]
        }),
        password: formHelper.buildParam({
          value: '123456AAAaaa',
          validators: [requiredValidator]
        }),
        confirmPassword: formHelper.buildParam({
          value: '123456AAAaaa',
          validators: [requiredValidator]
        })
      }
    });

    describe('when all form are VALID', () => {
      it('should return a valid form', () => {
        expect(isValidForm(formValue)).toBeFalsy();
      });
    });
  });


  describe('when form init INVALID on required', () => {
    let formValue;

    beforeEach(() => {
      formValue = {
        name: formHelper.buildParam({
          value: '',
          validators: [requiredValidator]
        }),
        email: formHelper.buildParam({
          value: 'joa@email.com',
          validators: [requiredValidator, emailValidator]
        }),
        password: formHelper.buildParam({
          value: '123456AAAaaa',
          validators: [requiredValidator]
        }),
        confirmPassword: formHelper.buildParam({
          value: '123456AAAaaa',
          validators: [requiredValidator]
        })
      }
    });

    describe('when all form are VALID', () => {
      it('should return a valid form', () => {
        expect(isValidForm(formValue)).toBeFalsy();
      });
    });
  });



  describe('when form init INVALID on Password Min', () => {
    let formValue;

    beforeEach(() => {
      formValue = {
        name: formHelper.buildParam({
          value: 'joao',
          validators: [requiredValidator]
        }),
        email: formHelper.buildParam({
          value: 'joa@email.com',
          validators: [requiredValidator, emailValidator]
        }),
        password: formHelper.buildParam({
          value: '1aaa',
          validators: [requiredValidator]
        }),
        confirmPassword: formHelper.buildParam({
          value: '1aaaa',
          validators: [requiredValidator]
        })
      }
    });

    describe('when all form are VALID', () => {
      it('should return a valid form', () => {
        expect(isValidForm(formValue)).toBeFalsy();
      });
    });
  });

  describe('when form init INVALID on PASSWORD no captial case', () => {
    let formValue;

    beforeEach(() => {
      formValue = {
        name: formHelper.buildParam({
          value: 'joao',
          validators: [requiredValidator]
        }),
        email: formHelper.buildParam({
          value: 'joa@email.com',
          validators: [requiredValidator, emailValidator]
        }),
        password: formHelper.buildParam({
          value: 'asdfgh123456',
          validators: [requiredValidator]
        }),
        confirmPassword: formHelper.buildParam({
          value: 'asdfgh123456',
          validators: [requiredValidator]
        })
      }
    });

    describe('when all form are VALID', () => {
      it('should return a valid form', () => {
        expect(isValidForm(formValue)).toBeFalsy();
      });
    });
  });



  describe('when form init INVALID on pPASSWORD no number', () => {
    let formValue;

    beforeEach(() => {
      formValue = {
        name: formHelper.buildParam({
          value: 'joao',
          validators: [requiredValidator]
        }),
        email: formHelper.buildParam({
          value: 'joa@email.com',
          validators: [requiredValidator, emailValidator]
        }),
        password: formHelper.buildParam({
          value: 'asdfghj',
          validators: [requiredValidator]
        }),
        confirmPassword: formHelper.buildParam({
          value: 'asdfghj',
          validators: [requiredValidator]
        })
      }
    });

    describe('when all form are VALID', () => {
      it('should return a valid form', () => {
        expect(isValidForm(formValue)).toBeFalsy();
      });
    });
  });



  describe('when form init INVALID on PASSWORD no letters', () => {
    let formValue;

    beforeEach(() => {
      formValue = {
        name: formHelper.buildParam({
          value: 'joao',
          validators: [requiredValidator]
        }),
        email: formHelper.buildParam({
          value: 'joa@email.com',
          validators: [requiredValidator, emailValidator]
        }),
        password: formHelper.buildParam({
          value: '12345678',
          validators: [requiredValidator]
        }),
        confirmPassword: formHelper.buildParam({
          value: '12345678',
          validators: [requiredValidator]
        })
      }
    });

    describe('when all form are VALID', () => {
      it('should return a valid form', () => {
        expect(isValidForm(formValue)).toBeFalsy();
      });
    });
  });



  describe('when form init INVALID on PASSWORD no length', () => {
    let formValue;

    beforeEach(() => {
      formValue = {
        name: formHelper.buildParam({
          value: 'joao',
          validators: [requiredValidator]
        }),
        email: formHelper.buildParam({
          value: 'joa@email.com',
          validators: [requiredValidator, emailValidator]
        }),
        password: formHelper.buildParam({
          value: 'Asd12',
          validators: [requiredValidator]
        }),
        confirmPassword: formHelper.buildParam({
          value: 'Asd12',
          validators: [requiredValidator]
        })
      }
    });

    describe('when all form are VALID', () => {
      it('should return a valid form', () => {
        expect(isValidForm(formValue)).toBeFalsy();
      });
    });
  }); */

});