<template>
  <div>
    <v-mask :shown="showModal" ref="mask">
    </v-mask>
    <div :class="[showModal ? 'c-modal' : 'u-hidden']">
      <h4 class="c-modal-title">{{modal.title}}</h4>
      <div class="c-modal-body" :class="[!modal.text ? 'c-modal-body-empty':'']">
        <div>
          <p>{{modal.text}}</p>
        </div>
      </div>
      <div class="c-modal-footer">
        <div class="c-modal-buttons" :class="[modal.buttons.length==2?'c-modal-button-2':'c-modal-button-1']">
          <a href="#" v-for="(item,index) in modal.buttons" @click.prevent="item.callback">{{item.text}}</a>
          <!--<a href="#" @click.prevent="leftBtn">{{modal.buttons[0].text}}</a>
          <a href="#" v-if="modal.buttons.length==2" @click.prevent="rightBtn">{{modal.buttons[1].text}}</a>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'v-modal',
    data() {
      return {
        // shown: true,
        showModal: false,
      };
    },
    props: {
      options: {
        type: Object,
      },
    },
    computed: {
      modal: {
        get() {
          const _modal = this.options;
          const modal = {
            title: _modal.title || '加热器有损坏',
            text: _modal.text,
            buttons: _modal.buttons.map((arr, index) => {
              const defaultInfoArray = [
                { text: '取消', callback: this.leftBtn },
                { text: '确定', callback: this.rightBtn },
              ];
              arr.callback = arr.callback || defaultInfoArray[index].callback;
              arr.text = arr.text || defaultInfoArray[index].text;
              return arr;
            }),
          };
          return modal;
        },

      },
    },
    mounted() {
      this.$refs.mask.$on('input', () => {
        // this.shown = false;
        this.showModal = false;
      });
    },
    methods: {
      leftBtn() {
        this.$emit('left');
      },
      rightBtn() {
        this.$emit('right');
      },
    },
  };
</script>
<style>
  @import '../styles/default-theme/variables.css';
  @import '../styles/mixins.css';
  .c-modal {
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
    .c-modal-title {
      text-align: center;
      color: $c-modal-title;
      margin: 0 0 0.3rem;
    }
    > .c-modal-body {
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
    .c-modal-footer > .c-modal-buttons {
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
  .c-modal-button-1 > a {
    width: 100%;
  }
  /**
   *两个按钮样式
   */
  .c-modal-button-2 > a {
    width: 49.8%;
  }
   /**
   *没有text样式
   */
  .c-modal > .c-modal-body-empty{
    padding: 0 ;
  }
</style>