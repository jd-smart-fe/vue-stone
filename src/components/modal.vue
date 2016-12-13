<template>
  <div>
    <v-mask :shown="shown" ref="mask">      
    </v-mask>
    <div :class="[showModal ? 'modal' : 'hiddenModal']">
     <h4 class="modal-title">{{title}}</h4>
     <div class="modal-body">
        <div>
        <p>{{message}}</p>
        </div> 
     </div>         
     <div class="modal-buttons" :class="[buttons==2?'modal-button-2':'modal-button-1']">
       
       <a href="#" @click.prevent="leftBtn">{{leftBtnText}}</a>
       <a href="#" v-if="buttons==2" @click.prevent="rightBtn">{{rightBtnText}}</a>
     </div>
    </div>
  </div>   
</template>
<script>
  import vMask from '../components/mask';

  export default {
    name: 'v-modal',
    data() {
      return {
        shown: true,
        showModal: true,
      };
    },
    props: {
      title: {
        type: String,
        default: '加热器有损坏',
      },
      message: {
        type: String,
        default: '点击查看详情可查看设备情况',
      },
      leftBtnText: {
        type: String,
        default: '查看详情',
      },
      rightBtnText: {
        type: String,
        default: '确定',
      },
      buttons: {
        type: Number,
        default: 1,
      },
    },
    mounted() {
      this.$refs.mask.$on('input', () => {

        this.$data.shown = false;

        this.$data.showModal = false;
      });
      if (this.shown) {
        document.body.classList.add('b-hidden');
      }
    },
    methods: {
      leftBtn() {
        this.$emit('leftBtn');
      },
      rightBtn() {
        this.$emit('rightBtn');
      },
    },
    components: {
      vMask,
    },
    watch: {
      shown() {
        if (this.$data.shown) {
          document.body.classList.add('b-hidden');
        } else {
          document.body.classList.remove('b-hidden');
        }
      },
    },
  };
</script>
<style scoped>
    @import '../styles/default-theme/variables.css';
    @import '../styles/mixins.css';

    .modal{      
      width: 2.6rem;
      max-height: 2rem;      
      position: fixed;
      z-index: 101;
      background-color: #fff;
      top: 50%;      
      left: 50%;      
      padding: 0.3rem 0 0.4rem; 
      transform: translateX(-50%) translateY(-50%);
      box-sizing: border-box;
      border-radius:0.02rem;
      .modal-title{
      text-align: center;
      color: #FF6477;
      margin:0 0 0.3rem;       
      }
      > .modal-body{
            padding-bottom: 0.3rem; 
            >div{
            max-height: 0.48rem;
            overflow: auto;              
            > p{
            color:#A1A1A1;
            text-align: center;           
            margin:0;             
          }
       } 
      }
     
      .modal-buttons { 
        position: absolute;
        bottom: 0;       
        width: 100%;        
        height: 0.40rem;
        line-height: 0.40rem;
        border-top: 0.01rem #ccc solid;
        > a{
          display: block;
          height: 100%;
         
          float: left;
          text-align: center;
          text-decoration: none ;
          color:#666;      
        }
        a+a{
            border-left: 0.01rem #ccc solid;
          }
      }
    }
    /*隐藏模态框*/
    .hiddenModal{
        display: none;
    }
    .modal-button-1 > a{
      width: 100%;
    }
    .modal-button-2 > a{
      width: 49.8%;
    }
</style>
<style>
  /*禁止滑动*/
  .b-hidden{
    overflow: hidden;
  }
</style>