<template>
  <div>
    <div class="c-search-rel" v-if="relation">
      <div class="c-search">
        <input
          class="c-search-key"
          ref="search"
          :name="htmlName"
          type="text"
          v-model="invalue"
          :placeholder="placeholder"
          @input="input"
          @change="change"
          @click.native="open"
        />
        <div class="c-search-closebox">
          <span title="清空" class="c-search-delquery icon-round-close" @click="clear" v-show="_show"></span>
        </div>
      </div>
      <div class="c-search-list" :style="{top: top}">
        <p v-if="focus" v-for="(item, key) in result" @click="clickHandler(item)" :key="key">{{item.label || item}}</p>
      </div>
    </div>
    <div class="c-search" v-else>
      <input
        class="c-search-key"
        ref="search"
        :name="htmlName"
        type="text"
        v-model="invalue"
        :placeholder="placeholder"
        @input="input"
        @change="change"
        @click.native="open"
      />
      <div class="c-search-closebox">
        <span title="清空" class="c-search-delquery icon-round-close" @click="clear" v-show="_show"></span>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'v-search',

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
      itemClick: {
        type: Function,
      },
      top: {
        validator(value) {
          return /^-?(\.|\d+\.)?\d+(px|rem)$/.test(value);
        },
        default: '-1px',
      },
      onSubmit: {
        type: Function,
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
        // this.focus = !this.focus;
        this.itemClick && this.itemClick(item);
      },
    },
  };

</script>
<style lang="postcss">
  @import '../styles/default-theme/variables.css';
  .c-search-rel{
    position: relative;
  }
  .c-search {
      display: flex;
      background: #fff none repeat scroll 0 0;
  }

  .c-search-closebox {
    width: $font-size-xl;
  }

  .c-search-delquery {
    cursor: pointer;
    font-size: $font-size-xl;
    color: #999;
    vertical-align: middle;
  }

  .c-search-key { /*input框*/
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
    max-height: 3rem;
    position: absolute;
    width: 100%;
    box-sizing: border-box;
    top: 0.2rem;
    p{
      margin:0 0.15rem;
      line-height:0.36rem;
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      border-bottom:#efefef 1px solid;
    }
  }
</style>
