const toKeyValue = (formvalue) =>
  (key) => ({
    [key]: formvalue[key].value
  });

const toFinalFormat = (value, item) => ({ ...value, ...item })

export default (formvalue) => {

  const newValue = Object.keys(formvalue)
    .map(toKeyValue(formvalue))
    .reduce(toFinalFormat, {});

  return newValue;
}