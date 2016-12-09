<template>
  <div class="c-btnGroup">
    <slot v-for="item in items" name="item.name"></slot>
  </div>
</template>

<script>
export default {
  name: 'v-button-group',

  data() {
    return {};
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
};
</script>

<style>

</style>
