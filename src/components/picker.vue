<template lang="html">
  <div :class="['c-picker', slideIn ? 'c-picker-slideIn' : '']">
    <header class="c-picker-title">
    </header>
    <div class="c-picker-body">
      <div class="c-picker-col" v-for="(item, index) in items">
        <div :class="['c-picker-item', activeIndex === _index ? 'c-picker-item-active' : '']" v-for="(_item, _index) in item.values">
          {{ _item }}
        </div>
      </div>
    </div>
    <div class="c-picker-highlight"></div>
  </div>
</template>

<script>
const vm = {
  name: 'v-picker',

  data() {
    return {
      slideIn: false,
      activeIndex: 2,
    };
  },

  props: {
    items: {
      type: Array,
      default() {
        return [{
          textAlign: 'center', // default 'center'
          values: [],
        }];
      },
    },
  },

  created() {
    picker();
  },

  watch: {
    slideIn(val) {
      this.$emit('change', val);
    },
  },
};

function picker() {
}

export default vm;
</script>

<style lang="css">

  .c-picker {
    position: fixed;
    top: 100%;
    width: 100%;
    background: red;
    z-index: 10;
    background: #cfd5da;

    transition: transform ease-out .3s;

    overflow: auto;
  }

  .c-picker-slideIn{
    transform: translate3d(0, -100%, 0);
  }

  .c-picker-body{
    display: flex;
    justify-content: space-around;
    -webkit-mask-box-image: -webkit-linear-gradient(bottom, transparent, transparent 5%, white 20%, white 80%, transparent 95%, transparent);
    -webkit-mask-box-image: linear-gradient(to top, transparent, transparent 5%, white 20%, white 80%, transparent 95%, transparent);
    height: calc(36px * 5);

    padding: 0 20px;
  }

  .c-picker-item{
    height: 36px;
    line-height: 36px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #999999;
    font-size: 24px;
    width: 100%;
  }

  .c-picker-highlight{
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    width: 100%;
    height: 36px;
    border-width: 1px 0;
    border-style: solid;
    border-color: #a8abb0;
    margin-top: -18px;
  }

  .c-picker-item-active{
    color: #333;
  }
</style>
