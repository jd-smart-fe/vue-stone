<template>

	<div
    :class="['c-switch', disabled ? 'is-disabled' : '', value ? 'is-on' : 'is-off']"
    @click="handle">
		<span class="c-switch-button"></span>
	</div>
</template>

<script>

  export default {
    name: 'v-switch',
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

    data() {
      return {};
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

        const val = !this.value;
        this.$emit('input', val);
        this.$emit('change', val);
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

<style>

	@import '../styles/default-theme/variables.css';
  @import '../styles/mixins.css';

	.c-switch {

    position: relative;
		display: inline-block;
		width: $switch-width;
		height: $swtich-height;
    /*box-sizing: border-box;*/

    @mixin border;
    border-color: $t-switch-offcolor;
		border-radius: 50px;
    -webkit-flex:none;
    flex:none;
		.c-switch-button {

			top: calc($swtich-height / 2);
	    left: 0;
      width: $swtich-button-size;
      height: $swtich-button-size;
      transform: translate($switch-button-padding-x, calc(-$swtich-button-size / 2));
      -webkit-transform: translate($switch-button-padding-x, calc(-$swtich-button-size / 2));

	    position: absolute;
	    border-radius: 100%;
      @mixin transition transform;

	    z-index: 2;
	    background-color: $t-switch-offcolor;
		}

    &.is-disable {
      /* TODO: border-color, background-clor */
    }

    &.is-on {
      border-color: $t-switch-oncolor;
      .c-switch-button {
        background-color: $t-switch-oncolor;
        transform: translate(calc($switch-width - $switch-button-padding-x - $swtich-button-size),
          calc(-$swtich-button-size / 2));
        -webkit-transform: translate(calc($switch-width - $switch-button-padding-x - $swtich-button-size),
          calc(-$swtich-button-size / 2));
      }
    }

    &.is-off {

    }
	}
</style>
