<template>
  <transition :name="transition">
    <div :class="['c-mask',cls]" v-show="value" @click="handle"></div>
  </transition>
</template>

<script>

  export default {
    name: 'v-mask',

    data() {
      return {
      };
    },

    props: {
      value: {
        type: Boolean,
        default: false,
      },
      transition: {
        type: String,
        default: 'fade',
      },
      cls: {
        type: String,
        default: '',
      },
    },

    watch: {
      value(val) {
        if (this.value) {
          document.body.classList.add('u-ofh');
        } else {
          document.body.classList.remove('u-ofh');
        }
      },
    },

    mounted() {
      if (this.shown) {
        document.body.classList.add('u-ofh');
      }
    },

    methods: {
      handle() {
        this.$emit('click');
      },
    },
  };
</script>

<style>
  .c-mask{
    position:fixed;
    top:0;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index:100;
    background-color: rgba(0, 0, 0, 0.5);
  }
</style>
