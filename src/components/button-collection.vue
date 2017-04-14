<template>
  <div class="c-btngroup">
      <v-button class="c-btngroup-btn" v-for="(item, index) in items"
      ref="btn"
      type="toggle"
      :size="size"
      :text="item.text"
      :init_status="item.id === value"
      :hold="true"
      @touchend.native="touchendHandle(item.id)"
      @touchcancel.native="touchendHandle(item.id)"
      ></v-button>
  </div>
</template>

<script>
export default {

  name: 'v-button-collection',

  data() {
    return {
    };
  },

  props: {
    value: {
      type: Number,
      required: false,
      default: 0,
    },
    items: {
      type: Array,
      required: false,
    },
    size: {
      type: String,
      default: 'base',
    },
  },

  computed: {
    _ids() {
      const arr = this.items.map(val => val.id);
      return arr;
    },
  },

  watch: {
    // TODO:
    // 应修改：
    // 改变value会触发两次watcher，从而触发两次遍历
    value() {

      this.$refs.btn.forEach((val, index) => {

        if (this._ids[index] === this.value) {
          val.update(true);
        } else {
          val.update(false);
        }
      });
    },
  },

  methods: {
    touchendHandle(id) {
      this.$emit('input', id);
      this.$emit('change', id);
    },
  },
};
</script>

<style>
  @import '../styles/base.css';

  .c-btngroup{
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
  }
  .c-btngroup-btn + .c-btngroup-btn{
    margin-left: 16px;
  }
</style>
