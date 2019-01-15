<template>
  <span
    :class="['icon', name ? name : '']"
    :style="{fontSize: size ? size : '', color: color ? color : ''}"
  ></span>
</template>

<script>
  export default {
    name: 'v-icon',
    props: {
      name: {
        type: String,
        required: false,
        default: '',
      },
      size: {
        type: String,
        required: false,
        default: '',
      },
      color: {
        type: String,
        required: false,
        default: '',
      },
    },
  };
</script>

<style lang="postcss">

  @import '../styles/default-theme/variables.css';

</style>
