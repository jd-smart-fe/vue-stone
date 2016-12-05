

Namespacing

Objects: .o-   (<div class="o-container-wide">)
Components: .c-
State: .is- OR .has-
Theme: .t-
Utilities: .u-
Javascript hooks: .js-


-----
color:

// Colors
$c-warning: Red;
$c-primary: Blue;
$c-background: White;


-----

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
    // const vm = new Vue({
    //   el: document.createElement('div'),
    //   render: (h) => h(Switch, {
    //     props: {
    //       state: 'on',
    //     },
    //     ref: 'switch',
    //   }),
    // });

    const vm = Vue.create({}, {
      props: {
        state: 'on',
      },
      ref: 'switch',
    })

    const list = helper.convertNodelist(vm.$el.classList);
    expect(list).to.include('is-on');
  });

  it('should render component with `disabled` state', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Switch, {
        props: {
          disabled: true,
        },
        ref: 'switch',
      }),
    });

    const list = helper.convertNodelist(vm.$el.classList);
    expect(list).to.include('is-disabled');
  });
});


--------

<input
      class="el-switch__input"
      type="checkbox"
      @change="handleChange"
      v-model="_value"
      :name="name"
      :disabled="disabled">


    <input type="checkbox" class="c-power-checkbox" v-model="value" />
