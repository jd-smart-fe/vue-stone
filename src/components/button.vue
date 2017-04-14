<!--
*******
******* Tips：
******* 点击按钮会触发 change 事件. toggle型按钮会额外携带一个包含当前开关状态的参数, 同时会触发turnOn 或 turnOff 事件
******* 禁用按钮后不会触发 change 事件。
******* longTap === true 时，开启长按功能，按下按钮 1000ms 后，每 150ms 触发一次 change 事件。
*******
******* 应用 toggle 型按钮时，
******* 通过传入 init_status 属性来决定组件初始 的 status。
******* 若想通过非点击方式改变 status，可通过调用update(boolean) 去改变状态。
*******
 -->

<template>
  <button
    :data-value="`${status}`"
    :class="[ 'c-btn',
              `c-btn-${size}`,
              disabled ? 'c-btn-disabled' : '',
              active ? 'c-btn-hover' : '',
              status ? 'c-btn-on' : '',
              iconOnly ? 'c-btn-icon-only' : '',
              'c-btn-radius-' + radius,
            ]"
    :type="htmlType"
    @touchstart="touchstartHandle"
    @touchend="touchendHandle"
    @touchcancel="touchcancelHandle"
  >
    <span v-if="icon !== '' " :class="['c-btn-icon', `icon-${icon}`]"></span>
    <span v-show="!iconOnly" class="c-btn-content"><slot></slot></span>
  </button>
</template>

<script>
import units from '../units/default';

let longTapFlagInterval = null;
let longTapInterval = null;

export default {
  name: 'v-button',

  data() {
    return {
      active: false,
      longTapFlag: false,
      status: this.init_status,
      iconOnly: false,
    };
  },

  props: {
    // 按钮类型
    type: {
      type: String,
      // required: false,
      default: 'click',
      validator(value) {
        const list = ['toggle', 'click'];

        if (list.indexOf(value) < 0) {

          units.warn({
            com: 'v-button',
            prop: 'type',
            param: list,
          });
          return false;
        }
        return true;
      },
    },
    // 按钮大小
    size: {
      type: String,
      // required: false,
      default: 'base',
      validator(value) {
        const list = ['small', 'base', 'large'];

        if (list.indexOf(value) < 0) {
          units.warn({
            com: 'v-button',
            prop: 'size',
            param: list,
          });
          return false;
        }

        return true;
      },
    },
    // 按钮图标
    icon: {
      type: String,
      required: false,
      default: '',
    },
    radius: {
      type: String,
      default: 'small', // none small circle
    },
    // 是否禁用按钮
    disabled: {
      type: Boolean,
      reuqired: false,
      default: false,
    },
    // 是否开启长按功能
    longTap: {
      type: Boolean,
      required: false,
      default: false,
    },
    // 按钮初始状态
    init_status: {
      type: Boolean,
      required: false,
      default: false,
    },
    // 保持当前status，类似与disabled, 再次点击后不会改变status，但是可直接修改实例下的status来改变状态,
    // 与disabled最大的不同是，disabled有默认的样式类，而hold不会添加新的样式。
    hold: {
      type: Boolean,
      required: false,
      default: false,
    },
    htmlType: {
      type: String,
      default: 'button',
    },
  },

  watch: {
    longTapFlag(val) {
      if (longTapInterval) {
        window.clearInterval(longTapInterval);
        longTapInterval = null;
      }
      if (val === false) {
        return;
      }

      const that = this;
      longTapInterval = window.setInterval(() => {
        that.$emit('change');
      }, 150);
    },

    // status 放在 watcher 中是为了保证只要 status 状态发生了变化就会触发 change 事件。
    status() {
      this.$emit('change', this.status);

      if (this.status) {
        this.$emit('turnOn', this.status);
      } else {
        this.$emit('turnOff', this.status);
      }
    },
  },

  created() {
    if (!Object.hasOwnProperty.call(this.$slots, 'default') && this.icon) {
      this.iconOnly = true;
    }
  },

  methods: {
    // 通过调用update的方式去改变status；
    update(boolean) {
      this.status = boolean;
    },

    // 停止计时器
    stopInterval() {
      window.clearInterval(longTapFlagInterval);
      this.longTapFlag = false;
      longTapFlagInterval = null;
    },

    touchstartHandle() {
      // longTap功能
      if (this.longTap) {
        longTapFlagInterval = window.setInterval(() => {
          this.longTapFlag = true;
        }, 1000);
      }
      // 按钮被禁用
      if (this.disabled) {
        this.active = false;
        return;
      }
      this.active = true;
    },

    touchendHandle() {
      // longTap功能开启
      if (this.longTap) {
        window.clearInterval(longTapFlagInterval);
        this.longTapFlag = false;
        longTapFlagInterval = null;
      }
      // 按钮禁用状态
      if (this.disabled) {
        // 按钮禁用后解除按下的状态
        this.active = false;
        return;
      }
      // 解除按下状态
      this.active = false;

      // click 型按钮，无需改变status值，直接分发change事件
      if (this.type === 'click') {
        this.$emit('change');
        return;
      }

      // hold === true 时。
      if (this.hold === true) {
        // this.$emit('change', this.status);
        return;
      }

      this.status = !this.status;
      // status 相关事件通过 watcher 分发
    },

    touchcancelHandle() {
      this.touchendHandle();
    },
  },
};

</script>

<style>
@import '../styles/default-theme/variables.css';
@import '../styles/mixins.css';

.c-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  @mixin border;
  border-color: $c-primary;
  border-color: $c-primary;

  color: $c-primary;

  cursor: pointer;
  -webkit-tap-highlight-color:rgba(0, 0, 0, 0);

  /**
   * 解决 Android 4.2 版本 border-radius 和 background 的 Bug
   */
  background-clip: padding-box;
  background-color: transparent;

  @mixin transition;

  span {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  &.c-btn-disabled {
    /*opacity: .6;*/
    color: $btn-disabled;
    border-color: $btn-disabled;
    /*background-color: $btn-disabled;*/
  }
}

.c-btn-hover{
  background: $btn-hover;

  &.c-btn-on{
    background-color: $c-primary-on;
  }
}

.c-btn-on{
  color: $white;
  background-color: $blue;
}

.c-btn-base {
  font-size: $btn-fontsize-base;
  line-height: $btn-fontsize-base;

  padding: $btn-padding-base;
}

.c-btn-small {
  font-size: $btn-fontsize-sm;
  line-height: $btn-fontsize-sm;

  padding: $btn-padding-sm;
}

.c-btn-large {
  font-size: $btn-fontsize-lg;
  line-height: $btn-fontsize-lg;

  padding: $btn-padding-lg;
}

.c-btn-radius-none {
  border-radius: 0;
}

.c-btn-radius-small {
  border-radius: $btn-radius-sm;
}

.c-btn-radius-circle {
  border-radius: 999rem;
}

.c-btn-content {
  vertical-align: middle;
}

.c-btn-icon{
  display: inline-block;

  vertical-align: middle;
  /*font-size: calc($font-size-base + 4px);*/

  &:before{
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  + span {
    margin-left: 0.05rem;
  }
}

.c-btn-icon-only {

  padding: 0;
  border-radius: 100%;

  &.c-btn-small {
    width: .24rem;
    height: .24rem;
    font-size: .12rem;
  }

  &.c-btn-base {
    width: .32rem;
    height: .32rem;
    font-size: .16rem;
  }

  &.c-btn-large {
    width: .44rem;
    height: .44rem;
    font-size: .22rem;
  }
}

.c-btn-group {

  display: flex;

  .c-btn:first-child {
    border-right: none;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .c-btn:last-child {
    border-left-width: 1px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .c-btn:not(:first-child):not(:last-child){
    border-left-width: 1px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;

    border-right: none;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

}
</style>
