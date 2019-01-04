<template lang="html">
  <v-action-box v-model="insideValue" ref="box" :mask="mask" :maskCloseable="maskCloseable">
    <div class="c-action-sheet-warpper">
      <div
      v-for="(item, index) in items"
      v-if="!item.isCancel"
      class="c-action-sheet-item"
      :style="`color: ${item.color};`"
      @click="clickHandle(index)"
      >
        {{ item.text }}
      </div>
    </div>

    <div class="c-action-sheet-warpper">
      <template v-if="_cancelItem.length > 0">
        <div
        v-for="item in _cancelItem"
        class="c-action-sheet-cancel"
        :style="`color: ${item.color};`"
        @click="cancelHandle">
          {{ item.text }}
        </div>
      </template>

      <template v-else>
        <div class="c-action-sheet-cancel" @click="cancelHandle">
          取消
        </div>
      </template>
    </div>
  </v-action-box>
</template>

<script>
export default {
  name: 'v-action-sheet',

  data() {
    return {
      // mask_shown: this.value,
      insideValue: this.value,
    };
  },

  computed: {
    _cancelItem() {
      const arr = [];
      this.items.forEach(val => {
        if (val.isCancel) {
          arr.push(val);
        }
      });

      return arr;
    },
  },

  props: {
    value: {
      type: Boolean,
      required: false,
      default: false,
    },

    items: {
      type: Array,
      required: false,
      default() {
        return [{
          text: '确定',
        }];
      },
    },

    mask: {
      type: Boolean,
      required: false,
      default: true,
    },
    maskCloseable: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  watch: {
    value(val) {
      this.insideValue = val;
    },

    insideValue(val) {
      console.log(`111:${val}`);
      this.$emit('input', val);

      // if (val) {
      //   this.mask_shown = true;

      // } else {
      //   // 300ms 是为了能够触发mask消失时的过渡动画
      //   setTimeout(() => {
      //     this.mask_shown = false;
      //   }, 300);
      // }
    },
  },

  methods: {
    clickHandle(index) {
      this.$emit('change', index);
      this.insideValue = false;
    },

    cancelHandle() {
      this.$emit('change', -1);
      this.insideValue = false;
    },

    hide() {
      this.insideValue = true;
    },

    show() {
      this.insideValue = false;
    },
  },
};
</script>

<style lang="css">
  .c-action{
    position: fixed;
    top: 100%;
    left: 0;
    right: 0;
    margin: auto;

    text-align: center;
    font-size: 18px;

    width: 100%;

    z-index: 101;

    transition: transform .3s ease-out;

    &.c-action-active{
      transform: translate(0, -100%);
    }

    .c-action-sheet-warpper{
      background: #fff;
      border-radius: 4px;
      margin: 0 .05rem;
      margin-bottom: 12px;

      > div{
        padding: 12px;
      }
    }

    .c-action-sheet-item{

      + .c-action-sheet-item{
        border-top: 1px solid #999;
      }
    }
  }
</style>
