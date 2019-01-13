export default {
  component: 'my-counter',
  path: '/src/components/my-counter/index.js',
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