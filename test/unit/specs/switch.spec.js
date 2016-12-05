import Vue from 'vue';
import Switch from 'src/components/switch';
import helper from '../helper';

Vue.create = helper.createVuefactory(Vue, Switch);

describe('Switch.vue', () => {
  // beforeEach(() => {
  // });

  // afterEach(() => {
  // });

  it('should render component with default state', () => {
    const vm = Vue.create();
    const list = helper.convertNodelist(vm.$el.classList);
    expect(list).to.include('is-off');
  });

  it('should render component with `on` state', () => {
    const vm = Vue.create({}, {
      props: {
        state: 'on',
      },
      ref: 'switch',
    });

    const list = helper.convertNodelist(vm.$el.classList);
    expect(list).to.include('is-on');
  });

  it('should render component with `disabled` state', () => {
    const vm = Vue.create({}, {
      props: {
        disabled: true,
      },
      ref: 'switch',
    });

    const list = helper.convertNodelist(vm.$el.classList);
    expect(list).to.include('is-disabled');
  });
});
