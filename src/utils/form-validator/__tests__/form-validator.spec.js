import formHelper from '../../form-helper';
import {
  isValidForm,
  requiredValidator,
  emailValidator,
  minLengthValidator,
  characterValidator,
  numberValidator
} from '../';

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
    validators: { required: requiredValidator, minLength: minLengthValidator(6), character: characterValidator, number: numberValidator, }
  }),
  confirmPassword: formHelper.buildParam({
    value: '',
    validators: { required: requiredValidator }
  })
};

describe('FORM: all params required', () => {

  describe('when not inform the name', () => {
    let form = { ...formValue };

    form = formHelper.updateForm(form, 'name', '');
    form = formHelper.updateForm(form, 'email', 'joao@email.com');
    form = formHelper.updateForm(form, 'password', '1234Asdf');
    form = formHelper.updateForm(form, 'confirmPassword', '1234Asdf');

    it('should return name is required', () => {
      const valid = isValidForm(form);

      expect(valid).toBeFalsy();
      expect(form.name.errors.required).toBeTruthy();
      expect(form.name.valid).toBeFalsy();
    });

  });

  describe('test EMAIL', () => {

    describe('when not inform the email', () => {

      let form = { ...formValue };
      form = formHelper.updateForm(form, 'name', 'joao');
      form = formHelper.updateForm(form, 'email', '');
      form = formHelper.updateForm(form, 'password', '1234Asdf');
      form = formHelper.updateForm(form, 'confirmPassword', '1234Asdf');

      it('should return email is required', () => {
        const valid = isValidForm(form);

        expect(valid).toBeFalsy();
        expect(form.email.errors.required).toBeTruthy();
        expect(form.email.valid).toBeFalsy();
      });
    });


    describe('when email is on wrong format', () => {

      let form = { ...formValue };
      form = formHelper.updateForm(form, 'name', 'joao');
      form = formHelper.updateForm(form, 'email', 'joao');
      form = formHelper.updateForm(form, 'password', '1234Asdf');
      form = formHelper.updateForm(form, 'confirmPassword', '1234Asdf');

      it('should return email is required', () => {
        const valid = isValidForm(form);

        expect(valid).toBeFalsy();
        expect(form.email.errors.required).toBeFalsy();
        expect(form.email.errors.email).toBeTruthy();
        expect(form.email.valid).toBeFalsy();
      });
    });
  });




  describe('when not inform the confirmPassword', () => {

    let form = { ...formValue };
    form = formHelper.updateForm(form, 'name', 'joao');
    form = formHelper.updateForm(form, 'email', 'joao@email.com');
    form = formHelper.updateForm(form, 'password', '');
    form = formHelper.updateForm(form, 'confirmPassword', '');

    it('should return confirmPassword is required', () => {
      const valid = isValidForm(form);

      expect(valid).toBeFalsy();
      expect(form.confirmPassword.errors.required).toBeTruthy();
      expect(form.confirmPassword.valid).toBeFalsy();
    });

  });

  describe('test PASSWORD', () => {


    describe('when not inform the password', () => {

      let form = { ...formValue };
      form = formHelper.updateForm(form, 'name', 'joao');
      form = formHelper.updateForm(form, 'email', 'joao@email.com');
      form = formHelper.updateForm(form, 'password', '');
      form = formHelper.updateForm(form, 'confirmPassword', '1234Asdf');

      it('should return password is required', () => {
        const valid = isValidForm(form);

        expect(valid).toBeFalsy();
        expect(form.password.errors.required).toBeTruthy();
        expect(form.password.valid).toBeFalsy();
      });

    });

    describe('when password has less than 6 characters', () => {

      let form = { ...formValue };
      form = formHelper.updateForm(form, 'name', 'joao');
      form = formHelper.updateForm(form, 'email', 'joao@email.com');
      form = formHelper.updateForm(form, 'password', 'A1a');
      form = formHelper.updateForm(form, 'confirmPassword', 'A1a');

      it('should return password is required', () => {
        const valid = isValidForm(form);

        expect(valid).toBeFalsy();
        expect(form.password.errors.required).toBeFalsy();
        expect(form.password.errors.minLength).toBeTruthy();
        expect(form.password.valid).toBeFalsy();
      });

    });

    describe('when password has no characters captals characters', () => {

      let form = { ...formValue };
      form = formHelper.updateForm(form, 'name', 'joao');
      form = formHelper.updateForm(form, 'email', 'joao@email.com');
      form = formHelper.updateForm(form, 'password', 'a12345678');
      form = formHelper.updateForm(form, 'confirmPassword', 'A1a');

      it('should return password has no capitals', () => {
        const valid = isValidForm(form);

        expect(valid).toBeFalsy();
        expect(form.password.errors.required).toBeFalsy();
        expect(form.password.errors.minLength).toBeFalsy();
        expect(form.password.errors.character).toBeTruthy();
        expect(form.password.valid).toBeFalsy();
      });

    });
    describe('when password has no characters captals characters 2', () => {

      let form = { ...formValue };
      form = formHelper.updateForm(form, 'name', 'joao');
      form = formHelper.updateForm(form, 'email', 'joao@email.com');
      form = formHelper.updateForm(form, 'password', '12345678');
      form = formHelper.updateForm(form, 'confirmPassword', 'A1a');

      it('should return password has no capitals 2', () => {
        const valid = isValidForm(form);

        expect(valid).toBeFalsy();
        expect(form.password.errors.required).toBeFalsy();
        expect(form.password.errors.minLength).toBeFalsy();
        expect(form.password.errors.character).toBeTruthy();
        expect(form.password.valid).toBeFalsy();
      });

    });

    describe('when password has no numbers', () => {

      let form = { ...formValue };
      form = formHelper.updateForm(form, 'name', 'joao');
      form = formHelper.updateForm(form, 'email', 'joao@email.com');
      form = formHelper.updateForm(form, 'password', 'AAAAaaaa');
      form = formHelper.updateForm(form, 'confirmPassword', 'A1a');

      it('should return password has no numbers', () => {
        const valid = isValidForm(form);

        expect(valid).toBeFalsy();
        expect(form.password.errors.required).toBeFalsy();
        expect(form.password.errors.minLength).toBeFalsy();
        expect(form.password.errors.character).toBeFalsy();
        expect(form.password.errors.number).toBeTruthy();
        expect(form.password.valid).toBeFalsy();
      });

    });

  });

});