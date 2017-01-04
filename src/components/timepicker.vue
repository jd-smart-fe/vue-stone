<template lang="html">
  <v-picker :items="items"></v-picker>
</template>

<script>
const hour = [];
for (let i = 0; i <= 23; i += 1) {
  let n = 0;
  if (i < 10) {
    n = `0${i}`;
  } else {
    n = i;
  }
  hour.push(n);
}
// 60分钟
const min = [];
for (let i = 0; i <= 59; i += 1) {
  let n = 0;
  if (i < 10) {
    n = `0${i}`;
  } else {
    n = i;
  }
  min.push(n);
}

const hourActive = new Date().getHours();
const minActive = new Date().getMinutes();
export default {
  name: 'v-timepicker',

  data() {
    return {
      items: [{
        values: hour,
        active: hourActive,
      }, {
        values: min,
        active: minActive,
      }],
    };
  },
};

</script>

<style lang="css">
</style>
