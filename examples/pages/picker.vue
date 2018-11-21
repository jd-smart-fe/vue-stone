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
        <v-picker :style="{width: '33%'}" ref="ipickerYear" :id="'ipickerYear'"
          :items="items_for_inline[0]" @change="iupdate">
        </v-picker>
        <v-picker :style="{width: '33%'}"  ref="ipickerMonth" :id="'ipickerMonth'"
          :items="items_for_inline[1]" @change="iupdate">
        </v-picker>
        <v-picker :style="{width: '33%'}" ref="ipickerDate" :id="'ipickerDate'"
          :items="items_for_inline[2]" @change="iupdate">
        </v-picker>
      </div>
    </transition>
    <v-mask :value="mshown"></v-mask>
    <div :class="['c-picker-modal',  mshown ? 'c-picker-modal-show' : '']">
      <div class="c-picker-head" >
        <span class="c-picker-head-cancel" @click="handle('cancel')">{{cancelText}}</span>
        <span class="c-picker-head-test">{{title}}</span>
        <span class="c-picker-head-determine" @click="handle('determine')">{{determineText}}</span>
      </div>
      <div class="modal-picker">
         <v-picker :style="{width: '33%'}" ref="ipickerModalYear" :id="'ipickerModalYear'"
          :items="items_for_modal[0]" @change="iupdate">
        </v-picker>
        <v-picker :style="{width: '33%'}"  ref="ipickerModalMonth" :id="'ipickerModalMonth'"
          :items="items_for_modal[1]" @change="iupdate">
        </v-picker>
        <v-picker :style="{width: '33%'}" ref="ipickerModalDate" :id="'ipickerModalDate'"
          :items="items_for_modal[2]" @change="iupdate">
        </v-picker>
      </div>
    </div>
    <div>

    </div>
  </div>
</template>

<script>
const dateAry = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
];
const monthAry = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const yearAry = [
  2010,
  2011,
  2012,
  2013,
  2014,
  2015,
  2016,
  2017,
  2018,
  2019,
  2020,
];

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
      items_for_inline: [
        {
          values: yearAry.slice(),
          displayValues: yearAry.slice(),
          active: yearAry.indexOf(curYear),
          unit: '年',
        },
        {
          values: monthAry.slice(),
          displayValues: monthAry.slice(),
          active: monthAry.indexOf(curMonth),
          unit: '月',
        },
        {
          values: dateAry.slice(),
          displayValues: dateAry.slice(),
          active: dateAry.indexOf(curDate),
          unit: '日',
        },
      ],

      items_for_modal: [
        {
          values: yearAry.slice(),
          displayValues: yearAry.slice(),
          active: yearAry.indexOf(curYear),
          unit: '年',
        },
        {
          values: monthAry.slice(),
          displayValues: monthAry.slice(),
          active: monthAry.indexOf(curMonth),
          unit: '月',
        },
        {
          values: dateAry.slice(),
          displayValues: dateAry.slice(),
          active: dateAry.indexOf(curDate),
          unit: '日',
        },
      ],
      cancelText: '取消',
      determineText: '确定',
      title: '标题',
      chooseInlinePicker: {},
      chooseModalPicker: {},
    };
  },

  mounted() {
    this.chooseInlinePicker = {
      actives: [
        yearAry.indexOf(curYear),
        monthAry.indexOf(curMonth),
        dateAry.indexOf(curDate),
      ],
      values: [
        yearAry[yearAry.indexOf(curYear)],
        monthAry[monthAry.indexOf(curMonth)],
        dateAry[dateAry.indexOf(curDate)],
      ],
      displayValues: [
        yearAry[yearAry.indexOf(curYear)],
        monthAry[monthAry.indexOf(curMonth)],
        dateAry[dateAry.indexOf(curDate)],
      ],

    };
    this.chooseModalPicker = {
      actives: [
        yearAry.indexOf(curYear),
        monthAry.indexOf(curMonth),
        dateAry.indexOf(curDate),
      ],
      values: [
        yearAry[yearAry.indexOf(curYear)],
        monthAry[monthAry.indexOf(curMonth)],
        dateAry[dateAry.indexOf(curDate)],
      ],
      displayValues: [
        yearAry[yearAry.indexOf(curYear)],
        monthAry[monthAry.indexOf(curMonth)],
        dateAry[dateAry.indexOf(curDate)],
      ],
    };
  },
  watch: {
    ishown(val) {
      this.$refs.ipickerYear.refresh();
      this.$refs.ipickerMonth.refresh();
      this.$refs.ipickerDate.refresh();
    },
  },
  methods: {
    handle(val) {
      if (val === 'cancel') {
        this.mshown = false;
      } else {
        console.log(JSON.stringify(this.chooseModalPicker));
        console.log(this.chooseModalPicker.values.join('-'));
        this.mshown = false;
      }
    },
    iupdate(val) {
      switch (val.id) {
        case 'ipickerModalYear':
          this.chooseModalPicker.values[0] = val.value;
          this.chooseModalPicker.actives[0] = val.active;
          this.chooseModalPicker.displayValues[0] = val.displayValue;
          break;
        case 'ipickerModalMonth':
          this.chooseModalPicker.values[1] = val.value;
          this.chooseModalPicker.actives[1] = val.active;
          this.chooseModalPicker.displayValues[1] = val.displayValue;
          break;
        case 'ipickerModalDate':
          this.chooseModalPicker.values[2] = val.value;
          this.chooseModalPicker.actives[2] = val.active;
          this.chooseModalPicker.displayValues[2] = val.displayValue;
          break;
        case 'ipickerYear':
          this.chooseInlinePicker.values[0] = val.value;
          this.chooseInlinePicker.actives[0] = val.active;
          this.chooseInlinePicker.displayValues[0] = val.displayValue;
          console.log(JSON.stringify(this.chooseInlinePicker));
          console.log(this.chooseInlinePicker.values.join('-'));
          break;
        case 'ipickerMonth':
          this.chooseInlinePicker.values[1] = val.value;
          this.chooseInlinePicker.actives[1] = val.active;
          this.chooseInlinePicker.displayValues[1] = val.displayValue;
          console.log(JSON.stringify(this.chooseInlinePicker));
          console.log(this.chooseInlinePicker.values.join('-'));
          break;
        case 'ipickerDate':
          this.chooseInlinePicker.values[2] = val.value;
          this.chooseInlinePicker.actives[2] = val.active;
          this.chooseInlinePicker.displayValues[2] = val.displayValue;
          console.log(JSON.stringify(this.chooseInlinePicker));
          console.log(this.chooseInlinePicker.values.join('-'));
          break;
        default:
          break;
      }
    },

    // mupdate(val) {
    //   console.log(`当前值已改变，新值为 ${val.active}`);
    //   this.mvalue = val;
    // },

    // confirm(val) {
    //   console.log(`当前所选值: ${val.active}`);
    //   this.mshown = !this.mshown;
    // },
  },
};
</script>

<style>
@import '../../src/styles/mixins.css';
@import '../../src/styles/default-theme/variables.css';

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
  display: flex;
}

.modal-picker {
  display: flex;
}
.c-picker-mask-top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc($height * 3 - 1px);
  background-color: rgba(255, 255, 255, 0.6);
  border-bottom: 1px solid #ccc;
  pointer-events: none;
}
.c-picker-mask-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: calc($height * 3 - 1px);
  background-color: rgba(255, 255, 255, 0.6);
  border-top: 1px solid #ccc;
  pointer-events: none;
}
.c-picker-head {
  margin: 0.05rem 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: #ccc solid 0.01rem;
}
.c-picker-head > span {
  display: flex;
  width: 0.5rem;
  height: 0.3rem;
  justify-content: center;
  align-items: center;
}
.c-picker-head > .c-picker-head-test {
  color: $gray;
  width: auto;
}
.c-picker-item-active {
}

.c-picker-modal {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  transform: translateY(100%);
  background-color: $white;
  transition: transform 0.5s;
  border-top: 0.01rem solid #ccc;
  z-index: 101;
}
.c-picker-modal-show {
  transform: translateY(0);
}
</style>
