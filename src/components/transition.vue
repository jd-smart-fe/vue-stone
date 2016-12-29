<template lang="html">
  <transition
    :name="name"
    :enter-active-class="_enterCls"
    :leave-active-class="_leaveCls"
  >
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: 'v-transition',

  data() {
    return {};
  },

  props: {
    name: {
      type: String,
      required: false,
      default: 'fade',
    },

    enter: {
      type: String,
      required: false,
      default: 'fadeIn',
    },

    leave: {
      type: String,
      required: false,
      default: 'fadeOut',
    },
  },

  computed: {
    _enterCls() {
      return `animated ${this.name}`;
    },

    _leaveCls() {
      return `animated ${this.name}`;
    },
  },
};
</script>

<style lang="css">
@import "../styles/animate.css";

  /*.fade-enter-active, .fade-leave-active{
    transition: all .3s ease;
  }*/

  .fade-enter, .fade-leave{
    opacity: 0;
  }
</style>
