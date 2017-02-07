<!--
TODO
itemHeight 以后要动态获取，目前改变窗口大小后可能会无法正常工作。
-->

<template lang="html">
<div>
  <v-mask :shown="shown" ref="mask"></v-mask>

  <div :class="[display!=='inline'?'c-picker-modal':'',shown?'c-picker-modal-show':'']">

  <div v-if="display!=='inline'" class="c-picker-head" :style="{color:button_color}">
    <span class="c-picker-head-cancel" @click="handle('cancel')">{{cancelText}}</span>
    <span class="c-picker-head-test">{{head_direction}}</span>
    <span class="c-picker-head-determine" @click="handle('determine')">{{determineText}}</span>
  </div>
   <div class='c-picker'>
    <div class="c-picker-body">

      <div class="c-picker-col" v-for="(item, index) in innerItems" ref="col" >
        <div class="unit" ref="unit">{{getUnit(index)}}</div>
        <div :class="['c-picker-col-wrapper', `c-picker-col-${index}`]">

          <div :data-value="_item" :class="['c-picker-item', item.active === _index ? 'c-picker-item-active' : '']" v-for="(_item, _index) in item.values">
            {{ item.displayValues[_index] }}
          </div>
        </div>
      </div>
      <div class="c-picker-mask-top"></div>
      <div class="c-picker-mask-bottom"></div>
      <!-- <div class="c-picker-unit">
        <span class="c-picker-unit-hour">时</span>
        <span class="c-picker-unit-colon">:</span>
        <span class="c-picker-unit-min">分</span>
      </div> -->

    </div>
  </div>
</div>
</div>

</template>


<script>

// import button './button';

export default {
  name: 'v-picker',

  data() {
    return {
      show: false,
      title: '请选择选项',
      innerItems: [], // 复制并改进items
      init: false,
      cancelText: '取消',
      determineText: '确定',
    };
  },

  props: {
    rotate_effect: {
      type: Boolean,
      default: true,
    },
    items: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    display: {
      type: String,
      required: false,
      default: 'inline',
    },
    button_color: {
      type: String,
      required: false,
      default: '#59B8FC',
    },
    head_direction: {
      type: String,
      required: false,
      default: '',
    },
    shown: {
      type: Boolean,
      required: false,
      default: false,
    },
    unit: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },

  },

  computed: {
    value() {
      const arr = this.innerItems.map(val => val.values[val.active]);
      return arr;
    },
  },

  watch: {
    show(val) {
      this.$emit('change', val);
    },

    value(val) {
      this.$emit('change', val);
    },

    items() {
      this.update();
    },
  },

  created() {

    this._setInnterItems();
  },

  mounted() {

    this._callPickerHandle();
    this.init = true;
    this.$refs.mask.$on('click', () => {
      this.$emit('pickerMaskClick');
    });
    const units = this.$refs.unit;

    [...units].forEach((item, index) => {
      const currentInnerItems = Object.assign({}, this.innerItems);
      // console.debug(currentInnerItems === this.innerItems);
      const longest = currentInnerItems[index].displayValues.sort((a, b) => b.length - a.length)[0];
      // console.debug((longest.length * 16) / 4);
      const innerWidth = window.innerWidth;
      const unitWidth = this.$refs.unit[index].offsetWidth;
      const oneWidth = innerWidth / this.items.length;
      const left = ((1 / 2) * oneWidth) + ((longest.length * 16) / 4);
      this.$refs.unit[index].style.left = `${left + 15}px`;
    });
  },

  methods: {
    update() {
      this._setInnterItems();
      this.$nextTick(() => {
        this._callPickerHandle();
      });
    },
    getUnit(index) {

      return this.unit.length - 1 < index ? '' : this.unit[index];
    },

    handle(val) {
      console.debug(JSON.stringify(this.value));
      const obj = {
        select: val,
        value: this.value,
      };
      this.$emit('select', obj);
    },

    _setInnterItems() {
      const arr = this.items.map((val, index) => {
        if (!this.items[index].displayValues) {
          const values = this.items[index].values;
          const newObj = Object.assign({}, this.items[index], { displayValues: values });

          return newObj;
        }

        return val;
      });

      this.innerItems = arr;
    },

    _callPickerHandle() {
      const arr = [];
      Array.prototype.push.apply(arr, this.$refs.col);

      picker(this.$el, arr, this);
    },
  },

};


function picker(container, cols, vm) {
  const options = {
    showItemNum: 7, // 一屏内显示item的个数, 应为奇数.
    // itemHeight: 50,
  };

  // 用于计算初始margin高度
  const activeShowItemIndex = (options.showItemNum - 1) / 2;

  let touchStartY;
  let touchCurrentY;
  // let touchStartTime;
  // let touchEndTime;
  let diff = 0;
  let movedItem;

  // 遍历col，初始化相关属性，注册事件。
  cols.forEach((el, index) => {
    const isMoved = false;
    const isTouched = false;
    const itemList = el.getElementsByClassName('c-picker-item');
    const wrapper = el.getElementsByClassName('c-picker-col-wrapper')[0];

    const activeIndex = vm.innerItems[index].active;
    // TODO
    // itemHeight 以后要动态获取，目前改变窗口大小后可能会无法正常工作。
    const itemHeight = parseInt(window.getComputedStyle(itemList[0], null).height, 10);
    const maxTranslate = 0;
    const minTranslate = -(itemList.length - 1) * itemHeight;
    const startTranslate = 0;
    const currentTranslate = 0;


    // 为col添加需要用到的数据
    el.wrapper = wrapper;
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
    el.rotateEffect = vm.rotate_effect;


    // const marginTopBase = (itemList.length / 3) * itemHeight;
    const marginTopBase = 0;

    const marginTop = (activeShowItemIndex * itemHeight) - marginTopBase;


    wrapper.style.marginTop = `${marginTop}px`;

    el.currentTranslate = -vm.innerItems[index].active * itemHeight;
    setTranslate(el, el.currentTranslate);

    if (!vm.init) {

      el.addEventListener('touchstart', touchstartHandle);
      el.addEventListener('touchmove', touchmoveHandle);
      el.addEventListener('touchend', touchendHandle);
      el.addEventListener('touchcancel', touchendHandle);
    }
  });

  function setTranslate(el, y) {
    const pickerColList = el.getElementsByClassName('c-picker-col-wrapper');

    pickerColList[0].style.transform = `translate3d(0, ${y}px, 0)`;
    pickerColList[0].style.WebkitTransform = `translate3d(0, ${y}px, 0)`;
    const pickerColItems = pickerColList[0].getElementsByClassName('c-picker-item');

    if (el.rotateEffect) {
      [...pickerColList].forEach(item => {
        item.classList.add('c-picker-col-wrapper-3d');
      });
    }

    const list = [...pickerColItems];
    list.forEach((item, index) => {

      const itemOffsetTop = index * el.itemHeight;
      const translateOffset = 0 - y;
      const itemOffset = itemOffsetTop - Math.abs(translateOffset);

      const percentage = itemOffset / el.itemHeight;

      let angle = (-18 * percentage);// 0
      if (angle > 180) {
        angle = 180;
      }
      if (angle < -180) {
        angle = -180;
      }
      if (!el.rotateEffect) {
        return;
      }
      item.style.transform = `translate3d(0,${-y + 0}px,0) rotateX(${angle}deg)`;
      item.style.WebkitTransform = `translate3d(0,${-y + 0}px,0) rotateX(${angle}deg)`;
    });


  }

  function touchstartHandle(e) {

    if (this.isMoved || this.isTouched) return;
    e.preventDefault();
    this.isTouched = true;
    touchStartY = touchCurrentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
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
    // 解决微信滑动到头部不触发touchend

    // 改变相应col的translate
    setTranslate(this, this.currentTranslate);
  }

  function touchendHandle() {

    if (!this.isTouched || !this.isMoved) {
      this.isTouched = this.isMoved = false;
      return;
    }

    this.isTouched = this.isMoved = false;

    // 卡对步距
    if (diff > 0) {
      this.currentTranslate -= this.currentTranslate % this.itemHeight;
    } else {
      this.currentTranslate -= this.currentTranslate % this.itemHeight;
    }

    // 转变active的值
    movedItem = Math.floor((this.startTranslate - this.currentTranslate) / this.itemHeight);

    setTimeout(() => {
      const n = vm.innerItems[this.colIndex];
      n.active += movedItem;
      vm.innerItems.splice(this.colIndex, 1, n);

      // vm.innerItems[this.colIndex].active += movedItem;
    }, 300);

    setTranslate(this, this.currentTranslate);
  }
}
</script>

<style lang="css">
 @import '../styles/default-theme/variables.css';

  $fontSize: 16px;
  $height: calc(16px + 14px);
  $colHeight: calc((16px + 14px) * 7);

  .c-picker {
    position: relative;
    width: 100%;

    background-color: #fff;
    overflow: hidden;
  }

  .c-picker-slideIn{
    transform: translate3d(0, -100%, 0);
  }

  .c-picker-body{
    flex: auto;
    display: flex;
    justify-content: center;
    -webkit-mask-box-image: -webkit-linear-gradient(bottom, transparent, transparent 5%, white 20%, white 80%, transparent 98%, transparent);
    -webkit-mask-box-image: linear-gradient(to top, transparent, transparent 5%, white 20%, white 80%, transparent 98%, transparent);

    height: $colHeight;


    position: relative;
    left: 0;
    top: 0;
  }

 .c-picker-col{
    flex: auto;
    overflow: hidden;

    position:relative;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-perspective:700px;
    perspective:700px;
  }

  .c-picker-col-wrapper{
    transition: transform 300ms ease-out;
    position:relative;
  }
  .c-picker-col-wrapper-3d{
    position:relative;
    transition: transform 300ms ease-out;
    transform-style: "preserve-3d";

  }
  .c-picker-item{
    height: $height;
    line-height: $height;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #333;
    font-size: $fontSize;
    width: 100%;
    text-align: center;

  }
 .c-picker-col-wrapper-3d > .c-picker-item{
    height: $height;
    line-height: $height;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #333;
    font-size: $fontSize;
    width: 100%;
    text-align: center;
	  transform-style: preserve-3d;
    white-space: nowrap;
    position:absolute;
    overflow: hidden;
    text-overflow: ellipsis;
    left: 0;
    top: 0;
    box-sizing: border-box;
    transition: .3s;
    transform-origin: center center -90px;
    backface-visibility: hidden;
    transition-timing-function: ease-out;

  }

  .c-picker-mask-top{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc($height * 3 - 1px);
    background-color: rgba(255,255,255,0.6);
    border-bottom: 1px solid #ccc;
    pointer-events: none;
  }

  .c-picker-mask-bottom{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: calc($height * 3 - 1px);
    background-color: rgba(255,255,255,0.6);
    border-top: 1px solid #ccc;
    pointer-events: none;
  }
  .c-picker-head{
    margin: 0.05rem 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: #ccc solid 0.01rem;
  }
  .c-picker-head > span{
    display: inline-flex;
    width:0.5rem;
    height:0.3rem;
    justify-content:center;
    align-items: center;
  }
  .c-picker-head > .c-picker-head-test{
    color : $gray;
    width: auto;
  }
  .c-picker-item-active{
  }
  .c-picker-modal{
    position :fixed;
    bottom: 0;
    left:0;
    width: 100%;
    transform: translateY(100%);
    background-color:$white;
    transition: transform 0.5s;
    border-top:0.01rem solid #ccc;
    z-index:101;
  }
  .c-picker-modal-show{
    transform: translateY(0);
  }
  .unit{
    position: absolute;
    height: 0.3rem;
    top: 50%;
    margin-top: -0.15rem;
    z-index: 100;
    line-height: 0.3rem;
    text-align: center;

}
</style>
