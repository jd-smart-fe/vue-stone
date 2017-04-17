<template>
  <div
    :class="['c-toast', value ? 'c-toast-show' : 'c-toast-hide']">
    <span class="c-toast-text">{{text}}</span>
  </div>
</template>

<script>

  export default {
    name: 'v-toast',
    props: {
      value: {
        type: Boolean,
        default: false,
      },
      duration: {
        type: Number,
        default: 3000,
      },
      text: {
        type: String,
        default: '',
      },
    },

    data() {
      return {
        timer: null,
      };
    },

    updated() {
      if (!this.value) {
        return;
      }
      this.timer = setTimeout(() => {
        this.hide(false);
      }, this.duration);
    },

    methods: {

      hide(val) {
        this.$emit('input', val);
      },
    },
  };
</script>

<style>

  @import '../styles/default-theme/variables.css';
  @import '../styles/mixins.css';

  $prefix: .c-toast;

  $prefix {
    position:fixed;
    top: 45%;
    left: 50%;
    width: 80%;
    max-width: 80%;
    transform:translate(-50%,-50%);

    text-align:center;
    z-index:10000;
    font-size: inherit;

    background: rgba(0, 0, 0, 0.8);
    border-radius: $l-radius;

    &.c-toast-hide {
      display: none;
    }

    &.c-toast-show {
      display: block;
    }
  }

  .c-toast-text {
    color: white;
    display: inline-block;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    max-width: 100%;
    width: auto;
    padding: 10px 10px;
  }

</style>
