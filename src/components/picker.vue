<template lang="html">
  <div :class="['c-picker', slideIn ? 'c-picker-slideIn' : '']" @click="slideIn = false">
    <header class="c-picker-title">
    </header>
    <div class="c-picker-body">
      <div class="c-picker-col">
        <div :class="['c-picker-item', activeIndex === index ? 'c-picker-item-active' : '']" v-for="(item, index) in items">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-picker',

  data() {
    return {
      slideIn: false,
      items: ['item', 'item', 'item', 'item', 'item', 'item', 'item'],
      activeIndex: 3,
    };
  },

  watch: {
    slideIn(val) {
      this.$emit('change', val);
    },
  },
};
</script>

<style lang="css">

  .c-picker {
    position: fixed;
    top: 100%;
    width: 100%;
    /*height: calc(30px * 5);*/
    background: red;
    z-index: 10;
    background: #cfd5da;

    transition: transform ease-out .3s;
    
    font-size: 18px;
    line-height: 20px;
    color: #999999;
    
    /*overflow: hidden;*/
  }

  .c-picker-slideIn{
    transform: translate3d(0, -100%, 0);
  }

  .c-picker-body{
    display: flex;
    flex-direction: column;
    align-items: center;
    -webkit-mask-box-image: -webkit-linear-gradient(bottom, transparent, transparent 5%, white 20%, white 80%, transparent 95%, transparent);
    -webkit-mask-box-image: linear-gradient(to top, transparent, transparent 5%, white 20%, white 80%, transparent 95%, transparent);
  }
  
  .c-picker-item{
    padding: 5px;
  }
  
  .c-picker-item-active{
    color: #333;
  }
</style>
