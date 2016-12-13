<template>
  <div class="c-btnGroup">
    <v-button v-for="(item, index) in items"
              ref="btn"
              type="toggle"
              :text="item.text"
              :initStatus="initStatusaa"
              :hold="hold[index]"
              @turnOn="turnOnHandle(index)"
              ></v-button>
  </div>
</template>

<script>
export default {

  name: 'v-button-group-new',

  data() {
    return {
      hold: [],
      initStatus: [],
      initStatusaa: true,
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
  },

  mounted() {

    // this.list = Object.values(this.$children);
    // console.log(this.list);
    // // 将item里的属性合并到v-button上
    // this.list.forEach((val, index) => {
    //   this.list = Object.assign({}, val, this.items[index]);
    // });

    // 初始化hold数组
    const list = Array(this.$children.length).fill(false);
    list[0] = true;
    this.initStatus = list;
  },

  methods: {
    turnOnHandle() {
      // 按钮被按下后就会保持hold状态
      // if (this.hold[index] === false) {
      //   this.hold[index] = true;
      //   this.hold.filter((ele, i) => i !== index).forEach(val => {
      //     val = false;
      //   });
      //   return;
      // }
      // this.hold[index] = false;
      // console.log(this.hold);
      // console.log(this.hold)
    },
  },
};
</script>

<style>
  .c-btnGroup{
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: raw;

    width: 100%;
  }

</style>
