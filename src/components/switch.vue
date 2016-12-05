<template>

	<div
    :class="['c-switch', disabled ? 'is-disabled' : '', state === 'on' ? 'is-on' : 'is-off']"
    @click="handle">
		<span class="c-switch-button"></span>
	</div>
</template>

<script>

  export default {

    props: {
      state: {
        required: false,
        type: String,
        default: 'off', // on, off
      },
      disabled: {
        required: false,
        type: Boolean,
        default: false,
      },
    },

    computed: {
      value() {
        return this.state;
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
        this.$emit('change', this.value === 'on' ? 'off' : 'on');
      },
    },
  };
</script>

<style scoped>

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

		.c-switch-button {

			top: calc($swtich-height / 2);
	    left: 0;
      width: $swtich-button-size;
      height: $swtich-button-size;
      transform: translate($switch-button-padding-x, calc(-$swtich-button-size / 2));

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
      }
    }

    &.is-off {

    }
	}
</style>