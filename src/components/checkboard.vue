<template lang="html">
  <div class="c-checkboard">
    <slot name="item" class="c-checkboard-active"></slot>
    <input type="hidden" :name="htmlName" :value="value" />
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
      default: '',
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
      const copyValue = this.value.concat();
      let index = -1;

      this.value.forEach((_value, _index) => {
        if (_value.toString() === val) {
          index = _index;
        }
      });

      if (index !== -1) {
        copyValue.splice(index, 1);
      } else {
        copyValue.push(val);
      }

      this.updateView(copyValue);
    },

    // 单选
    emitSingle(val) {
      this.updateView(val);
    },

    // watch value 单选
    handleSingle(val, oldval) {
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

<style lang="css">
@import '../styles/default-theme/variables.css';
@import '../styles/mixins.css';

$c-checkboard-item-padding: 0.12rem 0;
$c-checkboard-icon-width: 0.1rem;
$c-checkboard-icon-height: 0.1rem;

.c-checkboard{
  display: flex;
  flex-direction: column;

  padding: 0 3.75%;

  > div{
    position: relative;
    padding: $c-checkboard-item-padding;
  }

  > div[checked="true"] {
    /*background-color: red;*/

    &:after {
      content: "";
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;

      width: $c-checkboard-icon-width;
      height: $c-checkboard-icon-height;

      background-color: $blue;

      transition: .2s linear all;
    }
  }

  > div + div{
    border-top: 1px solid $gray-lightest;
  }

  .c-checkboard-hover {
    opacity: .8;
  }
}


</style>
