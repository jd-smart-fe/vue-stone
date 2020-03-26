<template>
  <div>
    <tmpl-back></tmpl-back>
    <v-panel>
      <div slot="body" class="c-panel-body row-1 u-cross-center">
        <div class="">Picker Loop embed in the page</div>
        <v-button @click.native="ishown = !ishown">
          Toggle
        </v-button>
      </div>

      <div slot="body" class="c-panel-body row-1 u-cross-center">
        <div class="">Picker Loop in modal</div>
        <v-button @click.native="mshown = !mshown">
          Toggle
        </v-button>
      </div>
    </v-panel>
    <transition name="fade">
       <div class="inline-picker-wrapper" v-show="ishown">
        <v-picker-loop
          type="cycle"
          unit="年"
          :style="{width: '33%'}"
          ref="ipickerYear"
          :list-data="yearAry"
          :value="items_for_inline[0].value"
          @input="iupdateYear"
        />
        <v-picker-loop
          type="cycle"
          unit="月"
          :style="{width: '33%'}"
          ref="ipickerMonth"
          :list-data="monthAry"
          :value="items_for_inline[1].value"
          @input="iupdateMonth"
        />
        <v-picker-loop
          type="cycle"
          unit="日"
          :style="{width: '33%'}"
          ref="ipickerDate"
          :list-data="dateAry"
          :value="items_for_inline[2].value"
          @input="iupdateDay"
        />
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
        <v-picker-loop
          type="line"
          :style="{width: '33%'}"
          ref="ipickerModalYear"
          unit="年"
          :list-data="yearAry"
          :value="items_for_modal[0].value"
          @input="iupdateYear"
        />
        <v-picker-loop
          type="cycle"
          :style="{width: '33%'}"
          unit="月"
          ref="ipickerModalMonth"
          :list-data="monthAry"
          :value="items_for_modal[1].value"
          @input="iupdateMonth"
        />
        <v-picker-loop
          type="cycle"
          :unit="'日'"
          :style="{width: '33%'}"
          ref="ipickerModalDate"
          :list-data="dateAry"
          :value="items_for_modal[2].value"
          @input="iupdateDay"
        />
      </div>
    </div>
  </div>
</template>

<script>
 // sdfsf
  const now = new Date();
  const curYear = now.getFullYear();
  const curMonth = now.getMonth() + 1;
  const curDate = now.getDate();
  export default {
    name: 'picker-loops',
    data() {
      return {
        ishown: false,
        mshown: false,
        ivalue: [],
        mvalue: [],
        yearAry: Array.from({ length: 12 }, (value, index) => `${index + 2010}`),
        dateAry: Array.from({ length: 31 }, (value, index) => (index < 9 ? `0${index + 1}` : `${index + 1}`)),
        monthAry: Array.from({ length: 12 }, (value, index) => (index < 9 ? `0${index + 1}` : `${index + 1}`)),
        items_for_inline: [
          {
            value: '2011',
          },
          {
            value: '02',
          },
          {
            value: '02',
          },
        ],

        items_for_modal: [
          {
            value: '2011',
          },
          {
            value: '02',
          },
          {
            value: '02',
          },
        ],
        cancelText: '取消',
        determineText: '确定',
        title: '标题',
        chooseInlinePicker: {},
        chooseModalPicker: {},
      };
    },
    methods: {
      handle(val) {
        if (val === 'cancel') {
          this.mshown = false;
        } else {
          console.log(`当前选择年月日: ${this.items_for_modal[0].value}-${this.items_for_modal[1].value}-${this.items_for_modal[2].value}`);
          this.mshown = false;
        }
      },
      iupdateYear(val) {
        console.log(`当前选择年份${val}`);
        this.items_for_modal[0].value = val;
      },
      iupdateMonth(val) {
        console.log(`当前选择月份${val}`);
        this.items_for_modal[1].value = val;
      },
      iupdateDay(val) {
        console.log(`当前选择日${val}`);
        this.items_for_modal[2].value = val;
      },
    },
  };
</script>

<style>
@import '../../src/styles/mixins.css';
@import '../../src/styles/default-theme/variables.css';

.c-panel-body {
  /* &:not(:first-child) {
    @mixin bd1;
  } */
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
