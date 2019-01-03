<!--
 * @Description: 蒙层组件
 * @Author: your name
 * @Date: 2018-11-13 14:49:59
 * @LastEditTime: 2019-01-03 18:06:21
 * @LastEditors: Please set LastEditors
 -->
<template>
  <transition :name="transition">
    <div :class="['c-mask', cls]" v-show="value" @click="handle"></div>
  </transition>
</template>

<script>

  export default {
    name: 'v-mask',

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
      /**
       * @description: 监听value的值的变化，是否有蒙层
       * @param val {Boolean} value的值
       * @return:
       */
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
      /**
       * @description: 点击mask的时候触发该事件
       * @param {}
       * @return:
       */
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
