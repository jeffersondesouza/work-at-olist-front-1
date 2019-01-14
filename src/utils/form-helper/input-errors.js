export default (value, validators) => {

  if (!validators || !Object.keys(validators).length) {
    return {};
  }

  return Object.keys(validators)
    .map(key => ({ [key]: validators[key](value) }))
    .reduce((errors, error) => ({ ...errors, ...error }), {});
}