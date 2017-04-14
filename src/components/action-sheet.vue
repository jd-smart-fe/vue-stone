<template lang="html">
  <div class="">
    <div :class='["c-action", value ? "c-action-active" : "" ]'>

        <div class="c-action-warpper">
          <div
          v-for="(item, index) in items"
          v-if="!item.isCancel"
          class="c-action-item"
          :style="`color: ${item.color};`"
          @click="clickHandle(index)"
          >
          {{ item.text }}
        </div>
      </div>

      <div class="c-action-warpper">
        <template v-if="_cancelItem.length > 0">
          <div
          v-for="item in _cancelItem"
          class="c-action-cancel"
          :style="`color: ${item.color};`"
          @click="cancelHandle">
            {{ item.text }}
          </div>
        </template>

        <template v-else>
          <div class="c-action-cancel" @click="cancelHandle">
            取消
          </div>
        </template>

      </div>

    </div>

    <transition name="fade">
      <v-mask v-show="value" :shown="mask_shown"></v-mask>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'v-action-sheet',

  data() {
    return {
      mask_shown: this.value,
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
  },

  watch: {
    value(val) {
      if (val) {

        this.mask_shown = true;
      } else {

        // 300ms 是为了能够触发mask消失时的过渡动画
        setTimeout(() => {
          this.mask_shown = false;
        }, 300);
      }
    },
  },

  methods: {
    clickHandle(index) {
      this.$emit('change', index);
    },

    cancelHandle() {
      this.$emit('change', -1);
      this.$emit('input', false);
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

    width: 3.1rem;

    z-index: 101;

    transition: transform .3s ease-out;

    &.c-action-active{
      transform: translate(0, -100%);
    }

    .c-action-warpper{
      background: #fff;
      border-radius: 4px;
      margin-bottom: 12px;


      > div{
        padding: 12px;
      }
    }

    .c-action-item{

      + .c-action-item{
        border-top: 1px solid #999;
      }
    }
  }
</style>
