import updateParam from './update-param';

export default ({ value, validators }) => {
  return updateParam({ validators }, value);
};
