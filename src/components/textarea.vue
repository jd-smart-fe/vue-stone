<template>
  <div class="c-textarea">
    <textarea
      v-model="mlstr"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :readonly="readonly"
    ></textarea>
    <div class="c-textarea-counter" v-if="showCounter && maxlength">{{num}}/{{maxlength}}</div>
  </div>
</template>

<script>
  export default {
    name: 'v-textarea',
    data() {
      return {
        num: 0,
        mlstr: '',
      };
    },
    props: {
      maxlength: {
        validator(val) {
          if (!val) return true;
          return /^(([1-9]\d*)|0)$/.test(val);
        },
      },
      placeholder: {
        type: String,
      },
      readonly: {
        type: Boolean,
        default: false,
      },
      value: {
        type: String,
      },
      showCounter: {
        type: Boolean,
        default: false,
      },
      change: {
        type: Function,
      },
      callback: {
        type: Function,
      },
    },
    watch: {
      mlstr(val) {
        this.$emit('input', val);
        this.callback && this.change();
        if (this.showCounter) this.num = val.length;
      },
      value(val) {
        this.mlstr = val;
      },
    },
    mounted() {
      this.$nextTick(() => {
        const v = this.value;
        if (!v) return;
        this.mlstr = v.length > this.maxlength ? v.substr(v, this.maxlength) : v;
      });
    },
  };
</script>

<style lang="postcss">
  @import '../styles/default-theme/variables.css';
  .c-textarea{
    padding: 0;
    background: rgba(255, 255, 255,1);
    width: 100%;
    textarea{
      border: none;
      width: 100%;
      display: block;
      height: 1.2rem;
      color: inherit;
      background-color: transparent;
      outline: none;
      border-radius: 0;
      -webkit-appearance: none;
      -moz-appearance: none;
      overflow: auto;
      resize: none;
    }
    .c-textarea-counter{
      color: #b2b2b2;
      text-align: right;
      padding-top: .06rem;
    }
  }
</style>