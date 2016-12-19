<template lang="html">
  <div class='c-picker' :data-hour="`${hour}`" :data-min="`${min}`">

    <div class="c-picker-body">
      <div class="c-picker-col" v-for="(item, index) in items" ref="col" >
        <div class="c-picker-col-wrapper">
          <div :data-value="_item" :class="['c-picker-item', item.active === _index ? 'c-picker-item-active' : '']" v-for="(_item, _index) in item.values">
            {{ item.displayValues[_index] }}
          </div>
        </div>
      </div>
      <div class="c-picker-highlight"></div>
      <b class="c-picker-colon">:</b>
    </div>

  </div>
</template>

<script>
let vm;

const hour = [];
for (let i = 0; i <= 23; i += 1) {
  hour.push(i);
}

const min = [];
for (let i = 0; i <= 59; i += 1) {
  let n = 0;
  if (i < 10) {
    n = `0${i}`;
  } else {
    n = i;
  }
  min.push(n);
}

const hourActive = new Date().getHours();
const minActive = new Date().getMinutes();

export default {
  name: 'v-picker',

  data() {
    return {
      show: false,
      title: '请选择选项',
      cols: [],
      items: [{
        // textAlign: 'center', // default 'center'
        values: hour,
        active: hourActive,
      },
      {
        // textAlign: 'center', // default 'center'
        values: min,
        active: minActive,
      }],
    };
  },

  computed: {
    hour() {
      const h = this.items[0].active;
      const m = this.items[1].active;
      const value = {
        hour: h,
        min: m,
      };
      this.$emit('change', value);
      return h;
    },

    min() {
      const h = this.items[0].active;
      const m = this.items[1].active;
      const value = {
        hour: h,
        min: m,
      };
      this.$emit('change', value);
      return m;
    },
  },

  // props: {
  //   items: {
  //     type: Array,
  //     default() {
  //       return [{
  //         textAlign: 'center', // default 'center'
  //         values: [],
  //         active: 0,
  //       }];
  //     },
  //   },
  // },

  created() {
    vm = this;

    this.items.forEach((val, index) => {
      if (!this.items[index].displayValues) {
        this.$set(this.items[index], 'displayValues', this.items[index].values);
      }
    });
  },

  mounted() {
    Array.prototype.push.apply(this.cols, this.$refs.col);
    picker(this.$el, this.cols);
  },

  watch: {
    show(val) {
      this.$emit('change', val);
    },
  },
};

function picker(body, cols) {
  const options = {
    showItemNum: 7, // 一屏内显示item的个数, 应为奇数.
    itemHeight: 30,
  };
  // 一屏内的第activeShowItemIndex个item被激活
  const activeShowItemIndex = (options.showItemNum - 1) / 2;

  let touchStartY;
  let touchCurrentY;
  let touchStartTime;
  let touchEndTime;
  let diff = 0;
  let movedItem;

  // 遍历col，初始化相关属性，注册事件。
  cols.forEach((el, index) => {
    const isMoved = false;
    const isTouched = false;
    const itemList = el.getElementsByClassName('c-picker-item');
    const activeIndex = vm.items[index].active;
    const itemHeight = itemList[0].offsetHeight;
    const maxTranslate = (activeIndex) * itemHeight;
    const minTranslate = ((activeIndex + 1) - itemList.length) * itemHeight;
    const startTranslate = 0;
    const currentTranslate = 0;
    // const oneItemListHeight = (itemList.length / 3) * itemHeight;

    // 为col添加需要用到的数据
    el.isMoved = isMoved;
    el.isTouched = isTouched;
    el.colIndex = index;
    el.itemList = itemList;
    el.activeIndex = activeIndex;
    el.itemHeight = itemHeight;
    el.maxTranslate = maxTranslate;
    el.minTranslate = minTranslate;
    el.startTranslate = startTranslate;
    el.currentTranslate = currentTranslate;
    // el.oneItemListHeight = oneItemListHeight;

    const wrapper = el.getElementsByClassName('c-picker-col-wrapper')[0];
    // const marginTopBase = (itemList.length / 3) * itemHeight;
    const marginTopBase = 0;
    const marginTop = ((activeShowItemIndex - activeIndex) * itemHeight) - marginTopBase;

    wrapper.style.marginTop = `${marginTop}px`;

    el.addEventListener('touchstart', touchstartHandle);
    el.addEventListener('touchmove', touchmoveHandle);
    el.addEventListener('touchend', touchendHandle);
  });

  function setTranslate(el, y) {
    el.getElementsByClassName('c-picker-col-wrapper')[0].style.transform = `translate3d(0, ${y}px, 0)`;
  }

  function touchstartHandle(e) {
    if (this.isMoved || this.isTouched) return;
    e.preventDefault();
    this.isTouched = true;
    touchStartY = touchCurrentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    touchStartTime = (new Date()).getTime();
    this.startTranslate = this.currentTranslate;
  }

  function touchmoveHandle(e) {
    if (!this.isTouched) return;
    e.preventDefault();
    touchCurrentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

    if (!this.isMoved) {
      this.isMoved = true;
      this.startTranslate = this.currentTranslate;
    }

    diff = touchCurrentY - touchStartY;
    // 计算出现在translate的值
    this.currentTranslate = this.startTranslate + diff;

    // 判断max 与min
    if (this.currentTranslate > this.maxTranslate) {
      this.currentTranslate = this.maxTranslate;
    }
    if (this.currentTranslate < this.minTranslate) {
      this.currentTranslate = this.minTranslate;
    }

    // 解决字体模糊问题
    Math.round(this.currentTranslate);

    // 改变相应col的translate
    setTranslate(this, this.currentTranslate);
  }

  function touchendHandle() {
    if (!this.isTouched || !this.isMoved) {
      this.isTouched = this.isMoved = false;
      return;
    }

    this.isTouched = this.isMoved = false;
    touchEndTime = new Date().getTime();
    // console.log(`touchTime: ${touchEndTime - touchStartTime}`);

    // 卡对步距
    if (diff > 0) {
      this.currentTranslate -= this.currentTranslate % this.itemHeight;
    } else {
      this.currentTranslate -= this.currentTranslate % this.itemHeight;
    }
    // console.log(`this.currentTranslate:  ${this.currentTranslate}`);
    // console.log(`step:  ${this.currentTranslate % this.itemHeight}`);

    // 转变active的值
    movedItem = Math.floor((this.startTranslate - this.currentTranslate) / this.itemHeight);
    setTimeout(() => {
      vm.items[this.colIndex].active += movedItem;
    }, 300);

    // console.log(this.startTranslate);
    // console.log(movedItem);
    // console.log(`${(startTranslate - this.currentTranslate) / this.itemHeight}`);
    // console.log(`${this.currentTranslate / this.itemHeight}`);
    // console.log(`${vm.items[this.colIndex].active}`);
    // console.log(`step: ${step},this.currentTranslate: ${this.currentTranslate}`);
    // console.log(`this.currentTranslate:   ${this.currentTranslate}`);
    // console.log(',');

    setTranslate(this, this.currentTranslate);
  }
}

</script>

<style lang="css">

  $fontSize: 18px;
  $height: calc(18px + 12px);
  $colHeight: calc((18px + 12px) * 7);

  .c-picker {
    position: relative;
    width: 100%;
    z-index: 10;

    background-color: #fff;
    overflow: hidden;
  }

  .c-picker-slideIn{
    transform: translate3d(0, -100%, 0);
  }

  .c-picker-body{
    display: flex;
    justify-content: center;
    -webkit-mask-box-image: -webkit-linear-gradient(bottom, transparent, transparent 5%, white 20%, white 80%, transparent 95%, transparent);
    -webkit-mask-box-image: linear-gradient(to top, transparent, transparent 5%, white 20%, white 80%, transparent 95%, transparent);
    height: $colHeight;

    position: relative;
    left: 0;
    top: 0;
  }

  .c-picker-col{
    overflow: hidden;
  }

  .c-picker-col-wrapper{
    transition: transform 300ms ease-out;

    padding: 0 .4rem;
  }

  .c-picker-item{
    height: $height;
    line-height: $height;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #999999;
    font-size: $fontSize;
    width: 100%;

    text-align: center;
  }

  .c-picker-highlight{
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    width: 100%;
    height: $height;
    border-width: 1px 0;
    border-style: solid;
    border-color: #ccc;
    margin-top: calc(@height / -2 - 1px);

    pointer-events: none;
  }

  .c-picker-colon{
    position: absolute;
    top: 50%;
    left: 50%;

    transform: translate(0, -50%);
  }

  .c-picker-item-active{
    color: #333;
  }
</style>
