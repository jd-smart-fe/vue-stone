<template lang="html">
  <transition
    :name="name"
    :type="type"
    @before-enter="__beforeEnter"
    @after-enter="__afterEnter"
    @enterCancelled="__enterCancelled"

    @before-leave="__beforeLeave"
    @after-leave="__afterLeave"
    @leaveCancelled="__leaveCancelled"
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

    type: {
      type: String,
      required: false,
      default: '',
    },

    enter: {
      type: String,
      required: false,
      default: '',
    },

    leave: {
      type: String,
      required: false,
      default: '',
    },
  },

  computed: {
    _enterCls() {
      if (this.enter) {
        return ['animated', this.enter];
      }
      return [];
    },

    _leaveCls() {
      if (this.leave) {
        return ['animated', this.leave];
      }
      return [];
    },
  },

  methods: {
    __beforeEnter(el) {
      this.__addAni(el, this._enterCls);
    },
    __afterEnter(el) {
      this.__rmAni(el, this._enterCls);
    },
    __enterCancelled(el) {
      this.__rmAni(el, this._enterCls);
    },

    __beforeLeave(el) {
      this.__addAni(el, this._leaveCls);
    },
    __afterLeave(el) {
      this.__rmAni(el, this._leaveCls);
    },
    __leaveCancelled(el) {
      this.__rmAni(el, this._leaveCls);
    },

    __addAni(el, cls) {
      // 添加一次判断，避免不要的操作。
      if (this._leaveCls.length > 0) {
        el.classList.add(...cls);
        //
        // el.style.animationDuration = `${this.time}s`;
        // el.style.webkitAnimationDuration = `${this.time}s`;
      }
    },

    __rmAni(el, cls) {
      if (this._leaveCls.length > 0) {
        el.classList.remove(...cls);
        //
        // el.style.animationDuration = '';
        // el.style.webkitAnimationDuration = '';
      }
    },

    __addDuration(el) {

    },

    __rmDuration(el) {

    },
  },
};
</script>

<style lang="css">
@import "../styles/animate.css";


  /*.fade-enter-active, .fade-leave-active{
    transition: all .3s ease;
  }

  .fade-enter, .fade-leave{
    opacity: 0;
  }*/
</style>
