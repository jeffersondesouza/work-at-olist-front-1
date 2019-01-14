/* import '../src/components/new-account-form/index';
*/



export default {
  component: 'new-account-form',
  path: '/src/components/new-account-form/index.js',
  // events: ['onstart', 'ontimeout', 'ontick', 'onstop'],
  attributes: { value: '1', min: '-2', max: '2' },
  functions: {
    decrement: () => {
      dashboard.targetComponent.decrement();
    },
    increment: () => {
      dashboard.targetComponent.increment();
    },
  },
}