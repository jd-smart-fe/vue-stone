<template>
  <div :class="['c-range']">
    <input type="text" 
      :value="inputValue"
    >
    <div class="c-range-slider"
      ref="range-slider"
      @touchstart="startHandle_" 
      @touchmove="moveHandle_" 
      @touchend="endHandle_"
    >
      <div class="c-range-slider-process" ref="range-process" 
       :style="{width : processPercent + '%'}" >
        <span class="c-range-slider-button"></span>
      </div>
      <div v-if="showStep" class="c-range-slider-step">
        <span v-for="left in dots" class="step-dot" :style="{left : left + '%'}"></span>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'v-range',

    props: {
      value: {
        type: Number,
        default: 0,
      },
      min: {
        type: Number,
        default: 0,
      },
      max: {
        type: Number,
        default: 100,
      },
      step: {
        type: Number,
        default: 1,
      },
      showStep: {
        type: Boolean,
        default: false,
      },
    },

    data() {
      return {
        sliderWidth: 0,
        sliderOffsetLeft: 0,
        processPercent: (this.value - this.min) * (100 / (this.max - this.min)),
        inputValue: 0,
        startX: 0,
        currentX: 0,
      };
    },

    created() {

      if (this.value < this.min) {
        this.$emit('input', this.min);
      } else if (this.value > this.max) {
        this.$emit('input', this.max);
      }

      this.inputValue = this.value || this.inputValue;

    },

    computed: {
      // dots的横坐标值
      dots() {
        let oneStepPercent = 100 / (this.step - 1);
        let aDots = [];
        for (let i = 1; i <= this.step; i += 1) {
          if (i === 1) {
            aDots.push(0);
          } else if (i === this.step) {
            aDots.push(100);
          } else {
            aDots.push(oneStepPercent * (i - 1));
          }

        }
        return aDots;
      },
    },

    watch: {
      value(newVal, oldVal) {
        this.inputValue = newVal;
        this.processPercent = (newVal - this.min) * (100 / (this.max - this.min));
      },
    },

    mounted() {
      this.sliderWidth = parseFloat(this.$refs['range-slider'].getBoundingClientRect().width);
      this.sliderOffsetLeft = parseFloat(this.$refs['range-slider'].getBoundingClientRect().left);
    },

    methods: {
      startMove() {
        this.handleEvent_();
      },
      handleEvent_() {
      },

      setProcessPercent(processPercent) {

        let inputValue = null;

        // 有级
        if (this.step > 1) {

          let valueDiff = this.max - this.min;
          // 步值(每级所代表的大小值);
          let oneStepValue = valueDiff / (this.step - 1);
          // 步长百分比值(每级所占整个slide长度的百分比值);
          let oneStepPercent = 100 / (this.step - 1);
          // 1是最小值
          let currentStep = Math.round(processPercent / oneStepPercent) + 1;

          if (currentStep < 1 || currentStep > this.step) {
            return;
          }

          if (currentStep === 1) {
            processPercent = 0;
            inputValue = this.min;
          } else if (currentStep === this.step) {
            processPercent = 100;
            inputValue = this.max;
          } else {
            processPercent = oneStepPercent * (currentStep - 1);
            inputValue = parseInt(this.min + (oneStepValue * (currentStep - 1)), 10);
          }

        } else {

          let valueDiff = this.max - this.min;

          if (processPercent <= 0) {
            processPercent = 0;
            inputValue = this.min;
          } else if (processPercent >= 100) {
            processPercent = 100;
            inputValue = this.max;
          } else {
            // this.processPercent = processPercent;
            inputValue = parseInt(this.min + ((valueDiff * processPercent) / 100), 10);
          }

        }

        this.processPercent = processPercent;
        this.inputValue = inputValue;
        this.$emit('input', this.inputValue);

      },

      startHandle_(e) {
        let touchs = e.changedTouches[0];
        this.startX = touchs.pageX;
      },

      moveHandle_(e) {
        e.preventDefault();
        let touchs = e.changedTouches[0];
        this.currentX = touchs.pageX;
        let processPercent = ((this.currentX - this.sliderOffsetLeft) / this.sliderWidth) * 100;
        this.setProcessPercent(processPercent);

      },

      endHandle_(e) {
        let endTime = new Date().getTime();
        let touchs = e.changedTouches[0];
        this.currentX = touchs.pageX;
        if (Math.abs(this.startX - this.currentX) < 3) {
          let processPercent = ((this.currentX - this.sliderOffsetLeft) / this.sliderWidth) * 100;
          this.setProcessPercent(processPercent);
        }
      },

      cancelHandle_() {
      },

    },
  };
</script>

<style>
  @import '../styles/default-theme/variables.css';
  @import '../styles/mixins.css';

  .c-range{
    display: inline-block;
    width:100%;
    padding: $range-padding-y $range-padding-x;
    box-sizing: border-box;
  }
  .c-range-slider{
    position: relative;
    width: 100%;
    height: $range-slide-height;
    background: $t-range-defcolor;
  }
  .c-range-slider-process{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    height: $range-slide-height;
    background-color: $t-range-lightcolor;
  }
  .c-range-slider-button{
    display: inline-block;
    position:absolute;
    top:50%;
    right:0;
    margin-right: calc(-$range-slide-block-size / 2);
    margin-top: calc(-$range-slide-block-size / 2);
    width:$range-slide-block-size;
    height:$range-slide-block-size;
    border:$t-range-lightcolor solid 0.02rem;
    border-radius: 100%;
    background:#fff;
    box-sizing:border-box;
    z-index:5;
  }
  .c-range-slider-step{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width:100%;
    height: $range-slide-height;
    background-color: $t-range-lightcolor;
    .step-dot{
      display: inline-block;
      position:absolute;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
      width: $range-slide-stepdot-size;
      height: $range-slide-stepdot-size;
      background: $t-range-lightcolor;
      border-radius:100%;
    }
  }
</style>