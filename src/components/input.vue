<template>
  <div
  :class="['c-input', { 'has-border': hasB }, size, { 'disabled': disabled }, {'can-clear': !canClear}]"
  >
    <input
      class="c-input-key"
      ref="input"
      v-model="invalue"
      :name="htmlName"
      :placeholder="placeholder"
      @input="input"
      @change="change"
      :disabled="disabled"
    />
    <div class="c-input-closebox">
      <span
        title="清空"
        class="c-input-delquery icon-round-close"
        @click="clear"
        v-show="_show"
      ></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'v-input',

    data() {
      return {
        invalue: this.value,
        focus: false,
        // hasB: false,
        // size: 'large',
        // disabled: false,
        // canClear: true,
      };
    },

    watch: {
      value(val) {
        this.invalue = val;
      },
    },

    computed: {
      _show() {
        if (this.invalue === '') return false;
        return this.focus;
      },
    },

    props: {
      value: {
        type: String,
      },
      placeholder: {
        type: String,
        required: false,
        default: '请输入',
      },
      htmlName: {
        type: String,
        default: '',
      },
      hasB: {
        type: Boolean,
        required: false,
        default: false,
      },
      size: {
        type: String,
        required: false,
        default: 'large',
      },
      disabled: {
        type: Boolean,
        required: false,
        default: false,
      },
      canClear: {
        type: Boolean,
        required: false,
        default: true,
      },
    },

    mounted() {
      const el = this.$el.getElementsByTagName('input')[0];
      const pNode = document.querySelector('.has-border');
      console.log(pNode);

      el.addEventListener('focus', () => {
        this.focus = true;
        pNode ? pNode.style.borderColor = '#409eff' : null;
      });

      el.addEventListener('blur', (e) => {
        setTimeout(() => {
          this.focus = false;
        }, 0);
      });
    },

    methods: {
      clear() {
        this.$emit('input', '');
        this.$emit('change', this.invalue);
      },

      input() {
        this.$emit('input', this.invalue);
      },

      change() {
        this.$emit('change', this.invalue);
      },
    },
  };

</script>
<style lang="postcss">
  @import '../styles/default-theme/variables.css';

  .c-input {
      display: flex;
      background: #fff none repeat scroll 0 0;
      box-sizing: border-box;
      &.disabled{
        color: #c0c4cc;
      }
      &.has-border{
        border: 1px solid #dcdfe6;
        padding: 2.5% 3.75%;
        border-radius: 3px;
        &.large{
          width: 100%;
        }
        &.small{
          width: 40%;
        }
        &.middle{
          width: 50%;
        }
        &.disabled{
          background-color: #f5f7fa;
          border-color: #e4e7ed;
          cursor: not-allowed;
        }
      }
  }

  .c-input-closebox {
    display: flex;
    align-items: center;
    width: $font-size-xl;
  }

  .c-input-delquery {
    cursor: pointer;
    font-size: $font-size-xl;
    color: #999;
    vertical-align: middle;
  }

  .c-input-key { /*input框*/
    -webkit-user-select:auto;
    background: none;
    border: 0;
    font: 0.16rem/0.22rem arial;
    outline:none;
    padding: 1px 0;
    padding-right: 0.06rem;
    width: 100%;
  }
  .c-input.can-clear{
    
    .c-input-closebox{
      display: none;
    }
  }
</style>
