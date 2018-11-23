<template>
  <div class="v-picker">
    <div class="v-picker-columns" :style="{height: `${itemHeight * (offsetLine + offsetLine + 1)}px`}">
      <div :style="wrapperStyle">
        <ul
          @touchstart="onTouchStart"
          @touchmove.prevent="onTouchMove"
          @touchend="onTouchEnd"
          @touchcancel="onTouchEnd"
        >
          <li v-for="index in offsetLine" :key="index" :style="{height: `${itemHeight}px`}"></li>
          <li
          :style="{height: `${itemHeight}px`, lineHeight: `${itemHeight}px`}"
          v-for="(item, index) in innerItems.displayValues"
          :key="index + offsetLine + 1"
          :class="[disableds.indexOf(index) >= 0 ? 'c-picker-disabled' : '']"
          >{{item}}</li>
          <li v-for="index in offsetLine" :key="innerItems.displayValues.length + offsetLine + index" :style="{height: `${itemHeight}px`}"></li>
        </ul>

      </div>
      <div class="c-picker-mask-top" :style="{height: `${itemHeight * offsetLine}px`}"></div>
      <div class="c-picker-mask-bottom" :style="{height: `${itemHeight * offsetLine}px`}"></div>
  </div>
  </div>

</template>

<script>

const DURATION = 200;
const ITEM_HEIGHT = 30;
const OFFSET_LINE = 3;
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

export default {
  name: 'v-picker',
  data() {
    return {
      startY: 0,
      offset: 0,
      duration: 0,
      startOffset: 0,
      currentIndex: this.active,
    };
  },
  props: {
    items: {
      type: Object,
      required: true,
      default: () => {},
    },
    itemHeight: {
      type: Number,
      required: false,
      default: () => ITEM_HEIGHT,
    },
    offsetLine: {
      type: Number,
      required: false,
      default: () => OFFSET_LINE,
    },
    id: {
      type: String,
      required: false,
      default: () => uuid,
    },

  },
  computed: {
    wrapperStyle() {
      return {
        transition: `${this.duration}ms`,
        transform: `translate3d(0, ${this.offset}px, 0)`,
        lineHeight: `${this.itemHeight}'px'`,
      };
    },
    innerItems() {
      const values = this.items.values;
      const displayValues = this.items.displayValues || values;
      return Object.assign({}, this.items, { values, displayValues });
    },
    count() {
      return this.innerItems.displayValues.length;
    },
    active() {
      return this.innerItems.active;
    },
    disableds() {
      return this.innerItems.disableds || [];
    },
  },
  watch: {
    active() {
      this.setIndex(this.active);
    },
  },
  mounted() {
    this.setIndex(this.active);
  },
  methods: {
    onTouchStart(event) {
      this.startY = event.touches[0].clientY;
      this.startOffset = this.offset;
      this.duration = 0;
    },
    onTouchMove(event) {
      const deltaY = event.touches[0].clientY - this.startY;
      this.offset = this.range(
        this.startOffset + deltaY,
        -(this.count * this.itemHeight),
        this.itemHeight,
      );
    },
    range(num, min, max) {
      return Math.min(Math.max(num, min), max);
    },
    onTouchEnd() {
      if (this.offset !== this.startOffset) {
        this.duration = DURATION;
        const index = this.range(
          Math.round(-this.offset / this.itemHeight),
          0,
          this.count - 1,
        );
        this.setIndex(index, true);
      }
    },
    setIndex(index, userAction) {

      index = this.adjustIndex(index) || 0;
      this.offset = -index * this.itemHeight;

      if (index !== this.currentIndex) {
        this.currentIndex = index;
        const val = {
          value: this.innerItems.values[index],
          displayValue: this.innerItems.displayValues[index],
          active: index,
          id: this.id,
        };
        userAction && this.$emit('change', val);
      }
    },
    adjustIndex(index) {
      index = this.range(index, 0, this.count);

      const disabledIndex = this.disableds.indexOf(index);

      if (disabledIndex === -1) {
        return index;
      }

      for (let i = index + 1; i < this.count; i += 1) {
        if (this.disableds.indexOf(i) === -1) {
          return i;
        }
      }
      for (let i = index - 1; i > 0; i -= 1) {
        if (this.disableds.indexOf(i) === -1) {
          return i;
        }
      }
      return 0;
    },
  },
};
</script>

<style scoped>
@import '../../src/styles/default-theme/variables.css';
.v-picker {
  overflow: hidden;
  -webkit-user-select: none;
  user-select: none;
  position: relative;
  background-color: #fff;
  -webkit-text-size-adjust: 100%;
  text-align: center;
  .v-picker-columns ul {
     list-style: none;
      margin: 0;
      padding: 0;
      width: 100%;

  }
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
  background-color: rgba(255, 255, 255, 0.6);
  border-top: 1px solid #ccc;
  pointer-events: none;
}
.c-picker-disabled {
  color: #aaa;
}
</style>
