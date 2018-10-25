<template>
  <div>
    <div v-if="relation">
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
        />
        <div class="c-input-closebox">
          <span title="清空s" class="c-input-delquery icon-round-close" @click="clear" v-show="_show"></span>
        </div>
      </div>
      <div class="c-search-list">
        <p v-if="focus" v-for="(item, key) in result" @click="clickHandler(item)" :key="key">{{item.label || item}}</p>
      </div>
    </div>
    <div class="c-input" v-else>
      <input
        class="c-input-key"
        ref="input"
        :name="htmlName"
        type="text"
        v-model="invalue"
        :placeholder="placeholder"
        @input="input"
        @change="change"
      />
      <div class="c-input-closebox">
        <span title="清空" class="c-input-delquery icon-round-close" @click="clear" v-show="_show"></span>
      </div>
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
      relation: {
        type: Boolean,
        default: false,
      },
      result: {
        type: Array,
        default() {
          return [];
        },
      },
    },

    mounted() {
      const el = this.$el.getElementsByTagName('input')[0];

      el.addEventListener('focus', () => {
        this.focus = true;
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
      clickHandler(item) {
        this.invalue = item.label ? item.label : item;
        this.focus = !this.focus;
      },
    },

  };

</script>
<style lang="postcss">
  @import '../styles/default-theme/variables.css';

  .c-input {
      display: flex;
      background: #fff none repeat scroll 0 0;
      position: relative;
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
    -webkit-user-select:auto;
    background: none;
    border: 0;
    font: 16px/22px arial;
    outline:none;
    padding: 1px 0;
    padding-right: 0.06rem;
    width: 100%;
  }
  .c-search-list{
    background: #fff;
    overflow: auto;
    background-color: #fff;
    z-index: 9;
    overflow: auto;
    p{
      margin:0;
      line-height:0.36rem;
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      border-bottom:#efefef 1px solid;
    }
  }
</style>
