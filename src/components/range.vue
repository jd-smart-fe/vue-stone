<template>
  <div :class="['c-range']">
    <!-- <input type="text" 
      :value="processValue"
    > -->
    <div class="c-range-slider"
      ref="range-slider"
      @touchstart="startHandle_" 
      @touchmove="moveHandle_" 
      @touchend="endHandle_"
    >
      <div class="c-range-slider-line">
        <div class="c-range-slider-process" ref="range-process" 
         :style="{width : processPercent + '%'}" >
          <span class="c-range-slider-button">
            <em v-show="showCurrentValue && showCurrentValueState" class="text">{{processValue}}{{unit}}</em>
          </span>
        </div>
        <div v-if="isStep" class="c-range-slider-step">
          <span v-for="info in dotInfoList" class="step-dot" :style="{left : info.left + '%'}"></span>
        </div>
      </div>
    </div>
    <div v-if="dots.length > 0" class="c-range-infos">
      <!-- <span v-for="(info, index) in dotInfoList" class="info-item" :style="info.styleCss">{{info.name}}</span> -->
      <span v-for="(info, index) in dotInfoList" class="info-item" :style="{left : info.left + '%'}">{{info.name}}</span>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'v-range',

    props: {
      // 使用者所使用
      value: {
        type: [Number, String, Object],
        default: 0,
      },
      // 无级时的最小值
      min: {
        type: Number,
        default: 0,
      },
      // 无级时的最大值
      max: {
        type: Number,
        default: 100,
      },
      // 显示展示给用户的当前的值
      showCurrentValue: {
        type: Boolean,
        default: true,
      },
      // 单位
      unit: {
        type: String,
        default: '',
      },
      // 是否是有级
      isStep: {
        type: Boolean,
        default: false,
      },
      // 级别的信息 以此来判断份几级
      dots: {
        type: Array,
        default() {
          return [];
        },
      },
    },

    data() {
      return {
        sliderWidth: 0,
        sliderOffsetLeft: 0,
        processPercent: 0,
        processValue: null,
        startX: 0,
        currentX: 0,
        dotsLength: this.dots.length,
        showCurrentValueState: false,
        showCurrentValueTimer: null,
      };
    },


    computed: {
      // dots信息
      dotInfoList() {
        let aInfos = [];
        const dotsLength = this.dots.length;
        if (dotsLength > 0) {
          const oneStepPercent = 100 / (dotsLength - 1);

          for (let i = 0; i < dotsLength; i += 1) {
            if (i === (dotsLength - 1)) {
              const aInfo = {
                left: 100,
                name: this.dots[i],
              };
              aInfos.push(aInfo);
            } else {
              const pos = oneStepPercent * i;
              const aInfo = {
                left: pos,
                name: this.dots[i],
              };
              aInfos.push(aInfo);
            }

          }
          console.log(aInfos);
        }
        return aInfos;
      },
    },

    watch: {
      value(newVal, oldVal) {
        // 根据值更新位置
        this.updateProcess(newVal);
      },
    },

    created() {

      this.updateProcess(this.value);

      this.processValue = this.value;

    },

    mounted() {
      this.sliderWidth = parseFloat(this.$refs['range-slider'].getBoundingClientRect().width);
      this.sliderOffsetLeft = parseFloat(this.$refs['range-slider'].getBoundingClientRect().left);
    },

    methods: {
      updateProcess(val) {
        // 通过对比value 与 this.processValue 是否一致;
        if (val !== this.processValue) {
          // 无级
          if (!this.isStep) {

            if (val < this.min) {
              this.$emit('input', this.min);
              return;
            } else if (val > this.max) {
              this.$emit('input', this.max);
              return;
            }

            if (val === 0) {
              this.processPercent = 0;
            } else if (val === 100) {
              this.processPercent = 100;
            }

            this.processPercent = (val - this.min) * (100 / (this.max - this.min));
          } else {

            let currentStepInd = 0;
            for (let [index, elem] of (this.dots).entries()) {
              if (this.value === elem) {
                currentStepInd = index;
              }
            }
            console.log(this.dotInfoList);
            this.processPercent = this.dotInfoList[currentStepInd].left;
          }

          this.processValue = val;
        }
      },

      startMove() {
        this.handleEvent_();
      },

      handleEvent_() {
      },

      setProcessPercent(processPercent) {

        let processValue = null;

        // 无级
        if (!this.isStep) {

          const valueDiff = this.max - this.min;

          if (processPercent <= 0) {
            processPercent = 0;
            processValue = this.min;
          } else if (processPercent >= 100) {
            processPercent = 100;
            processValue = this.max;
          } else {
            // this.processPercent = processPercent;
            processValue = parseInt(this.min + ((valueDiff * processPercent) / 100), 10);
          }

        } else {

          // 步长百分比值(每级所占整个slide长度的百分比值);
          const oneStepPercent = 100 / (this.dotsLength - 1);
          // 1是最小值
          const currentStep = Math.round(processPercent / oneStepPercent) + 1;

          if (currentStep < 1 || currentStep > this.dotsLength) {
            return;
          }

          processPercent = this.dotInfoList[currentStep - 1].left;
          processValue = this.dots[currentStep - 1];

        }

        this.processPercent = processPercent;
        this.processValue = processValue;

      },

      startHandle_(e) {
        const touchs = e.changedTouches[0];
        this.startX = touchs.pageX;

        // 如果用户设置了显示当前值得话 在滑动时显示其当前值层;
        if (this.showCurrentValue) {
          clearTimeout(this.showCurrentValueTimer);
          this.showCurrentValueState = true;
        }
      },

      moveHandle_(e) {
        e.preventDefault();
        const touchs = e.changedTouches[0];
        this.currentX = touchs.pageX;
        const processPercent = ((this.currentX - this.sliderOffsetLeft) / this.sliderWidth) * 100;
        this.setProcessPercent(processPercent);

      },

      endHandle_(e) {
        const touchs = e.changedTouches[0];
        this.currentX = touchs.pageX;
        if (Math.abs(this.startX - this.currentX) < 3) {
          const processPercent = ((this.currentX - this.sliderOffsetLeft) / this.sliderWidth) * 100;
          this.setProcessPercent(processPercent);
        }
        this.$emit('input', this.processValue);
        this.$emit('change', this.processValue);

        // 如果用户设置了显示当前值得话 在滑动结束时隐藏其层;
        if (this.showCurrentValue) {
          this.showCurrentValueTimer = setTimeout(() => {
            this.showCurrentValueState = false;
          }, 1000);
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
    box-sizing: border-box;
  }
  .c-range-slider{
    width:100%;
    padding: $range-padding-y $range-padding-x;
    box-sizing: border-box;
  }
  .c-range-slider-line{
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
    .text{
      display:inline-block;
      position: absolute;
      top: -$range-slide-block-size;
      left:50%;
      transform: translateX(-50%);
      height: $range-slide-block-size;
      font-size: $font-size-base;
      font-style: normal;
      white-space: nowrap;
    }
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
  .c-range-infos{
    position: relative;
    width:100%;
    height: $range-slide-block-size;
    box-sizing: border-box;
    .info-item{
      display:inline-block;
      position: absolute;
      top:0;
      transform: translateX(-50%);
      height: $range-slide-block-size;
      line-height: $range-slide-block-size;
      font-size: $font-size-base;
      white-space: nowrap;
      &:first-child{
        transform: translateX(0);
      }
      &:last-child{
        transform: translateX(-100%);
      }
    }
  }
</style>