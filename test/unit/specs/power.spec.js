import Vue from 'vue';
import Power from 'src/components/power';
import helper from '../helper';

Vue.create = helper.createVuefactory(Vue, Power);

describe('Power.vue', () => {
  // beforeEach(() => {
  // });

  // afterEach(() => {
  // });

  it('should render component with default state', () => {
    const vm = Vue.create();
    const list = helper.convertNodelist(vm.$el.classList);
    expect(list).to.be.include('is-off');
  });

  it('should render component with `on` state', (done) => {
    const vm = new Vue({
      el: document.createElement('div'),
      template: '<power v-model="pstate" ref="power"></power>',
      components: {
        Power,
      },
      data() {
        return {
          pstate: true,
        };
      },
    });

    expect(vm.$refs.power.$el.classList.contains('is-on')).to.be.true;

    vm.pstate = false;

    vm.$nextTick(() => {
      expect(vm.$refs.power.$el.classList.contains('is-off')).to.be.true;
      done();
    });
  });

  it('should render component with `disabled` state', () => {
    const vm = Vue.create({}, {
      props: {
        disabled: true,
      },
      ref: 'power',
    });

    const list = helper.convertNodelist(vm.$el.classList);
    expect(list).to.include('is-disabled');
  });
});
