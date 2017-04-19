<template>

  <div class="c-panel">
    <slot name="header"></slot>
    <slot name="body"></slot>
    <slot name="footer"></slot>
  </div>
</template>

<script>

  export default {
    name: 'v-panel',
  };
</script>

<style>

  @import '../styles/default-theme/variables.css';
  @import '../styles/mixins.css';

  $fullwidth: 97.5%;
  $padding: 3.75%;
  $desc-padding: 2.5%;
  $prefix: .c-panel;

  $prefix {
    width: $fullwidth;
    margin: auto;
    font-size: $font-size-lg;
    @mixin border;
    @mixin box-shadow;
    background: #fff;
    border-color: #eee;
    border-radius: $l-radius;
    box-sizing: border-box;

    &:not(:first-child) {
      margin-top: 10px;
    }
  }

  $(prefix)-header, $(prefix)-footer {
    @mixin cross-center;
    padding: $padding;

    min-height: calc(2 * $grid-size);

    font-size: $font-size-lg;
    color: $gray-dark;
    box-sizing: border-box;
  }

  $(prefix)-header {
    border-bottom: 1px solid #eee;
  }

  $(prefix)-footer {
    border-top: 1px solid #eee;
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
    padding: $padding;
  }

  $(prefix)-description{
    font-size: $font-size-sm;
    padding-top: $desc-padding;
  }

  $(prefix)-title {
    font-weight: 500;
  }
</style>
