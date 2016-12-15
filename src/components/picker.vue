<template lang="html">
  <div :class="['c-picker', slideIn ? 'c-picker-slideIn' : '']">
    <div class="c-picker-title">
    </div>
    <div class="c-picker-body">
      <div>00000</div>
      <div>00000</div>
      <div>00000</div>
      <div>00000</div>
      <div>00000</div>
      <div>00000</div>
      <div>00000</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-picker',

  data() {
    return {
      slideIn: false,
    };
  },
};
</script>

<style lang="css">
  /*@@import "../styles/mixin.css";*/

  .c-picker {
    position: fixed;
    top: 100%;
    width: 100%;
    background: red;
    z-index: 10;
    background: #cfd5da;

    transition: transform ease-in .3s;
  }

  .c-picker-slideIn{
    transform: translate3d(0, -100%, 0);
  }

  .c-picker-body{
    display: flex;
    flex-direction: column;
    align-items: center;
    -webkit-mask-box-image: -webkit-linear-gradient(bottom, transparent, transparent 5%, white 20%, white 80%, transparent 95%, transparent);
    -webkit-mask-box-image: linear-gradient(to top, transparent, transparent 5%, white 20%, white 80%, transparent 95%, transparent);
  }
</style>
