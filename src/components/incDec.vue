<template>
  <div class="c-incDec">
    <v-button
      class="c-theme-black c-incDec-inc"
      type="click"
      icon="mode-holiday"
      :longTap="true"
      @change="incHandle"
      ></v-button>
    <v-button
      class="c-theme-black c-incDec-dec"
      type="click"
      icon="mode-holiday"
      :longTap="true"
      @change="decHandle"
      ></v-button>
  </div>
</template>

<script>
export default {
  name: 'v-incDec',

  data() {
    return {
    };
  },

  methods: {
    incHandle() {
      this.$emit('increase');
    },
    decHandle() {
      this.$emit('decrease');
    },
  },
};
// width: 206.7;
// height: 69.44;
// + : 22.60

</script>

<style scoped>
  @import '../styles/default-theme/variables.css';
  @import '../styles/mixins.css';

  .c-incDec {

    display: flex;

    width: $incDec-width;
    height: $incDec-height;
    overflow: hidden;

    @mixin border;

    border-color: $gray-lighter;
    border-radius: calc($incDec-height / 2);

    > div{
      width: 50%;
      height: 100%;
      border: none;
      border-radius: 0;
    }

    .c-incDec-inc {
      display: flex;
      justify-content: center;
      align-items: center;

      border-right: 1px solid $gray-lighter;

      i {
        font-style: normal;
      }
    }

    .c-incDec-dec {
      display: flex;
      justify-content: center;
      align-items: center;

      i {
        font-style: normal;
      }
    }

    .is-active {
      background-color: $press-color;
    }
  }

</style>
