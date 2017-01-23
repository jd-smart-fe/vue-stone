<template>
  <div class="c-slide">
    <div class="c-slide-warpper" :style="style">

      <slot name="item" class="c-slide-item"></slot>

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
  },

  watch: {
    value() {

      this.setTranslateByValue();
    },
  },

  computed: {
    style() {

      return `transform: translate3d(${this.translateX}px, 0, 0);`;
    },
  },

  mounted() {

    // 缓存dom节点
    this.ele = this.$el.getElementsByClassName('c-slide-warpper')[0];

    // 初始化 item 宽度
    this.width = this.getWidth(this.$el);

    // 初始化 minMoveDistance 最小触发距离
    this.minMoveDistance = this.width / 5.5;

    // 为 item 添加类名
    this.$slots.item.forEach(val => {

      val.elm.classList.add('c-slide-item');
      val.elm.style.width = `${this.width}px`;
    });

    // 缓存 item 长度
    this.length = this.$slots.item.length;

    // 执行核心函数
    this.core();
  },

  methods: {
    getWidth(obj) {

      const style = getComputedStyle(obj, false).width;
      return parseInt(style, 10);
    },

    addWebKit() {

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

</style>
