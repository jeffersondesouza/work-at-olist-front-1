/* import '../src/components/singup-form/index';
*/



export default {
  component: 'singup-form',
  path: '/src/components/singup-form/index.js',
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