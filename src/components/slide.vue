<template>
  <div class="c-slide">
    <div class="c-slide-warpper" :style="style">

      <slot name="item" class="c-slide-item"></slot>

    </div>
    <div v-if="pagination" class="c-slide-pagination">
      <div class="c-slide-pagination-bar">
        <i v-for="item in length" :class="['c-slide-pagination-item', item - 1 === value ? 'active': '']"></i>
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
      length: 0,
      translateX: 0,
      touchStartX: 0,
      moveDistance: 0,
      startTranslateX: 0,
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

      this.setTranslateByValue();
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

    // // 初始化 item 宽度
    // this.width = this.getWidth(this.$el);
    //
    // // 初始化 minMoveDistance 最小触发距离
    // this.minMoveDistance = this.width / 5.5;

    this.resetPixel();

    // 为 item 添加类名
    this.$slots.item.forEach(val => {

      val.elm.classList.add('c-slide-item');
    });

    // 缓存 item 长度
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

      this.ele.addEventListener('touchstart', this.startHandle);
      this.ele.addEventListener('touchmove', this.moveHandle);
      this.ele.addEventListener('touchend', this.endHandle);
      this.ele.addEventListener('touchcancel', this.endHandle);
    },

    startHandle(e) {

      this.touchStartX = e.targetTouches[0].pageX;
      this.startTranslateX = this.translateX;

      this.ele.style.transitionDuration = '0';
    },

    moveHandle(e) {

      this.moveDistance = e.targetTouches[0].pageX - this.touchStartX;

      // 判断最大值与最小值
      if (this.moveDistance > 0) {

        this.translateX = this.startTranslateX + this.moveDistance > 0
        ? 0
        : this.startTranslateX + this.moveDistance;
      } else if (this.moveDistance < 0) {

        this.translateX = this.startTranslateX + this.moveDistance < -this.width * (this.length - 1)
        ? -this.width * (this.length - 1)
        : this.startTranslateX + this.moveDistance;
      }
    },

    endHandle(e) {

      if (Math.abs(this.moveDistance) > Math.abs(this.minMoveDistance)) {

        if (this.moveDistance > 0 && this.value > 0) {

          this.$emit('input', this.value - 1);
        } else if (this.moveDistance <= 0 && this.value < this.length - 1) {

          this.$emit('input', this.value + 1);
        }

        return;
      }

      this.setTranslateByValue();
    },

    setTranslateByValue() {

      this.ele.style.transitionDuration = '300ms';
      this.translateX = -(this.value * this.width);

      setTimeout(() => {
        this.ele.style.transitionDuration = '0ms';
      }, 300);
    },
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
