<template>
  <div>
    <v-mask :shown="shown" ref="mask">
    </v-mask>
    <div class="c-dialog" v-show="shown">
      <h4 v-if="dialog.title" class="c-dialog-title">{{dialog.title}}</h4>
      <div v-if="dialog.description" class="c-dialog-body" :class="[!dialog.description ? 'c-dialog-body-empty':'']">
        <div>
          <p>{{dialog.description}}</p>
        </div>
      </div>
      <div class="c-dialog-footer">
        <div class="c-dialog-buttons" :class="getButtonClass()">
          <template v-if="dialog.buttons.length===0">
            <a href="#" @click.prevent="handle(dialog.buttons.length)">确定</a>
          </template>
          <template v-else>
            <a href="#" v-for="(item,index) in dialog.buttons" @click.prevent="handle(index)">{{item.text}}</a>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

const def = {
  title: '',
  description: '',
  buttons: [
    // { text: '取消', callback: () => { } },
    // { text: '确定', callback: () => { this.shown = false; } },
  ],
};
export default {
  name: 'v-dialog',
  type: 'singleton',

  data() {
    return {
      shown: false,
      dialog: {
        title: '',
        description: '',
        buttons: [],
      },
    };
  },
  watch: {
    shown(val) {
      if (!val) {
        this.$emit('dialog.close');
      }
    },
  },
  mounted() {
    this.$refs.mask.$on('click', () => {
      this.shown = false;
    });
  },
  methods: {
    handle(index) {
      if (this.dialog.buttons.length && this.dialog.buttons[index].callback) {
        this.dialog.buttons[index].callback();
      } else {
        this.$emit('dialog.button.click', index);
      }
    },
    init() {
      if (!this.inited) {
        document.body.appendChild(this.$el);
        this.inited = true;
      }
    },
    show(options) {
      if (!this.inited) {
        this.init();
      }
      const obj = Object.assign(def, options);
      if (!obj.title && !obj.description) {
        obj.title = 'JDSmart';
      }
      this.dialog = obj;
      this.shown = true;
    },
    hide() {
      this.shown = false;
    },
    getButtonClass() {
      const buttonLength = this.dialog.buttons.length;
      let className = 'c-dialog-button-2';
      switch (buttonLength) {
        case 0:
        case 1:
          className = 'c-dialog-button-1';
          break;
        default:
          break;
      }
      return className;
    },
  },
};
</script>
<style>
@import '../styles/default-theme/variables.css';
@import '../styles/mixins.css';
.c-dialog {
  width: 2.62rem;
  max-height: 2rem;
  position: fixed;
  z-index: 101;
  background-color: $white;
  top: 50%;
  left: 50%;
  padding: 0.3rem 0 0.4rem;
  transform: translateX(-50%) translateY(-50%);
  box-sizing: border-box;
  border-radius: 0.02rem;
  .c-dialog-title {
    text-align: center;
    color: $c-dialog-title;
    margin: 0 0 0.3rem;
  }
  >.c-dialog-body {
    padding-bottom: 0.3rem;
    >div {
      max-height: 0.48rem;
      overflow: auto;
      >p {
        color: $gray-light;
        text-align: center;
        margin: 0;
      }
    }
  }
  .c-dialog-footer>.c-dialog-buttons {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 0.40rem;
    line-height: 0.40rem;
    border-top: 0.01rem $gray-lighter solid;
    >a {
      display: block;
      height: 100%;
      float: left;
      text-align: center;
      text-decoration: none;
      color: $gray;
    }
    a+a {
      border-left: 0.01rem $gray-lighter solid;
    }
  }
}





/**
   *一个按钮样式
   */

.c-dialog-button-1>a {
  width: 100%;
}





/**
   *两个按钮样式
   */

.c-dialog-button-2>a {
  width: 49.8%;
}





/**
   *没有text样式
   */

.c-dialog>.c-dialog-body-empty {
  padding: 0;
}
</style>
