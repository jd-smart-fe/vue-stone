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

<style>

  @import '../styles/default-theme/variables.css';
  @import '../styles/mixins.css';

  $prefix: .c-panel;

  $prefix {
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

  $(prefix)-header {
    padding: 0.12rem;

    min-height: calc(2 * $grid-size);
    border-bottom: 1px solid #eee;

    font-size: $font-size-lg;
    color: $gray-dark;
    box-sizing: border-box;
  }

  $(prefix)-extra {
    width: calc(2 * $grid-size);
    text-align: right;
    .icon {
      font-size: $font-size-xl;
      display: inline-block;
    }
  }

  $(prefix)-body {
    padding: 0.12rem;

/*    padding-left: 0.12rem;
    padding-right: 0.12rem;
*/  }
    $(prefix)-introduce{
      font-size: $font-size-sm;
      padding-top: 0.08rem;
      }
  $(prefix)-footer {

  }

</style>
