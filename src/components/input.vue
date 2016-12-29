<template>
  <div class="c-input" id="suggest-align">
    <input type="text" class="c-input-key" v-model="invalue" :placeholder="placeholder" @input="change">
    <span title="清空" class="c-input-delquery icon-round-close" @click="clear" v-show="del"></span>
  </div>
</template>

<script>
  export default {
    name: 'v-input',

    data() {
      return {
        del: this.value !== '',
        invalue: this.value,
      };
    },

    watch: {
      value(val) {
        this.invalue = val;

        if (val === '') {
          this.del = false;
        } else {
          this.del = true;
        }
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

    },

    methods: {

      clear() {
        this.$emit('input', '');
        this.$emit('change', this.invalue);
      },

      change() {
        this.$emit('input', this.invalue);
        this.$emit('change', this.invalue);
      },
    },

  };

</script>
<style>
  @import '../styles/default-theme/variables.css';
.c-input {
    background: #fff none repeat scroll 0 0;
    position: relative;
    padding-right: 0.2rem;

    .c-input-delquery {
      cursor: pointer;
      position: absolute;
      right: 0;
      top: 0;
      font-size: $font-size-xl;
      color: #999;
    }

    .c-input-key { /*input框*/
      background: none;
      border: 0;
      font: 16px/22px arial;
      height: 0.16rem;
      outline:none;
      padding: 1px 0;
      width: 100%;
    }
}
</style>
