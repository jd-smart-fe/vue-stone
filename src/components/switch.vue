<!--
 * @Descripttion:
 * @Author: shilili1
 * @Date: 2018-11-13 14:49:59
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-06 11:20:56
 -->
<template>

	<div :class="['c-switch',
      disabled && 'c-switch-disabled',
      insideValue ? 'c-switch-on' : 'c-switch-off',
      isAndroid_v4_2 ? 'c-switch-fix-bug' : '']"
    @click="handle">
		<span class="c-switch-button"></span>
	</div>
</template>

<script>

  export default {
    name: 'v-switch',
    data() {
      return {
        insideValue: this.value,
        keep: false,  // false: 可以响应，true： 不可响应交互
        isAndroid_v4_2: false,
      };
    },

    props: {
      value: {
        type: Boolean,
        default: false,
      },

      disabled: {
        required: false,
        type: Boolean,
        default: false,
      },

      hold: {
        required: false,
        type: Boolean,
        default: false,
      },
    },

    watch: {
      insideValue(val) {
        if (this.hold) {
          this.keep = false;
        }
        this.$emit('input', val);
      },

      value(val) {
        if (this.hold) {
          this.keep = false;
        }
        this.insideValue = val;
      },
    },

    created() {
      /**
       * 修复 Android 4.2 样式bug
       */
      this.isAndroid_v4_2 = /Android 4\.2/.test(window.navigator.userAgent);
    },

    methods: {
      handle() {
        // state: disabled
        if (this.disabled) {
          return;
        }

        if (this.keep) {
          return;
        }

        const val = !this.value;
        if (this.hold) {
          this.keep = true;
          this.$emit('change', val);
          return;
        }

        this.insideValue = val;
        this.$emit('change', val);
      },

      update(val) {
        if (val === 'toggle') {
          this.$emit('change', !this.insideValue);
          this.insideValue = !this.insideValue;
          return;
        }

        this.$emit('change', val);
        this.insideValue = val;
      },

      relive() {
        this.keep = false;
      },
    },
  };
</script>

<style lang="postcss">
	@import '../styles/default-theme/variables.css';
  @import '../styles/mixins.css';

  /**
  *  Andriod 4.2.x 在有 border-radius 的情况下，background 溢出。
  */
  .c-switch-fix-bug {
    background-clip: padding-box;
  }

	.c-switch {

    position: relative;
		display: inline-block;
		width: $switch-width;
		height: $switch-height;

		border-radius: 50px;
    flex:none;

    background-color: $switch-background-color-off;
    border-color: $switch-background-color-off;

    transition-property: border-color, background-color, transform;
    transition-duration: .3s;
    transition-timing-function: ease;

	}

  .c-switch-button {
    top: 0;
    bottom: 0;
    left: 0;
    margin: auto 0;
    width: $switch-btn-width;
    height: $switch-btn-height;
    transform: translate3d($switch-transform-x-off, 0, 0);

    position: absolute;
    border-radius: 100%;
    transition-property: border-color, transform;
    transition-duration: .3s;
    transition-timing-function: ease;
    z-index: 2;
    background-color: $switch-btn-background-color;

    box-shadow: 0px 3px 4px rgba(100,100,100,.25);
  }

  .c-switch-disabled{
    opacity: .7;
  }

  .c-switch-on {
    background-color: $switch-background-color-on;
    border-color: $switch-background-color-on;

    .c-switch-button {
      transform: translate3d($switch-transform-x-on, 0, 0);
    }
  }

</style>
