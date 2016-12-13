<template>
  <div class="c-btnGroup">
    <v-button v-for="(item, index) in items"
              ref="btn"
              type="toggle"
              :text="item.text"
              :hold="false"
              @turnOn="turnOnHandle"
              ></v-button>
  </div>
</template>

<script>
export default {
  name: 'v-button-group-new',

  data() {
    return {
      list: [],
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
    this.list = Object.values(this.$children);
    // 自动添加属性
    this.list.forEach((val, index) => {
      Object.assign(val, this.items[index]);
    });
    console.log(this.list[0].hold);
  },

  methods: {
    turnOnHandle(status, vm) {
      console.log('statatata');
      if (vm.hold === false) {
        this.$refs.btn[0].hold = true;
        console.log(this.$refs.btn[0]);
        return;
      }
      vm.hold = false;
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
