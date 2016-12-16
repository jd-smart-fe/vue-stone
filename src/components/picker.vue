<template lang="html">
  <div :class="['c-picker', show ? 'c-picker-slideIn' : '']">

    <header class="c-picker-title">
      <span>{{ title }}</span>
      <button @click="show = false">确定</button>
    </header>

    <div class="c-picker-body">
      <div class="c-picker-col" v-for="(item, index) in items">
        <div :class="['c-picker-item', activeIndex === _index ? 'c-picker-item-active' : '']" v-for="(_item, _index) in item.values">
          {{ _item }}
        </div>
      </div>
      <div class="c-picker-highlight"></div>
    </div>

  </div>
</template>

<script>
const vm = {
  name: 'v-picker',

  data() {
    return {
      show: false,
      activeIndex: 2,
      title: '请选择选项',
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

  mounted() {
    picker(this.$el);

    this.$el.addEventListener('touchmove', (e) => {
      e.stopPropagation;
      e.preventDefault;
    });
  },

  watch: {
    show(val) {
      this.$emit('change', val);

      // if (val) {
      //   document.body.classList.add('u-ofh');
      // } else {
      //   document.body.classList.remove('u-ofh');
      // }
    },
  },
};

function picker(el) {

  let isTouched = false;
  let isMoved = false;
  let touchStartY = false;
  let touchCurrentY = false;
  let touchStartTime;
  // let touchEndTime = false;
  let currentTranslate = 0;
  let startTranslate = 0;

  let allowItemClick = false;

  el.addEventListener('touchstart', touchstartHandle);
  el.addEventListener('touchmove', touchmoveHandle);
  el.addEventListener('touchend', touchendHandle);

  function setTranslate(y) {
    el.style.transform = `translate3d(0, ${y}, 0)`;
  }

  function touchstartHandle(e) {
    if (isMoved || isTouched) return;
    e.preventDefault();
    isTouched = true;
    touchStartY = touchCurrentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    touchStartTime = (new Date()).getTime();

    allowItemClick = true;
    startTranslate = currentTranslate;
  }

  function touchmoveHandle(e) {
    if (!isTouched) return;
    e.preventDefault();
    allowItemClick = false;
    touchCurrentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

    if (!isMoved) {
      isMoved = true;
      startTranslate = currentTranslate;
    }

    const diff = touchCurrentY - touchStartY;
    currentTranslate = startTranslate + diff;

    //
    // 判断max 与min
    //

    setTranslate(currentTranslate);

    //
    // 判断item
    //
  }

  function touchendHandle() {
    if (!isTouched || !isMoved) {
      isTouched = isMoved = false;
      return;
    }
    isTouched = isMoved = true;


    //
    // 判断步距
    //

    // ...
    // ...
    // ...
  }
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

    overflow: hidden;
  }

  .c-picker-slideIn{
    transform: translate3d(0, -100%, 0);
  }

  .c-picker-title{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;

    position: relative;
    top: 0;
    left: 0;

    height: 44px;
    padding-right: 20px;
    padding-left: 20px;
    background-color: #f7f7f8;

    border-width: 1px 0;
    border-style: solid;
    border-color: #a8abb0;

    button {
      position: absolute;
      right: 0;

      font-size: 16px;
    }
  }

  .c-picker-body{
    display: flex;
    justify-content: space-around;
    -webkit-mask-box-image: -webkit-linear-gradient(bottom, transparent, transparent 5%, white 20%, white 80%, transparent 95%, transparent);
    -webkit-mask-box-image: linear-gradient(to top, transparent, transparent 5%, white 20%, white 80%, transparent 95%, transparent);
    height: calc(36px * 5);

    position: relative;
    left: 0;
    top: 0;

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
