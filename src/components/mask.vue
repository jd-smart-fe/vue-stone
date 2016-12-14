<template>
  <div class="c-mask" v-show="shown" @click="handle">

  </div>
</template>

<script>
  // TODO: 组件初始化的时候，检查是否需要设置默认值。
  export default {
    name: 'v-mask',
    props: {
      shown: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        mask: 0,
      };
    },
    methods: {
      handle() {
        this.$emit('input');
      },
    },
    watch: {
      shown() {
        console.log(this.shown);
        if (this.shown) {
          document.body.classList.add('u-ofh');
        } else {
          document.body.classList.remove('u-ofh');
        }
      },
    },
    mounted() {
      // document.body.classList.add('u-ofh');
    },
  };
</script>

<style>
  @import '../styles/default-theme/variables.css';
  @import '../styles/mixins.css';

  .c-mask{
        position:fixed;
        top:0;
        bottom: 0;
        width: 100%;
        opacity:0.7;
        z-index:100;
        background-color:#000;
  }
</style>
