<template lang="html">
  <v-button
    :size="size"
    :icon='icon'
    :radius='radius'
    :disabled='disabled'
    :htmlType='htmlType'
    :class="[insideValue ? 'c-btn-on' : '']"
    @touchend.native="handleTouchend"
    :style="{'border-color': borderColor && !insideValue ? borderColor: ''}"
  >
    <slot></slot>
  </v-button>
</template>

<script>
export default {
  name: 'v-button-switch',

  data() {
    return {
      // insideValue 保证了在组件不依赖与 value 值的传入
      insideValue: this.value,
      keep: false,
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
    syncHold: {
      type: Boolean,
      default: false,
    },
    // 给添加一个borderColor, 进行颜色配置;
    borderColor: {
      type: String,
      required: false,
      default: '',
    },
  },

  watch: {
    value(val) {
      this.insideValue = val;
      this.keep = false;
    },

    insideValue(val) {
      this.$emit('input', val);
    },
  },

  methods: {
    update(val) {
      this.$emit('input', val);
    },

    handleTouchend() {
      if (this.disabled || this.keep) return;

      this.$emit('change', !this.insideValue);

      // sync hold
      if (this.syncHold) {
        return;

      // async hold
      } else if (this.hold && !this.keep) {
        this.keep = true;
        return;
      }

      this.insideValue = !this.insideValue;
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


.c-btn.c-btn-hover.c-btn-on{
  background-color: $c-primary;
  border-color: $c-primary;
}

.c-btn{
  &.c-btn-disabled {
    opacity: .6;
  }
  &.c-btn-on{
    color: $white;
    background: $c-primary;
    border-color: $c-primary;
  }
}

</style>
