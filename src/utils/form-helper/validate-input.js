export default (errors) => Object.keys(errors)
  .map(key => errors[key])
  .every(error => error === false);
