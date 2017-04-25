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
    this.items = this.$slots.item;

    // 1. 记录初始激活 item 的索引值。
    // 2. 为每个 item 添加事件。
    this.items.forEach(item => {
      const value = item.elm.dataset.value;

      if (value === this.value) {
        // 单选初始激活
        item.elm.setAttribute('checked', true);

      } else if (this.multi && this.value.indexOf(value) !== -1) {

        // 多选初始激活
        item.elm.setAttribute('checked', true);
      }

      item.elm.addEventListener('touchstart', () => {
        item.elm.classList.add('c-checkboard-hover');
      });

      item.elm.addEventListener('touchend', () => {
        item.elm.classList.remove('c-checkboard-hover');

        if (this.multi) {
          // 多选
          this.emitMultiple(value);
        } else {
          // 单选
          this.emitSingle(value);
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

    emitMultiple(val) {
      const index = this.value.indexOf(val);
      const copyValue = this.value.concat();

      if (index !== -1) {
        copyValue.splice(index, 1);
      } else {
        copyValue.push(val);
      }

      this.updateView(copyValue);
    },

    emitSingle(val) {
      this.updateView(val);
    },

    handleSingle(val, oldval) {
      this.items.forEach(item => {
        if (item.elm.dataset.value === val) {
          item.elm.setAttribute('checked', true);
        }
        if (item.elm.dataset.value === oldval) {
          item.elm.setAttribute('checked', false);
        }
      });
    },

    handleMultiple(val) {
      this.items.forEach(item => {
        const datavalue = item.elm.dataset.value;
        if (this.value.indexOf(datavalue) === -1) {
          item.elm.setAttribute('checked', false);
        } else {
          item.elm.setAttribute('checked', true);
        }
      });
    },
  },
};
</script>

<style lang="css">
@import '../styles/default-theme/variables.css';
@import '../styles/mixins.css';

$c-checkboard-item-padding: 0.08rem 0;
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
