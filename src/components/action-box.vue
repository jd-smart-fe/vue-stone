<template lang="html">
  <div class="">
    <div :class='["c-action", insideValue ? "c-action-active" : "" ]'>
      <slot></slot>
    </div>

    <transition name="fade">
      <v-mask v-show="insideValue" :shown="mask_shown"></v-mask>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'v-action-box',

  data() {
    return {
      mask_shown: this.value,
      insideValue: this.value,
    };
  },

  props: {
    value: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  watch: {
    value(val) {
      this.insideValue = val;
    },

    insideValue(val) {
      this.$emit('input', val);

      if (val) {
        this.mask_shown = true;

      } else {
        // 300ms 是为了能够触发mask消失时的过渡动画
        setTimeout(() => {
          this.mask_shown = false;
        }, 300);
      }
    },
  },

  methods: {
    hide() {
      this.insideValue = false;
    },

    show() {
      this.insideValue = true;
    },
  },
};
</script>

<style lang="css">
  .c-action{
    position: fixed;
    top: 100%;
    left: 0;
    right: 0;
    margin: auto;

    width: 100%;

    text-align: center;
    font-size: inherit;

    z-index: 101;

    transition: transform .3s ease-out;

    &.c-action-active{
      transform: translate(0, -100%);
    }
  }
</style>
