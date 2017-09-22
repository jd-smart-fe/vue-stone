<template>
  <div class="c-input">
    <input
      class="c-input-key"
      ref="input"
      :name="htmlName"
      type="text"
      v-model="invalue"
      :placeholder="placeholder"
      @input="input"
      @change="change"
    ></input>

    <div class="c-input-closebox">
      <span title="清空" class="c-input-delquery icon-round-close" @touchstart="clear" v-show="_show"></span>
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
    },

    mounted() {
      const el = this.$el.getElementsByTagName('input')[0];

      el.addEventListener('focus', () => {
        this.focus = true;
      });

      el.addEventListener('blur', () => {
        this.focus = false;
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
<style>
.c-input {
    display: flex;
    background: #fff none repeat scroll 0 0;
}

.c-input-closebox {
  width: $font-size-xl;
}

.c-input-delquery {
  cursor: pointer;
  font-size: $font-size-xl;
  color: #999;
  vertical-align: middle;
}

.c-input-key { /*input框*/
  background: none;
  border: 0;
  font: 16px/22px arial;
  outline:none;
  padding: 1px 0;
  padding-right: 0.06rem;
  width: 100%;
}
</style>
