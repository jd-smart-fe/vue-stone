<template>

  <div>
    <tmpl-back></tmpl-back>

    <v-panel>
      <div slot="body" class="c-panel-body row-1 u-cross-center">
        <div class="">Picker embed in the page</div>
        <v-button @click.native="ishown = !ishown">
          Toggle
        </v-button>
      </div>

      <div slot="body" class="c-panel-body row-1 u-cross-center">
        <div class="">Picker in modal</div>
        <v-button @click.native="mshown = !mshown">
          Toggle
        </v-button>
      </div>
    </v-panel>

    <transition name="fade">
      <div class="inline-picker-wrapper" v-show="ishown">
        <v-picker ref="ipicker" mode="inline"
          :items="items_for_inline" @change="iupdate">
        </v-picker>
      </div>
    </transition>

    <v-picker ref="mpicker" title="title 2" mode="modal"
      :shown="mshown" :items="items_for_modal"
      @select="confirm" @change="mupdate">
    </v-picker>
  </div>
</template>

<script>

  const dateAry = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  const monthAry = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const yearAry = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];

  const now = new Date();
  const curYear = now.getFullYear();
  const curMonth = now.getMonth() + 1;
  const curDate = now.getDate();

  export default {
    name: 'Picker',

    data() {
      return {
        ishown: false,
        mshown: false,
        ivalue: [],
        mvalue: [],

        items_for_inline: [{
          values: yearAry.slice(),
          displayValues: yearAry.slice(),
          active: yearAry.indexOf(curYear),
          unit: '年',
        }, {
          values: monthAry.slice(),
          displayValues: monthAry.slice(),
          active: monthAry.indexOf(curMonth),
          unit: '月',
        }, {
          values: dateAry.slice(),
          displayValues: dateAry.slice(),
          active: dateAry.indexOf(curDate),
          unit: '日',
        }],

        items_for_modal: [{
          values: yearAry.slice(),
          displayValues: yearAry.slice(),
          active: yearAry.indexOf(curYear),
          unit: '年',
        }, {
          values: monthAry.slice(),
          displayValues: monthAry.slice(),
          active: monthAry.indexOf(curMonth),
          unit: '月',
        }, {
          values: dateAry.slice(),
          displayValues: dateAry.slice(),
          active: dateAry.indexOf(curDate),
          unit: '日',
        }],
      };
    },

    mounted() {
      this.$refs.ipicker.$on('change', (val) => {
        console.log(val);
      });
    },

    methods: {

      iupdate(val) {
        console.log(val);
        this.ivalue = val;
      },

      mupdate(val) {
        console.log(`当前值已改变，新值为 ${val.active}`);
        this.mvalue = val;
      },

      confirm(val) {
        console.log(`当前所选值: ${val.active}`);
        this.mshown = !this.mshown;
      },
    },
  };
</script>

<style>

  @import '../styles/mixins.css';

  .c-panel-body {

    &:not(:first-child) {
      @mixin bd1;
    }
  }
  .picker-value-wrapper {
    text-align: center;
  }

  .inline-picker-wrapper {
    margin-top: 50px;
  }
</style>
