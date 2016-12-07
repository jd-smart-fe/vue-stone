<template>

  <div :class="['c-grid']" @click="handle">
    grid
  </div>
</template>

<script>

  export default {
    name: 'v-grid',
    props: {

    },

    data() {
      return {};
    },

    methods: {
      handle() {
        this.$emit('change');
      },
    },
  };
</script>

<style scoped>

  @import '../styles/default-theme/variables.css';
  @import '../styles/mixins.css';

  .c-grid {

  }
</style>