<template>
  <!-- <div class="box"> -->
     <div  :class="['c-picker-wrapper', `c-${id}`]"  :style="{height: `${itemHeight * (offsetLine + offsetLine + 1)}px`}">

    <ul class="c-picker-scroller" >
      <li v-for="index in offsetLine" :key="index" :style="{height: `${itemHeight}px`}"></li>
      <li
       v-for="(item,index) in innerItems.displayValues" :key="index + offsetLine + 1"
       :style="{height: `${itemHeight}px`, lineHeight: `${itemHeight}px`}">{{item}}</li>
      <li v-for="index in offsetLine" :key="innerItems.displayValues.length + offsetLine + index" :style="{height: `${itemHeight}px`}"></li>
    </ul>
    <div class="c-picker-mask-top" :style="{height: `${itemHeight * offsetLine}px`}"></div>
    <div class="c-picker-mask-bottom" :style="{height: `${itemHeight * offsetLine}px`}"></div>
</div>
  <!-- </div> -->


</template>

<script>
import { IScroll } from '../libs/iscroll-lite';

const uuid = () => {
  const s = [];
  const hexDigits = '0123456789abcdef';
  for (let i = 0; i < 36; i += 1) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
  // eslint-disable-next-line no-bitwise
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-';
  const uid = s.join('');
  return uid;
};

const TRANSITIONEND = [
  'transitionend',
  'webkitTransitionEnd',
  'oTransitionEnd',
  'MSTransitionEnd',
];

export default {
  name: 'v-picker',
  data() {
    return {
    };
  },
  props: {
    mode: {
      type: String,
      required: false,
      default: 'inline',
    },
    items: {
      type: Object,
      required: true,
      default: () => {},
    },
    itemHeight: {
      type: Number,
      required: false,
      default: () => 30,
    },
    offsetLine: {
      type: Number,
      required: false,
      default: () => 2,
    },
    id: {
      type: String,
      required: false,
      default: uuid,
    },
  },
  computed: {
    innerItems() {
      const values = this.items.values;
      const displayValues = this.items.displayValues || values;
      return Object.assign({}, this.items, { values, displayValues });
    },
  },
  mounted() {
    this.__init();
  },
  methods: {
    /**
     * 一个下划线 _init 被 Vue 框架 占用了，所以用了两个下划线
     */
    __init() {
      const wrapperDom = this.wrapperDom = document.querySelector(
        `.c-${this.id}`,
      );
      this.ulDom = this.wrapperDom.querySelector('ul');
      this.iscroll = new IScroll(wrapperDom, {
        momentum: true,
      });
      this.iscroll.on('beforeScrollStart', () => {
        /**
         * 因为在 iscrollEnd 时间中设置了 transitionDuration 的值，
         * 在手机端会在 move 时导致 卡顿，所以在这里设置为 0ms。
         */
        this.iscroll.scrollerStyle.transitionDuration = '0ms';
        this._addTransitionendEvent();
      });
      wrapperDom.addEventListener(
        'touchmove',
        e => {
          e.preventDefault();
        },
        false,
      );
      this.iscroll.on('scrollEnd', () => {
        // console.log('end')
        // const values = this.innerItems.values;
        // window.console.log('cancel');
        // const toIndex = this.calcOffsetIndex();
        // this.$emit('change', { id: this.id, values: values[toIndex] });
        this.setOffsetPX();
      });
      // /**
      //  * 扩展事件，原库中没有这个事件，给原库增加了一个 touchend 事件
      //  */
      // this.iscroll.on('touchend', () => {
      //   const values = this.innerItems.values;
      //   const toIndex = this.calcOffsetIndex();
      //   this.$emit('change', { id: this.id, values: values[toIndex] });
      //   // this.setOffsetPX();
      // });
      this.iscroll.on('scrollCancel', () => {

        this.setOffsetPX();
      });
      this.setValue(this.innerItems.active);
    },
    calcOffsetIndex() {
      const itemHeight = this.itemHeight;
      const endY = Math.abs(this.iscroll.y);
      let toIndex = Math.round(endY / itemHeight);
      const values = this.innerItems.values;
      const count = values.length - 1;
      if (endY >= count * itemHeight) {
        toIndex = count;
      }
      return toIndex;
    },
    setOffsetPX() {
      const endY = Math.abs(this.iscroll.y);
      const itemHeight = this.itemHeight;
      const remainder = endY % itemHeight;
      const toIndex = this.calcOffsetIndex();
      const offsetPX = toIndex * itemHeight;
      this.iscroll.y = -offsetPX;

      const values = this.innerItems.values;
      const value = values[toIndex];
      this.$emit('change', { id: this.id, value, active: toIndex });

      // 取消 Transitionend 的时间监听，避免触发两次 scrollEnd。
      this._removeTransitionendEvent();
      const transitionDuration = (remainder / itemHeight) * 600;
      // window.console.log(transitionDuration);
      this.iscroll.scrollerStyle.transitionDuration = `${transitionDuration}ms`;
      this.iscroll.scrollerStyle.transform = `translate(0px, ${-offsetPX}px) translateZ(0px)`;
    },
    setValue(obj) {
      this.iscroll.scrollTo(0, -obj * this.itemHeight);
    },
    _addTransitionendEvent() {
      TRANSITIONEND.forEach(item => {
        this._addEvent(this.ulDom, item, this.iscroll);
      });
    },
    refresh() {
      this.$nextTick(() => {
        this.iscroll.refresh();
      });
    },
    _addEvent(el, type, fn, capture) {
      el.addEventListener(type, fn, !!capture);
    },
    _removeTransitionendEvent() {
      TRANSITIONEND.forEach(item => {
        this._remove(this.ulDom, item, this.iscroll);
      });
    },
    _remove(el, type, fn, capture) {
      el.removeEventListener(type, fn, !!capture);
    },
  },
  destroyed() {
    // window.console.log('destroy');
    this.iscroll.destroy();
  },
};
</script>
<style scoped>
.c-picker-wrapper {
  position: relative;
  height: 200px;
  overflow: hidden;
  /* border: 1px solid red; */
}
.c-picker-scroller {
  position: absolute;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
}
.c-picker-scroller li {
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.c-picker-mask-top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  /* height: calc(calc(40px) * 2 - 1px); */
  background-color: rgba(255, 255, 255, 0.6);
  border-bottom: 1px solid #ccc;
  pointer-events: none;
}
.c-picker-mask-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  /* height: calc(calc(40px) * 2 - 1px); */
  background-color: rgba(255, 255, 255, 0.6);
  border-top: 1px solid #ccc;
  pointer-events: none;
}
/* .box{
  position: relative;
  height:  150px;
  width: 33%
} */
</style>

