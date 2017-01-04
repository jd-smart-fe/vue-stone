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
    :name="name"
    :time="time"
    :type="_type"
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

  mounted() {
    if (this.time !== 1) {
      addSheet([
        `.c-transition-duration {
          transition-duration: ${this.time}s !important;
        }`,
        `.c-transition-duration {
          -webkit-transition-duration: ${this.time}s !important;
        }`,
        `.c-animated-duration {
          animation-duration: ${this.time}s !important;
        }`,
        `.c-animated-duration {
          webkit-animation-duration: ${this.time}s !important;
        }`,
      ]);
    }

    // if (this.time !== -1) {
    //   sheet.insertRule(`
    //     .c-transition-duration {
    //       transition-duration: ${this.time}s !important;
    //     }
    //   `, 0);
    //
    //   sheet.insertRule(`
    //     .c-animated-duration {
    //       animation-duration: ${this.time}s !important;
    //     }
    //   `, 0);
    // }
  },

  methods: {
    __beforeEnter(el) {
      this.__addCls(el, this._enterCls);
    },
    __afterEnter(el) {
      this.__rmCls(el, this._enterCls);
    },
    __enterCancelled(el) {
      this.__rmCls(el, this._enterCls);
    },

    __beforeLeave(el) {
      this.__addCls(el, this._leaveCls);
    },
    __afterLeave(el) {
      this.__rmCls(el, this._leaveCls);
    },
    __leaveCancelled(el) {
      this.__rmCls(el, this._leaveCls);
    },

    __addCls(el, cls) {
      // 添加一次判断，避免不要的操作。
      // 执行动画的情况
      if (this._leaveCls.length > 0 || this._enterCls.length > 0) {
        el.classList.add(...cls);

        if (this.time !== -1) {
          el.classList.add('c-animated-duration');
        }

      // 执行过渡的情况
      } else if (this.time !== -1) {
        el.classList.add('c-transition-duration');
      }
    },

    __rmCls(el, cls) {
      // 执行动画的情况
      if (this._leaveCls.length > 0 || this._enterCls.length > 0) {
        el.classList.remove(...cls);

        if (this.time !== -1) {
          el.classList.remove('c-animated-duration');
        }

      // 执行过渡的情况
      } else if (this.time !== -1) {
        el.classList.remove('c-transition-duration');
      }
    },
  },
};


// 动态插入css规则样式表
function addSheet(rules) {
  const style = document.createElement('style');

  // webkit 布丁
  style.appendChild(document.createTextNode(''));

  document.head.appendChild(style);

  rules.forEach(rule => {
    style.sheet.insertRule(rule, style.sheet.length - 1);
  });
}

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
