<template lang="html">
  <div class="">
    <div :class='["c-actions", value ? "c-actions-active" : "" ]'>
      <div class="c-actions-warpper">
        <div
          v-for="(item, index) in items"
          class="c-actions-item"
          @click="clickHandle(index)"
          >
          {{ item.text }}
        </div>
      </div>
      <div class="c-actions-warpper">
        <div class="c-actions-cancel" @click="cancelHandle">
          取消
        </div>
      </div>
    </div>

    <v-mask v-show="value" :shown="true"></v-mask>
  </div>
</template>

<script>
export default {
  name: 'v-actions',

  data() {
    return {};
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

  methods: {
    clickHandle(index) {
      this.$emit('change', index);
    },

    cancelHandle() {
      this.$emit('input', false);
    },
  },
};
</script>

<style lang="css">
  .c-actions{
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

    &.c-actions-active{
      transform: translate(0, -100%);
    }

    .c-actions-warpper{
      background: #fff;
      border-radius: 4px;
      margin-bottom: 12px;


      > div{
        padding: 12px;
      }
    }

    .c-actions-item{

      + .c-actions-item{
        border-top: 1px solid #999;
      }
    }

  }
</style>
