<template lang="html">
  <v-button :size="size" :icon='icon' :radius='radius' :disabled='disabled' :htmlType='htmlType'
    :class="[
      value ? 'c-btn-on' : ''
    ]"
    @touchend.native="handleTouchend">
    <slot></slot></v-button>
</template>

<script>
export default {
  name: 'v-button-switch',
  data() {
    return {
    };
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    radius: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    htmlType: {
      type: String,
      default: 'button',
    },
    hold: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    handleTouchend() {
      if (this.disabled || this.hold) return;

      this.$emit('change', !this.value);
      this.$emit('input', !this.value);
    },
  },
};
</script>

<style lang="css">
@import '../styles/default-theme/variables.css';
@import '../styles/mixins.css';


.c-btn-hover.c-btn-on{
  background-color: $c-primary-on;
}

.c-btn-on{
  color: $white;
  background-color: $blue;

  &.c-btn-disabled {
    opacity: .6;
  }
}
</style>
