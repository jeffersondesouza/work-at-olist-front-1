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

});