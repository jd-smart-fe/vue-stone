<!--
*******
******* Tips：
******* 点击按钮会触发 change 事件. toggle型按钮会额外携带一个包含当前开关状态的参数, 同时会触发turnOn 或 turnOff 事件
******* 禁用按钮后不会触发 change 事件。
******* longTap === true 时，开启长按功能，按下按钮 1000ms 后，每 150ms 触发一次 change 事件。
*******
******* 应用 toggle 型按钮时，
******* 通过传入 initStatus 属性来决定组件初始 的 status。
******* 若想通过非点击方式改变 status， 可直接更改实例下的 status 属性即可。
*******
 -->

<template>
  <div
  :class="[ 'c-button',
            `c-${size}`,
            disabled ? 'c-btn-disabled' : '',
            isPress ? hoverClass : '',
            status ? 'is-on' : '',
            /*解决触控板点击click型按钮没有颜色反馈，后期可删除*/
            type === 'toggle' ? 'is-transition' : ''
          ]"
  :text="text"
  :type="type"
  @touchstart="touchstartHandle"
  @touchend="touchendHandle"
  >
    <span v-if="icon !== '' " :class="['c-button-icon', `icon-${icon}`]"></span>
    <span v-if="text !== '' " >{{ text }}</span>
  </div>
</template>

<script>

let longTapFlagInterval = null;
let longTapInterval = null;

export default {
  name: 'v-button',

  data() {
    return {
      isPress: false,
      longTapFlag: false,
      status: this.initStatus,
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
          console.error("[v-button] prop 'type' error: yon pass an invalid value, please pass a value in 'toggle' 'click'");
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
        const list = ['sm', 'base', 'lg'];
        if (list.indexOf(value) < 0) {
          console.error("[v-button] prop 'size' error: yon pass an invalid value, please pass a value in 'sm' 'base' 'lg'");
          return false;
        }
        return true;
      },
    },
    // 按钮文本
    text: {
      type: String,
      required: false,
      default: '',
    },
    // 按钮icon
    icon: {
      type: String,
      required: false,
      default: '',
    },
    // 按钮初始状态
    initStatus: {
      type: Boolean,
      required: false,
      default: false,
    },
    // 是否禁用按钮
    disabled: {
      type: Boolean,
      reuqired: false,
      default: false,
    },
    // 指定按钮按下去的样式类
    hoverClass: {
      type: String,
      required: false,
      default: 'is-press',
    },
    // 是否开启长按功能
    longTap: {
      type: Boolean,
      required: false,
      default: false,
    },
    // 保持当前status，类似与disabled, 再次点击后不会改变status， 但是hold会分发出事件，而disabled不会。
    hold: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  watch: {
    longTapFlag(val) {
      if (longTapInterval) {
        window.clearInterval(longTapInterval);
        longTapInterval = null;
      }
      if (!val) {
        return;
      }

      const that = this;
      longTapInterval = window.setInterval(() => {
        that.$emit('change');
      }, 150);
    },

    initStatus(val) {
      this.status = val;
      // 从外部改变 status 后通过 watcher 及时更新内部 status 状态。
      // 然后通过 status 的watcher来分发change事件。
    },

    // status 放在 watcher 中是为了保证只要 status 状态发生了变化就会触发 change 事件。
    status() {
      this.$emit('change', this.status, this);

      if (this.status) {
        this.$emit('turnOn', this.status, this);
      } else {
        this.$emit('turnOff', this.status);
      }
    },
  },

  methods: {
    touchstartHandle() {
      if (this.disabled) {
        return;
      }
      this.isPress = true;

      // longTap功能
      if (this.longTap) {
        longTapFlagInterval = window.setInterval(() => {
          this.longTapFlag = true;
        }, 1000);
      }
    },

    touchendHandle() {
      if (this.disabled) {
        return;
      }
      this.isPress = false;

      // longTap功能
      if (this.longTap) {
        window.clearInterval(longTapFlagInterval);
        this.longTapFlag = false;
        longTapFlagInterval = null;
      }

      // click 型按钮，无需改变status值，直接分发change事件
      if (this.type === 'click') {
        this.$emit('change');
        return;
      }
      if (this.hold === true) {
        this.$emit('change', this.status);
        return;
      }

      this.status = !this.status;
      // status 相关事件通过 watcher 分发
    },
  },
};
</script>

<style>
  @import '../styles/default-theme/variables.css';
  @import '../styles/mixins.css';

  /*@define-mixin theme $color{
    border-color: $color;
    color: $color;
  }

  @each $item in (blue, orange, lg){
    .c-theme-$(item){
      @mixin theme $($(item));
    }
  }*/

  $prefix: c-button;

  .$prefix {
    display: flex;
    align-items: center;
    justify-content: center;

    @mixin border;
    border-color: $c-primary;
    border-radius: @width;
    border-color: $c-primary;

    color: $c-primary;
    font-size: $font-size-base;

    /*解决触控板点击click型按钮没有颜色反馈，后期可取消注释*/
    /*@mixin transition;*/

    &.is-press{
      background: $btn-press;

      &.is-on{
        background-color: $c-primary-on;
      }
    }

    &.is-on{
      color: $white;
      background-color: $blue;
    }

    span + span{
      margin-left: 0.05rem;
      margin-bottom: -1px;
    }
  }

  .c-btn-base {
    width: $btn-width-base;
    height: $btn-height-base;

    border-radius: @width;
  }

  .c-btn-sm {
    width: $btn-width-sm;
    height: $btn-height-sm;

    border-radius: @width;
  }

  .c-btn-lg {
    width: $btn-width-lg;
    height: $btn-height-lg;

    border-radius: @width;
  }

  .c-btn-disabled {
    color: $btn-disabled;
    /*background-color: $btn-disabled;*/
    border-color: $btn-disabled;
  }

  /*解决触控板点击click型按钮没有颜色反馈，后期可删除*/
  .is-transition{
    @mixin transition;
  }

  .$prefix-icon{
    font-size: calc($font-size-base + 6px);
  }
</style>
