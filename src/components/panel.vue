<template>
  <div class="c-panel">
    <slot name="header">
      <div class="c-panel-header" v-if="title">
        <div class="c-panel-title">{{title}}
          <div class="c-panel-description" v-if="description">{{description}}</div>
        </div>
        <span class="c-panel-status">{{status}}</span>
      </div>
    </slot>
    <slot name="body"></slot>
    <slot name="footer"></slot>
  </div>
</template>

<script>

  export default {
    name: 'v-panel',
    props: {
      title: String,
      description: String,
      status: String,
    },
  };
</script>

<style lang="postcss">

  @import '../styles/default-theme/variables.css';
  @import '../styles/mixins.css';

  $fullwidth: 96.8%;
  $padding: 3.325%;
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
    border-radius: 0.06rem;
    overflow: hidden;
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

  $(prefix)-status {
    color: red;
  }
</style>
