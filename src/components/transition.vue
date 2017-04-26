<!--
HOW TO USE

情境一： 使用过渡效果时。
接受两个参数 name time
name值为必须值
time为可选值，默认值是0.3  单位为s

情境二： 使用动画效果时
接受三个参数 enter leave time
enter 设置元素进入动画 如bounceIn 可选值可参考animate.css
leave 设置元素离开动画 如bounceOut 可选值可参考animate.css
time 设置元素动画持续时间 默认值 1 单位s
 -->

<template lang="html">
  <transition
    :enter-active-class="_enterActCls"
    :leave-active-class="_leaveActCls"
    :enter-class="_enterCls"
    :leave-class="_leaveCls"
  >
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: 'v-transition',

  data() {
    return {
      str: `_${Math.random().toString(36).substr(2)}`,
      // str: `uid${this._uid}`,
    };
  },

  props: {
    name: {
      type: String,
      required: false,
      default: '',
    },

    time: {
      default: -1,
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
    _type() {
      if (this.name !== '') {
        return 'transition';
      }

      return 'animation';
    },

    _enterActCls() {
      if (this.enter) {
        return [
          'animated',
          this.enter,
          `c-animated-duration_${this.str}`,
        ].join(' ');
      }
      return [
        'fade-enter-active',
        `c-transition-duration_${this.str}`,
      ].join(' ');
    },

    _leaveActCls() {
      if (this.leave) {
        return [
          'animated',
          this.leave,
          `c-animated-duration_${this.str}`,
        ].join(' ');
      }
      return [
        'fade-leave-active',
        `c-transition-duration_${this.str}`,
      ].join(' ');
    },

    _enterCls() {
      if (this.name) {
        return `${this.name}-enter`;
      }
      return '';
    },

    _leaveCls() {
      if (this.name) {
        return `${this.name}-leave`;
      }
      return '';
    },
  },

  mounted() {
    if (this._type === 'animation') {
      this.__mountedAni();
    } else if (this._type === 'transition') {
      this.__mountedTrans();
    } else {
      this.$error('props error, please check props again!');
    }
  },

  // 实例销毁前删除相应的样式表
  beforeDestroy() {
    const styleSheet = document.querySelector(`#${this.str}`);
    document.head.removeChild(styleSheet);
  },

  methods: {
    __mountedAni() {
      if (this.time === -1) { return; }

      this.__addSheet([
        `.c-animated-duration_${this.str} {
          animation-duration: ${this.time}s !important;
          webkit-animation-duration: ${this.time}s !important;
        }`,
      ]);
    },

    __mountedTrans() {
      if (this.time === -1) { return; }

      this.__addSheet([
        `.c-transition-duration_${this.str} {
          transition-duration: ${this.time}s !important;
          -webkit-transition-duration: ${this.time}s !important;
        }`,
      ]);
    },

    // 动态插入css规则样式表
    __addSheet(rules) {
      const style = document.createElement('style');

      // webkit 布丁
      style.appendChild(document.createTextNode(''));

      style.id = this.str;
      document.head.appendChild(style);

      rules.forEach(rule => {
        style.sheet.insertRule(rule, style.sheet.length - 1);
      });
    },
  },
};

</script>
<style lang="css">
  @import "../styles/animate.css";
  .fade-enter-active, .fade-leave-active{
    transition: all .3s ease;
  }

  .fade-enter, .fade-leave{
    opacity: 0;
  }
</style>
