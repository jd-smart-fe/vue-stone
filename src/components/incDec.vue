<template>
  <div class="c-incDec">
    <div
      :class="['c-inc', incActive ? 'is-active': '']"
      @touchstart="incStart"
      @touchend="incEnd"
      >
      <i>+</i>
    </div>
    <div
      :class="['c-dec', decActive ? 'is-active': '']"
      @touchstart="decStart"
      @touchend="decEnd"
      >
      <i>-</i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-incDec',

  data() {
    return {
      incActive: false,
      decActive: false,
    };
  },

  methods: {
    incStart() {
      this.incActive = true;
    },
    incEnd() {
      this.incActive = false;
      this.$emit('inc');
    },
    decStart() {
      this.decActive = true;
    },
    decEnd() {
      this.decActive = false;
      this.$emit('dec');
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

    .c-inc {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 50%;
      border-right: 1px solid $gray-lighter;

      i {
        font-style: normal;
      }
    }

    .c-dec {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 50%;

      i {
        font-style: normal;
      }
    }

    .is-active {
      background-color: $press-color;
    }
  }

</style>
