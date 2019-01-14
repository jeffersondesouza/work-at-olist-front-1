import updateParam from './update-param';

export default (formValue, key, value) => {
  
  return {
    ...formValue,
    [key]: updateParam(formValue[key], value)
  }


}

