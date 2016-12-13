<template>
  <div class="c-btnGroup">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'v-button-group',

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
      default: false,
    },
  },

  mounted() {
    this.list = Object.values(this.$children);

    this.list.forEach((val, index, array) => {

      val.$on('turnOn', () => {

        val.hold = true;
        this.$emit('change', index);
        array.filter(fVal => fVal !== val).forEach(eVal => {
          eVal.hold = false;
          eVal.status = false;
        });
      });
    });
  },

  methods: {
    changeHandle() {
      console.log(this);
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
