<!--
 * @Descripttion:
 * @Author: shilili1
 * @Date: 2019-02-24 11:56:17
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-05 16:21:09
 -->
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

  $fullwidth: 91.46%;
  $padding: 0.1rem 0.16rem;
  $desc-padding: 2.5%;
  $prefix: .c-panel;
  $bg-color: #f5f6fe;
  $border-color: #eaeaea;

  $prefix {
    width: $fullwidth;
    margin: auto;
    font-size: $font-size-lg;
    @mixin border;
    @mixin box-shadow;
    background:$bg-color ;
    border-color: $border-color;
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
    border-bottom: 1px solid $border-color;
  }

  $(prefix)-footer {
    border-top: 1px solid $border-color;
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
    font-weight: 400;
    font-size: .16rem;
    color: #000;
  }

  $(prefix)-status {
    color: red;
  }
</style>
