<template>

  <div :class="['c-grid']" >

  </div>
</template>

<script>

  export default {
    name: 'v-grid',
  };
</script>

<style>

  @import '../styles/default-theme/variables.css';
  @import '../styles/mixins.css';

  .c-grid {
    margin-left: -1px;
    margin-right: -1px;
    display: flex;
    flex-wrap: wrap;
  }
</style>
