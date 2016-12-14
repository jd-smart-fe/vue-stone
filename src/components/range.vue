<template>
  <div :class="['c-range']">
    <!-- <input type="text" 
      :value="currentValue"
    > -->
    <div class="c-range-slider"
      ref="range-slider"
      @touchstart="startHandle_" 
      @touchmove="moveHandle_" 
      @touchend="endHandle_"
      @touchcancel="endHandle_"
    >
      <div class="c-range-slider-line">
        <div class="c-range-slider-process" ref="range-process" 
         :style="{width : processPercent + '%'}" >
          <span class="c-range-slider-button">
            <transition name="fadetip">
              <em v-show="show_tip && show_tip_state" class="text">{{currentValue | pickText}}{{unit}}</em>
            </transition>
          </span>
        </div>
        <div v-if="is_step" class="c-range-slider-step">
          <span v-for="info in dotInfoList" class="step-dot" :style="{left : info.left + '%'}"></span>
        </div>
      </div>
    </div>
    <div v-if="dots.length > 0" class="c-range-dots">
      <template v-if="show_icon_dots">
        <span v-for="(info, index) in dotInfoList" 
          :class="[' dot-icon ', ' dot-icon-' + index, ' icon-' + info.icon]" 
          :style="{left : info.left + '%'}">
        </span>
      </template>
      <template v-if="show_text_dots">
        <span v-for="(info, index) in dotInfoList" 
          class="dot-item" 
          :style="{left : info.left + '%'}"
        >{{info.text}}</span>
      </template>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'v-range',

    props: {
      /**
       * 使用者所使用;
       * 在 有级 状态下 value可以传入一个json对象;
       * 其属性必须是一一对应的 value 及 text;
       * 例:{ value: 20, text: '中档'};这种情况下 滑动改变值后 返回的值也是一个如上格式的json对象;
      **/
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
        default: 50,
      },
      // 单位
      unit: {
        type: String,
        default: '',
      },
      // 滑动时是否显示当前的值 默认显示
      show_tip: {
        type: Boolean,
        default: true,
      },
      // 是否是有级 默认是无级
      is_step: {
        type: Boolean,
        default: false,
      },
      /**
       * 滑杆下面的文字信息列表,有级时 以此来判断份几级
       * dots是一组json对象组成的数组;
       * 包含的字段: value、text、icon;
       * 例: [{value: 10, text: '低档', icon: model-cool},{value: 20, text: '中档', icon: model-cool}];
      **/
      dots: {
        type: Array,
        default() {
          return [];
        },
      },
      // 显示图标dots
      show_icon_dots: {
        type: Boolean,
        default: false,
      },
      // 显示文字dots
      show_text_dots: {
        type: Boolean,
        default: true,
      },
    },

    data() {
      return {
        valueIsJSON: false,
        sliderWidth: 0,
        sliderOffsetLeft: 0,
        processPercent: 0,
        currentValue: null,
        startX: 0,
        currentX: 0,
        dotsLength: this.dots.length,
        show_tip_state: false,
        show_tip_timer: null,
      };
    },


    computed: {
      // dots信息
      dotInfoList() {
        const aInfos = [];
        const dotsLength = this.dots.length;
        if (dotsLength > 0) {
          const oneStepPercent = 100 / (dotsLength - 1);

          for (let i = 0; i < dotsLength; i += 1) {

            let aInfo = {
              icon: '',
            };

            const hasIcon = !!this.dots[i].icon;

            if (hasIcon) {
              aInfo = Object.assign({}, aInfo, {
                icon: this.dots[i].icon,
              });
            }

            if (i === (dotsLength - 1)) {
              aInfo = Object.assign({}, aInfo, {
                left: 100,
              });
            } else {
              const pos = oneStepPercent * i;
              aInfo = Object.assign({}, aInfo, {
                left: pos,
              });
            }

            aInfo = Object.assign({}, aInfo, {
              text: this.dots[i].text,
              value: this.dots[i].value,
            });

            aInfos.push(aInfo);

          }

        }
        return aInfos;
      },
    },

    watch: {
      value(newVal) {
        // 根据值更新位置
        this.updateProcess(newVal);
      },
    },

    created() {

      // 判断传入的value类型是否是json object;
      this.valueIsJSON = (typeof this.value === 'object' &&
          Object.prototype.toString.call(this.value).toLowerCase() === '[object object]' &&
          !this.value.length);

      this.updateProcess(this.value);

      this.currentValue = this.value;

    },

    mounted() {
      this.sliderWidth = parseFloat(this.$refs['range-slider'].getBoundingClientRect().width);
      this.sliderOffsetLeft = parseFloat(this.$refs['range-slider'].getBoundingClientRect().left);
    },

    filters: {
      // 过滤出text;
      pickText(val) {
        let currentValue = val;
        const isJSON = (typeof currentValue === 'object') &&
          (Object.prototype.toString.call(currentValue).toLowerCase() === '[object object]') &&
          (!currentValue.length);
        if (isJSON) {
          currentValue = val.text;
        }
        return currentValue;
      },
    },

    methods: {
      updateProcess(val) {

        // value 与 this.currentValue 是否一致;
        let isSame = true;
        // 判断val是否是json对象
        if (this.valueIsJSON) {

          // 判断this.currentValue是否是json对象
          if (Object.prototype.toString.call(this.currentValue).toLowerCase() !== '[object object]') {

            isSame = false;

          } else {
            // 通过对比value 与 this.currentValue 是否一致;
            isSame = (val.text === this.currentValue.text) || (val.value === this.currentValue.value);

          }
        } else {
          // 通过对比value 与 this.currentValue 是否一致;
          isSame = val === this.currentValue;

        }
        // 如果不一致 执行更新方法;
        if (!isSame) {

          // 无级
          if (!this.is_step) {

            if (val < this.min) {
              this.$emit('input', this.min);
              return;
            } else if (val > this.max) {
              this.$emit('input', this.max);
              return;
            }

            this.processPercent = (val - this.min) * (100 / (this.max - this.min));
          } else {

            let currentStepInd = 0;
            if (this.valueIsJSON) {
              for (const [index, elem] of (this.dots).entries()) {
                if ((this.value.text !== 'undefined' && this.value.text === elem.text) ||
                  (this.value.value !== 'undefined' && this.value.value === elem.value)) {
                  currentStepInd = index;
                }
              }
            } else {
              for (const [index, elem] of (this.dots).entries()) {
                if (this.value === elem.text) {
                  currentStepInd = index;
                }
              }
            }

            this.processPercent = this.dotInfoList[currentStepInd].left;
          }

          this.currentValue = val;
        }
      },

      startMove() {
        this.handleEvent_();
      },

      handleEvent_() {
      },

      setProcessPercent(processPercent) {

        let currentValue = null;

        // 无级
        if (!this.is_step) {

          const valueDiff = this.max - this.min;

          if (processPercent <= 0) {
            processPercent = 0;
            currentValue = this.min;
          } else if (processPercent >= 100) {
            processPercent = 100;
            currentValue = this.max;
          } else {
            // this.processPercent = processPercent;
            currentValue = parseInt(this.min + ((valueDiff * processPercent) / 100), 10);
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
          // dots是json objects组成的Array 所以dots[i]肯定都是json object;
          // 为保证传入value时的类型不变 所以在value类型不是object时, currentValue = dots[i].text;
          if (this.valueIsJSON) {
            currentValue = this.dots[currentStep - 1];
          } else {
            currentValue = this.dots[currentStep - 1].text;
          }

        }

        this.processPercent = processPercent;
        this.currentValue = currentValue;

      },

      startHandle_(e) {
        const touchs = e.changedTouches[0];
        this.startX = touchs.pageX;

        // 如果用户设置了显示当前值得话 在滑动时显示其当前值层;
        if (this.show_tip) {
          clearTimeout(this.show_tip_timer);
          this.show_tip_state = true;
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
        this.$emit('input', this.currentValue);
        this.$emit('change', this.currentValue);

        // 如果用户设置了显示当前值得话 在滑动结束时隐藏其层;
        if (this.show_tip) {
          this.show_tip_timer = setTimeout(() => {
            this.show_tip_state = false;
          }, 1000);
        }
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
    border-radius: calc($range-slide-height / 2);
  }
  .c-range-slider-process{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    height: $range-slide-height;
    background-color: $t-range-lightcolor;
    border-radius: calc($range-slide-height / 2);
  }
  .c-range-slider-button{
    display: inline-block;
    position:absolute;
    top:50%;
    right:0;
    margin-right: calc(-$range-slide-button-size / 2);
    margin-top: calc(-$range-slide-button-size / 2);
    width:$range-slide-button-size;
    height:$range-slide-button-size;
    border:$t-range-lightcolor solid $range-slide-button-border;
    border-radius: 100%;
    background-image: linear-gradient(0deg, #f9f9f9 0%, #fff 80%);
    box-shadow:0 1px 2px rgba(0,0,0,0.1);
    box-sizing:border-box;
    z-index:5;
    .text{
      display:inline-block;
      position: absolute;
      top: -$range-slide-button-size;
      left:50%;
      transform: translateX(-50%);
      height: $range-slide-button-size;
      font-size: $font-size-base;
      font-style: normal;
      white-space: nowrap;
    }
    .fadetip-enter-active,
    .fadetip-leave-active{
      transition: opacity 0.2s ease;
    }
    .fadetip-enter,
    .fadetip-leave-active{
      opacity: 0;
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
  .c-range-dots{
    position: relative;
    width:100%;
    height: $range-slide-dot-size;
    box-sizing: border-box;
    .dot-icon,
    .dot-item{
      display:inline-block;
      position: absolute;
      top:0;
      transform: translateX(-50%);
      height: $range-slide-dot-size;
      line-height: $range-slide-dot-size;
      font-size: $font-size-base;
      white-space: nowrap;
      &:first-child{
        transform: translateX(0);
      }
      &:last-child{
        transform: translateX(-100%);
      }
    }
    .dot-icon{
      font-size:0.22rem;
    }
  }
</style>