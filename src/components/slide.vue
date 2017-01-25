<!--
slide 性能优化问题及总结：
1.
  问题：在手机上 touchend 后会出现短暂的卡顿。

  背景：slide 的切屏是由 value 的值直接决定的。当滑动屏幕后松开，组件先去改变双向绑定的 value 值，然后由 value
       的 watcher 去改变 this.translateX 从而达到切屏的目的。
       而 Vue 是异步执行 DOM 更新，只有在一个事件循环完成后才会去更新 Dom。根据Chrome DevTools Timeline显示，
       touchend事件占据了大量的执行时间，根据调研是由于双向绑定 v-model 引起的。

  方案：slide 的切屏逻辑应由组件内部值 insideValue 决定。保留双向绑定的特性，但要异步的同步双向绑定的数据。

  结果：Chrome DevTools Timeline 10 * slowdown：
       优化前：touchend事件触发后到下一帧渲染时的时间间隔 180ms
       优化后：touchend事件触发后到下一帧渲染时的时间间隔 68ms
 -->

<template>
  <div class="c-slide">
    <div class="c-slide-warpper">

      <slot name="item" class="c-slide-item"></slot>

    </div>
    <div v-if="pagination" class="c-slide-pagination">
      <div class="c-slide-pagination-bar">
        <i v-for="item in length" :class="['c-slide-pagination-item', item - 1 === insideValue ? 'active': '']"></i>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'v-slide',

  data() {
    return {
      ele: {}, // 缓存 dom
      width: 0,
      insideValue: this.value,
      length: 0,
      minMoveDistance: 60, // 成功触发切换 item 的最小滑动距离
    };
  },

  props: {
    value: {
      type: Number,
      required: false,
      default: 0,
    },
    pagination: {
      type: Boolean,
      required: false,
      default: true,
    },
  },

  watch: {
    value() {

      // this.setTranslateByValue();
    },

    insideValue(val) {
      // this.setTranslateByValue();
      // this.$emit('change', val);
    },
  },

  computed: {
    style() {

      return `
      transform: translate3d(${this.translateX}px, 0, 0);
      webkitTransform: translate3d(${this.translateX}px, 0, 0);
      webkitTransform: webkitTranslate3d(${this.translateX}px, 0, 0);
      `;
    },
  },

  mounted() {

    // 缓存dom节点
    this.ele = this.$el.getElementsByClassName('c-slide-warpper')[0];

    // 初始化 width，minMoveDistance
    this.resetPixel();

    // 设定初始 translateX 位置
    this.ele.dataset.translatex = -(this.width * this.length);

    // 为 item 添加类名
    this.$slots.item.forEach(val => {

      val.elm.classList.add('c-slide-item');
    });

    // 初始化 item 长度
    this.length = this.$slots.item.length;

    // 执行核心函数
    this.core();
  },

  methods: {
    resetPixel() {

      const style = getComputedStyle(this.$el, false).width;
      this.width = parseInt(style, 10);

      // 初始化 minMoveDistance 最小触发距离
      this.minMoveDistance = this.width / 5.5;
    },

    core() {
      const that = this;
      const minMoveDistance = 60; // 成功触发切换 item 的最小滑动距离

      let translateX = this.ele.dataset.translatex * 1;
      let touchStartX = 0;
      let moveDistance = 0;
      let startTranslateX = 0;
      let inindex = 0;

      const setTranslateX = 'webkitTransform' in that.ele.style
      ? setTranslateXnormal
      : setTranslateXsub;

      this.ele.addEventListener('touchstart', startHandle);
      this.ele.addEventListener('touchmove', moveHandle);
      this.ele.addEventListener('touchend', endHandle);
      this.ele.addEventListener('touchcancel', endHandle);

      function startHandle(e) {
        // 先同步函数内部的 translateX
        translateX = that.ele.dataset.translatex * 1;

        // 记录初始坐标
        touchStartX = e.targetTouches[0].pageX;
        startTranslateX = translateX;

        // 取消过渡效果
        that.ele.style.transitionDuration = '0ms';
      }

      function moveHandle(e) {
        // 计算移动距离
        moveDistance = e.targetTouches[0].pageX - touchStartX;

        // 判断最大值与最小值
        if (moveDistance > 0) {

          translateX = startTranslateX + moveDistance > 0
          ? 0
          : startTranslateX + moveDistance;

          setTranslateX(translateX);
        } else if (moveDistance < 0) {

          translateX = startTranslateX + moveDistance < -that.width * (that.length - 1)
          ? -that.width * (that.length - 1)
          : startTranslateX + moveDistance;

          setTranslateX(translateX);
        }
      }

      function endHandle(e) {

        if (Math.abs(moveDistance) > Math.abs(that.minMoveDistance)) {
          if (moveDistance > 0 && inindex > 0) {

            inindex -= 1;
            changeIndex(inindex);
          } else if (moveDistance <= 0 && inindex < that.length - 1) {

            inindex += 1;
            changeIndex(inindex);
          }

          return;
        }

        changeIndex(inindex);
      }

      function setTranslateXnormal(x) {
        that.ele.style.transform = `translate3d(${x}px, 0, 0)`;
      }

      function setTranslateXsub(x) {
        that.ele.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
      }

      function changeIndex(index) {

        const trans = -(that.width * index);
        setTranslateX(trans);

        that.ele.style.transitionDuration = '300ms';
        setTimeout(() => {
          that.ele.style.transitionDuration = '0ms';
        }, 300);

        that.ele.dataset.translatex = trans;
      }
    },

    // 根据value值重置translateX
    // setTranslateByInsideValue() {
    //
    //   this.translateX = -(this.insideValue * this.width);
    //
    //   this.ele.style.transitionDuration = '300ms';
    //
    //   setTimeout(() => {
    //     this.ele.style.transitionDuration = '0ms';
    //   }, 300);
    // },
  },
};
</script>

<style lang="css">
  .c-slide{
    width: 100%;
    overflow: hidden;
    position: relative;
  }

  .c-slide-warpper{
    width: 100%;
    height: 100%;
    display: flex;
  }

  .c-slide-item{
    width: 100%;
    flex-shrink: 0;
  }

  .c-slide-pagination{
    position: relative;
    height: 0;

    .c-slide-pagination-bar{
      position: absolute;
      left: 0;
      right: 0;
      top: -12px;
      bottom: 0;
      height: 4px;

      display: flex;
      justify-content: center;
      align-items: flex-start;
    }

  }

  .c-slide-pagination-item{
    display: block;
    width: 8px;
    height: 4px;
    border-radius: 3px;
    background-color: rgb(181,181,181);
    margin: 0 3px;
    transition: all .1s;

    &.active{
      width: 20px;
      background-color: rgb(72,163,241);
    }
  }
</style>
