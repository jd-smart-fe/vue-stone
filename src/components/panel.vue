<template>

  <div :class="['c-panel', cls]">
    <slot name="header"></slot>
    <slot name="body"></slot>
    <slot name="footer"></slot>
  </div>
</template>

<script>

  export default {
    name: 'v-panel',
    props: {
      cls: {
        type: String,
        default: '',
      },
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
    width: $panel-width;
    margin: auto;
    box-sizing: border-box;

    font-size: $font-size-lg;

    background: #fff;

    @mixin border;
    @mixin box-shadow;
    border-color: #eee;
    border-radius: $l-radius;

    &:not(:first-child) {
      margin-top: 10px;
    }
  }

  .c-panel-header {
    padding-left: 0.12rem;
    padding-right: 0.12rem;

    height: calc(2 * $grid-size);
    border-bottom: 1px solid #eee;

    font-size: $font-size-lg;
    color: $gray-dark;
    box-sizing: border-box;
  }
  .c-panel-body {
    padding-left: 0.12rem;
    padding-right: 0.12rem;
  }
  .c-panel-footer {

  }

</style>
