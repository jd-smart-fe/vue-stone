<template lang="html">
  <v-picker :items="_items" ref="picker" :rotate_effect="rotate_effect"></v-picker>
</template>

<script>
const hourCol = [];
for (let i = 0; i <= 23; i += 1) {
  let n = 0;
  if (i < 10) {
    n = `0${i}`;
  } else {
    n = i;
  }
  hourCol.push(n);
}
// 60分钟
const minCol = [];
for (let i = 0; i <= 59; i += 1) {
  let n = 0;
  if (i < 10) {
    n = `0${i}`;
  } else {
    n = i;
  }
  minCol.push(n);
}

const hourActive = new Date().getHours();
const minActive = new Date().getMinutes();

export default {
  name: 'v-timepicker',

  data() {
    return {
    };
  },

  computed: {
    _items() {
      const arr = [{
        values: hourCol,
        active: this.hour,
      }, {
        values: minCol,
        active: this.min,
      }];

      return arr;
    },
  },

  props: {
    rotate_effect: {
      type: Boolean,
      default: false,
    },

    hour: {
      default: hourActive,
    },

    min: {
      default: minActive,
    },
  },

  mounted() {
    this.$refs.picker.$on('change', val => {
      this.$emit('change', val);
    });
  },
};

</script>

<style lang="css">
</style>
