<template>
  <div>

    <v-mask :value="insideValue" @click.native="maskClick">
    </v-mask>

    <!-- dialog start -->
    <transition name="fade">
      <div class="c-dialog" v-show="insideValue" >

        <h4
          v-if=" title !== '' "
          :class="['c-dialog-title', onlyTitle ? 'c-dialog-only-title' : '']"
          :style="{ color: tcolor }"
        >
          {{title}}
        </h4>

        <div v-if=" desc !== '' " class="c-dialog-desc" >
          <span :style="{ color: dcolor }">{{ desc }}</span>
        </div>

        <div>
          <slot></slot>
        </div>

        <div class="c-dialog-footer">
          <div class="c-dialog-buttons">

            <a
              v-for="(item, index) in buttons"
              :key="item.text"
              :style="item.color ? 'color:' + item.color : ''"
              href="#"
              @click.prevent="buttonClick(index)"
            >{{ item.text }}</a>

          </div>
        </div>

      </div>
    </transition>
    <!-- dialog end -->
  </div>
</template>
<script>

export default {
  name: 'v-dialog',
  // type: 'singleton',

  data() {
    return {
      insideValue: this.value,
      hasSlot: false,
    };
  },

  props: {
    value: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: '提示',
    },
    desc: {
      type: String,
      default: '',
    },
    buttons: {
      type: Array,
      default() {
        return [{ text: '确定', color: '#59B8FC' }];
      },
    },
    tcolor: {
      type: String,
      default: '#333',
    },
    dcolor: {
      type: String,
      default: '#999',
    },
    preventClose: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    onlyTitle() {
      if (this.desc === '' && !this.hasSlot) {
        return true;
      }
      return false;
    },
  },

  watch: {
    insideValue(val) {
      this.$emit('input', val);

      if (val) {
        this.$emit('show');
      } else {
        this.$emit('hide');
      }
    },

    value(val) {
      if (val !== this.insideValue) {
        this.insideValue = val;
      }
    },
  },

  mounted() {
    if (this.$slots.default && this.$slots.default.length > 0) {
      this.hasSlot = true;
    }
  },

  methods: {
    buttonClick(index) {
      this.$emit(`button${this.transNumber(index)}`);
      this.insideValue = false;
    },

    maskClick() {
      this.$emit('maskclick');
    },

    transNumber(number) {
      const rank = ['first', 'second', 'third', 'fourth', 'fifth'];
      return rank[number];
    },

    show() {
      this.insideValue = true;
    },

    hide() {
      this.insideValue = false;
    },
  },
};
</script>
<style lang="postcss">
@import '../styles/default-theme/variables.css';
@import '../styles/mixins.css';

.c-dialog {
  box-sizing: border-box;
  width: 2.62rem;
  border-radius: 0.02rem;

  background-color: $white;
  font-size: .14rem;

  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 101;

  transform: translateX(-50%) translateY(-50%);

  .c-dialog-title {
    font-weight: normal;
    text-align: center;
    color: $c-dialog-title;

    padding: 0.2rem 0;
    margin: 0;

    &.c-dialog-only-title{
      padding: 0.3rem 0;
    }
  }


  > .c-dialog-desc {
    display: flex;
    align-item: center;
    justify-content: center;
    padding: 0.1rem 0.25rem 0.3rem;;

    > p {
      flex: none;
      display: inline;
      margin: 0;

      color: $gray-light;
      text-align: left;
    }
  }

  .c-dialog-footer > .c-dialog-buttons {
    line-height: 0.40rem;
    border-top: 0.01rem $gray-lighter solid;

    display: flex;
    width: 100%;
    height: 0.40rem;

    > a {
      flex: 1;
      display: block;
      height: 100%;
      text-align: center;
      text-decoration: none;
      color: $c-primary;
    }

    a + a {
      border-left: 0.01rem $gray-lighter solid;
    }
  }
}
</style>
