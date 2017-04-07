<template lang="html">
  <div class="">
    <div :class='["c-actions", value ? "c-actions-active" : "" ]'>
      <slot></slot>
    </div>

    <transition name="fade">
      <v-mask v-show="value" :shown="mask_shown"></v-mask>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'v-actions-box',

  data() {
    return {
      mask_shown: this.value,
    };
  },

  computed: {
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
};
</script>

<style lang="css">
  .c-actions{
    position: fixed;
    top: 100%;
    left: 0;
    right: 0;
    margin: auto;

    text-align: center;
    font-size: inherit;

    z-index: 101;

    transition: transform .3s ease-out;

    &.c-actions-active{
      transform: translate(0, -100%);
    }
  }
</style>
