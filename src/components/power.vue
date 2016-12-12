<template>

  <div
    :class="['c-power', disabled ? 'is-disabled' : '', value ? 'is-on' : 'is-off']"
    @click="handle">
    <input v-model="_value" :disabled="disabled"
      type="checkbox" class="u-hidden c-power-checkbox" />
    <span class="c-power-icon"></span>
  </div>
</template>

<script>

  export default {
    name: 'v-power',
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
    },

    computed: {
      _value: {
        get() {
          return this.value;
        },
        set(val) {
          this.$emit('input', val);
          this.$emit('change', val);
        },
      },
    },

    data() {
      return {
      };
    },

    methods: {

      handle() {
        // state: disabled
        if (this.disabled) {
          return;
        }
        this._value = !this.value;
      },
    },
  };
</script>

<style>

  @import '../styles/default-theme/variables.css';
  @import '../styles/mixins.css';

  .c-power {

    position: relative;
    display: inline-block;
    width: $power-width;
    height: $power-height;
    box-sizing: border-box;

    @mixin border;
    @mixin transition background-color;

    border-color: $gray-lightest;
    border-radius: 100%;

    background-color: $t-power-offcolor;

    &.is-disable {

    }

    &.is-on {

      background-color: $t-power-oncolor;
      .c-power-icon {

      }
    }

    &.is-off {

    }
  }
</style>
