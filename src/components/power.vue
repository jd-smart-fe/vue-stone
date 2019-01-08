<template>

  <div
    :class="['c-power', disabled ? 'is-disabled' : '', value ? 'is-on' : 'is-off']"
    @click="handle">
    <input v-model="_value" :disabled="disabled"
      type="checkbox" class="u-hidden c-power-checkbox" />
    <span class="c-power-icon v-icon-power"></span>
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
      hold: {
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
        if (this.hold) {
          this.$emit('change', this.value);
          return;
        }
        this._value = !this.value;
      },

      update(val) {
        if (val === 'toggle') {
          this.$emit('change', !this.value);
          this.$emit('input', !this.value);
          return;
        }

        this.$emit('change', val);
        this.$emit('input', val);
      },
    },
  };
</script>

<style lang="postcss">

  @import '../styles/default-theme/variables.css';
  @import '../styles/mixins.css';

  $prefix: .c-power;

  $prefix {

    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    width: $power-width;
    height: $power-height;
    box-sizing: border-box;

    @mixin border;
    @mixin transition background-color;

    border-color: $gray-lightest;
    border-radius: 100%;

    background-color: $t-power-offcolor;

    /**
     * 解决 Android 4.2 版本 border-radius 和 background 的 Bug
     */
    background-clip: padding-box;

    $(prefix)-icon {
      color: $t-power-oncolor;
    }

    &.is-on {
      background-color: $t-power-oncolor;
      $(prefix)-icon {
        color: $t-power-offcolor;
      }
    }

    &.is-disabled {
      background-color: $t-power-disabled;
      $(prefix)-icon {
        color: $t-power-offcolor;
      }
    }

    &.is-off {}
  }


</style>
