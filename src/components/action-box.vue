<template lang="html">
  <div class="">
    <div :class='["c-action", insideValue ? "c-action-active" : "" ]'>
      <slot></slot>
    </div>

    <v-mask v-if="mask" :value="insideValue" @click.native="maskClick"></v-mask>
  </div>
</template>

<script>
export default {
  name: 'v-action-box',

  data() {
    return {
      insideValue: this.value,
    };
  },

  props: {
    value: {
      type: Boolean,
      required: false,
      default: false,
    },
    mask: {
      type: Boolean,
      required: false,
      default: true,
    },
    maskCloseable: {
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
    },
  },

  methods: {
    hide() {
      this.insideValue = false;
    },

    show() {
      this.insideValue = true;
    },

    maskClick() {
      if (this.maskCloseable) {
        this.insideValue = false;
      }
    },
  },
};
</script>

<style lang="postcss">
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
