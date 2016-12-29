<template>
  <div>
    <v-mask :shown="modal" ref="mask">
    </v-mask>
    <div class="c-dialog" v-show="showDialog">
      <h4 class="c-dialog-title">{{dialog.title}}</h4>
      <div class="c-dialog-body" :class="[!dialog.description ? 'c-dialog-body-empty':'']">
        <div>
          <p>{{dialog.description}}</p>
        </div>
      </div>
      <div class="c-dialog-footer">
        <div class="c-dialog-buttons" :class="getButtonClass()">
          <template v-if="dialog.buttons.length===0">
            <a href="#"@click.prevent="leftBtn">确定</a>
            <a href="#"@click.prevent="rightBtn">取消</a>
          </template >
          <template v-else>
            <a href="#" v-for="(item,index) in dialog.buttons" @click.prevent="item.defaultCallback">{{item.text}}</a>
          </template >

        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'v-dialog',
    data() {
      return {
        modal: false,
      };
    },
    props: {
      showDialog: {
        type: Boolean,
        required: false,
        default: false,
      },
      options: {
        type: Object,
        required: false,
        default: {},
      },
    },
    computed: {
      dialog: {
        get() {
          const _dialog = this.options;
          const dialog = {
            title: _dialog.title || '提示',
            description: _dialog.description,

            buttons: _dialog.buttons ? _dialog.buttons.map((arr, index) => {
              const defaultInfoArray = [
                { text: '取消', callback: this.leftBtn },
                { text: '确定', callback: this.rightBtn },
              ];
              // arr.callback = arr.callback || defaultInfoArray[index].callback;
              // arr.text = arr.text || defaultInfoArray[index].text;
              arr.defaultCallback = defaultInfoArray[index].callback;
              arr.text = arr.text || defaultInfoArray[index].text;
              return arr;
            }) : [],
          };
          return dialog;
        },

      },
    },
    mounted() {
      this.$refs.mask.$on('click', () => {
        this.$emit('maskClick');// mask的click事件向上抛
      });
    },
    methods: {
      leftBtn() {
        this.$emit('defaultClick');
        if (this.dialog.buttons[0] && this.dialog.buttons[0].callback) {
          this.dialog.buttons[0].callback();
        }
      },
      rightBtn() {
        this.$emit('primaryClick');
        if (this.dialog.buttons[1] && this.dialog.buttons[1].callback) {
          this.dialog.buttons[1].callback();
        }
      },
      getButtonClass() {
        const buttonLength = this.dialog.buttons.length;
        let className = 'c-dialog-button-2';
        switch (buttonLength) {
          case 1:
            className = 'c-dialog-button-1';
            break;
          default:
            break;
        }
        return className;
      },
    },
    watch: {
      showDialog(value) {
        // 如果dialog为false则modal也为false
        if (!value) {
          this.modal = value;
        }
        // 若果没有传递值默认是模态的
        switch (this.options.isModal && value) {
          case undefined:
            this.modal = value;
            break;
          case false:
            this.modal = false;
            break;
          default:
            this.modal = true;
            break;
        }
        // console.debug(`showDialog发生了改变${value}`);
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
    > .c-dialog-body {
      padding-bottom: 0.3rem;
      >div {
        max-height: 0.48rem;
        overflow: auto;
        > p {
          color: $gray-light;
          text-align: center;
          margin: 0;
        }
      }
    }
    .c-dialog-footer > .c-dialog-buttons {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 0.40rem;
      line-height: 0.40rem;
      border-top: 0.01rem $gray-lighter solid;
      > a {
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
  .c-dialog-button-1 > a {
    width: 100%;
  }
  /**
   *两个按钮样式
   */
  .c-dialog-button-2 > a {
    width: 49.8%;
  }
   /**
   *没有text样式
   */
  .c-dialog > .c-dialog-body-empty{
    padding: 0 ;
  }
</style>
