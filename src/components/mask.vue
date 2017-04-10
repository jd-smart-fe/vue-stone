<template>
  <div class="c-mask" v-show="shown" @click="handle"></div>
</template>

<script>

  export default {
    name: 'v-mask',
    props: {
      shown: {
        type: Boolean,
        default: true,
      },
    },
    methods: {
      handle() {
        this.$emit('click');
      },
    },
    watch: {
      shown() {
        if (this.shown) {
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
