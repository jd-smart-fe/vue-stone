<template>

  <div class="c-panel">
    <slot name="title"></slot>
    <slot name="main"></slot>
    
  </div>
</template>

<script>

  export default {

    props: {
      title: {
        type: String,
        default: 'Panel Title',
      },
    },
  };
</script>

<style scoped>

  @import '../styles/default-theme/variables.css';
  @import '../styles/mixins.css';

  .c-panel {
    height: calc($grid-size * 2);
    width: $panel-width;
    margin: auto;
    box-sizing: border-box;

    padding-left: 0.12rem;
    padding-right: 0.12rem;

    font-size: $font-size-lg;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    background: #fff;

    @mixin border;
    border-color: #eee;
    border-radius: 3px;

    &:not(:first-child) {
      margin-top: 10px;
    }

    &.c-panel-lg {
      height: calc($grid-size * 3);
    }
  }
</style>
