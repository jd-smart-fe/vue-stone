<template>
  <div class="round" id="suggest-align">
    <input type="text" class="input_key" v-model="invalue" :placeholder="placeholder" @input="change">
    <span title="清空" class="delquery icon-round-close" @click="clear" v-show="del"></span>
  </div>
</template>

<script>
  export default {
    name: 'v-inputs',
    data() {
      return {
        del: false,
        invalue: this.value,
      };
    },

    watch: {
      value(val) {
        this.invalue = val;
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
        this.del = false;
      },
      change() {
        this.$emit('input', this.invalue);
        this.del = true;
      },
    },

  };

</script>
<style>
  @import '../styles/default-theme/variables.css';
.round {
    background: #fff none repeat scroll 0 0;
    position: relative;
    padding-right: 0.2rem;
}
.delquery {
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 0;
    font-size: $font-size-xl;
}
.input_key { /*input框*/
    background: none;
    border: 0;
    font: 16px/22px arial;
    height: 0.16rem;
    outline:none;
    padding: 1px 0;
    width: 100%;
}
</style>
