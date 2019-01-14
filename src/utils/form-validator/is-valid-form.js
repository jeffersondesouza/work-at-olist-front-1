const isValidForm = (formValue) => {
  const formParamValid = Object.keys(formValue)
    .map(key => formValue[key].valid);
  return formParamValid.every(valid => valid === true);
};

export default isValidForm;