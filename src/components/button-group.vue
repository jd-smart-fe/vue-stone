<template>
  <div :class="['c-btnGroup', wrap ? 'c-btnGroup-wrap': '']">
      <v-button class="c-btnGroup-btn" v-for="(item, index) in items"
      ref="btn"
      type="toggle"
      :text="item.text"
      :initStatus="initStatus[index]"
      :hold="holds[index]"
      @turnOn="turnOnHandle(index)"
      @touchend.native="touchendHandle(index)"
      ></v-button>
  </div>
</template>

<script>
export default {

  name: 'v-button-group',

  data() {
    return {
      holds: [],
      initStatus: [],
    };
  },

  props: {
    items: {
      type: Array,
      required: false,
    },
    exclusive: {
      type: Boolean,
      required: false,
      default: true,
    },
    wrap: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'base',
    },
  },

  created() {
    let flag = false;
    const list = Array(this.items.length).fill(false);

    this.items.forEach((val, index) => {
      if (val.initStatus === true && flag === false) {
        list[index] = true;
        flag = true;
      }
    });

    if (!flag) {
      list[0] = true;
    }
    // 初始化hold数组
    this.holds = list;
    this.initStatus = list;
  },

  methods: {
    turnOnHandle(index) {
      if (this.$refs.btn[index].hold) {
        return;
      }

      this.holds.forEach((val, i) => {
        if (i === index) {
          this.holds.splice(i, 1, true);
          return;
        }
        this.holds.splice(i, 1, false);
        this.$refs.btn[i].status = false;
      });
    },

    touchendHandle(index) {
      this.$emit('change', index);
    },
  },
};
</script>

<style>
  @import '../styles/base.css';

  .c-btnGroup{
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
  }

  /*.c-btnGroup-wrap{
    flex-wrap: wrap;
    flex: none;
  }*/

  .c-btnGroup-btn + .c-btnGroup-btn{
    margin-left: 16px;
  }
</style>
