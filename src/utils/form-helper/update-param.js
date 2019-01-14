import inputErrors from './input-errors';
import validInput from './validate-input';

export default (actualParam, value) => {

  const errors = inputErrors(value, actualParam.validators);

  const param = {
    ...actualParam,
    value,
    errors,
    valid: validInput(errors),
  };

  return param;
}