<!--
*******
******* Tips：
******* 点击按钮会触发 change 事件， switch型按钮会额外携带一个包含当前开关状态的参数。
******* 禁用按钮后不会触发 change 事件。
******* longTap === true 时，开启长按功能，按下按钮 1000ms 后，每 150ms 触发一次 change 事件。
*******
 -->

<template>
  <div
  :class="[ 'c-button',
            `c-${size}`,
            disabled ? 'is-disabled' : '',
            isActive ? 'is-active' : '',
            isOn ? 'is-on' : '',
            /*解决触控板点击click型按钮没有颜色反馈，后期可删除*/
            size === 'switch' ? 'is-transition' : ''
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
      isActive: false,
      isOn: false,
      longTapFlag: false,
    };
  },

  props: {
    // 按钮类型
    type: {
      type: String,
      required: false,
      default: 'switch',
      validator(value) {
        const list = ['switch', 'click'];
        return list.indexOf(value) >= 0;
      },
    },
    // 按钮大小
    size: {
      type: String,
      required: false,
      default: 'base',
      validator(value) {
        const list = ['sm', 'base', 'lg'];
        return list.indexOf(value) >= 0;
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
  },

  methods: {
    touchstartHandle() {
      if (this.disabled) {
        return;
      }
      this.isActive = true;

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
      this.isActive = false;
      this.$emit('change', !this.isOn);

      if (this.longTap) {
        window.clearInterval(longTapFlagInterval);
        this.longTapFlag = false;
        longTapFlagInterval = null;
      }

      if (this.type === 'click') {
        return;
      }

      this.isOn = !this.isOn;
    },
  },
};
</script>

<style scoped>
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

    &.is-active{
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

  .c-base {
    width: $btn-width-base;
    height: $btn-height-base;

    border-radius: @width;
  }

  .c-sm {
    width: $btn-width-sm;
    height: $btn-height-sm;

    border-radius: @width;
  }

  .c-lg {
    width: $btn-width-lg;
    height: $btn-height-lg;

    border-radius: @width;
  }

  .is-disabled {
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
