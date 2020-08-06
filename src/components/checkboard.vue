<template lang="html">
  <div :class="['c-checkboard', iconType]">
    <slot name="item" class="c-checkboard-active"></slot>
    <input type="hidden" :name="htmlName" :value="value" :disabled="disabled" />
  </div>
</template>

<script>
export default {
  name: 'v-checkboard',
  data() {
    return {
      items: null,
    };
  },

  props: {
    value: {
      type: [Number, String, Array],
      required: false,
      default: 0,
    },
    multi: {
      type: Boolean,
      required: false,
      default: false,
    },
    htmlName: {
      type: String,
      required: false,
      default: '',
    },
    iconType: {
      type: String,
      required: false,
      default: 'hook',
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    maxCheckNum: {
      type: Number,
      required: false,
      default: false,
    },
  },

  watch: {
    value(val, oldval) {
      if (this.multi) {
        this.handleMultiple(val);
      } else {
        this.handleSingle(val, oldval);
      }
    },
  },
  computed: {
    reachLimit() {
      if (this.items.length <= this.maxCheckNum) {
        return false;
      }
      return this.value.length >= this.maxCheckNum;
    },
  },

  mounted() {
    if (this.multi === true && !Array.isArray(this.value)) {
      console.error('value must be Array when the value of multi is true!');
    }

    this.items = this.$slots.item;

    // 1. 记录初始激活 item 的索引值。
    // 2. 为每个 item 添加事件。
    this.items.forEach(item => {
      const datasetValue = item.elm.dataset.value;

      // 单选初始激活
      if (datasetValue === this.value.toString()) {
        item.elm.setAttribute('checked', true);

      // 多选初始激活
      } else if (
        this.multi &&
        this.value.find(val => val.toString() === datasetValue) !== undefined
      ) {
        item.elm.setAttribute('checked', true);
      }

      // 监听事件，为按钮添加按下效果
      item.elm.addEventListener('touchstart', () => {
        item.elm.classList.add('c-checkboard-hover');
      });

      // 按钮效果
      // 按下逻辑分流
      item.elm.addEventListener('touchend', () => {
        item.elm.classList.remove('c-checkboard-hover');

        // 多选
        if (this.multi) {
          this.emitMultiple(datasetValue);

        // 单选
        } else {
          this.emitSingle(datasetValue);
        }
      });

      item.elm.addEventListener('touchcancel', () => {
        item.elm.classList.remove('c-checkboard-hover');
      });
    });
  },

  methods: {
    updateView(value) {
      this.$emit('input', value);
      this.$emit('change', value);
    },

    // 多选
    emitMultiple(val) {
      if (this.disabled) return;
      const copyValue = this.value.concat();
      let index = -1;

      this.value.forEach((_value, _index) => {
        if (_value.toString() === val) {
          index = _index;
        }
      });

      if (index !== -1) {
        copyValue.splice(index, 1);
      } else if (!this.reachLimit) {
        copyValue.push(val);
      }

      this.updateView(copyValue);
    },

    // 单选
    emitSingle(val) {
      if (this.disabled) return;
      this.updateView(val);
    },

    // watch value 单选
    handleSingle(val, oldval) {
      if (this.disabled) return;
      this.items.forEach(item => {
        const datasetValue = item.elm.dataset.value;

        if (datasetValue === oldval.toString()) {
          item.elm.setAttribute('checked', false);
        }

        if (datasetValue === val.toString()) {
          item.elm.setAttribute('checked', true);
        }
      });
    },

    // watch value 多选
    handleMultiple(val) {
      if (this.disabled) return;
      this.items.forEach(item => {
        const datasetValue = item.elm.dataset.value;

        if (this.value.find(v => v.toString() === datasetValue) !== undefined) {
          item.elm.setAttribute('checked', true);
        } else {
          item.elm.setAttribute('checked', false);
        }
      });
    },
  },
};
</script>

<style lang="postcss">
@import '../styles/default-theme/variables.css';
@import '../styles/mixins.css';

.c-checkboard{
  display: flex;
  flex-direction: column;

  padding: 0 3.75%;

  > div{
    position: relative;
    padding: $c-checkboard-item-padding;
  }

  > div + div{
    border-top: 1px solid $gray-lightest;
  }

  .c-checkboard-hover {
    opacity: .8;
  }

  &{
    >div{
      &[disabled='disabled'] {
        color: $t-disabled;
      }
      &[disabled='disabled']:after {
        color: $t-disabled;
      }
     &:after {
      /* icon-select */
      font-family: 'iconfont' !important;
      speak: none;
      font-style: normal;
      font-weight: normal;
      font-variant: normal;
      text-transform: none;
      color: $c-primary;

      /* Better Font Rendering =========== */
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;

      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      transition: .2s linear all;
     }
    }
    &.hook{
      >div{
        &[checked="true"]:after{
          content: "\e901";
          font-size: $c-checkboard-icon-size;
          width: $c-checkboard-icon-width;
          height: $c-checkboard-icon-height;
          line-height: $c-checkboard-icon-height;
        }
      }
    }
    &.squ{
      >div{
        &:after {
          content: "\ea53";
          font-size: $c-checkboard-icon-size-square;
          width: $c-checkboard-icon-width-square;
          height: $c-checkboard-icon-height-square;
          line-height: $c-checkboard-icon-height-square;
        }
        &[checked="true"]:after{
        content: "\ea52";
        }
      }
    }
    &.round{
      >div{
        &:after {
          content: "\e916";
          font-size: $c-checkboard-icon-size-round;
          width: $c-checkboard-icon-width;
          height: $c-checkboard-icon-height-round;
          line-height: $c-checkboard-icon-height-square;
        }
        &[checked="true"]:after{
          content: "\e969";
          right: -1px;
        }
      }
    }
  }
}


</style>
