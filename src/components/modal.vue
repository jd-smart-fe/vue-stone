<template>
  <div>
    <v-mask :shown="shown" ref="mask">      
    </v-mask>
    <div :class="[showModal ? 'modal' : 'u-hidden']">
     <h4 class="modal-title">{{title}}</h4>
     <div class="modal-body">
        <div>
        <p>{{message}}</p>
        </div> 
     </div>         
     <div class="modal-buttons" :class="[buttons==2?'modal-button-2':'modal-button-1']">
       <a href="#" @click.prevent="leftBtn">{{buttonData.leftBtnText}}</a>
       <a href="#" v-if="buttons==2" @click.prevent="rightBtn">{{buttonData.rightBtnText}}</a> 
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
        shown: false,
        showModal: false,
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
      buttonData: {
        type: Object,
        default() {
          return {
            leftBtnText: '查看详情',
            rightBtnText: '确定',
          };
        },
      },
      buttons: {
        type: Number,
        default: 2,
      },
    },
    mounted() {
      this.$refs.mask.$on('input', () => {

        this.$data.shown = false;

        this.$data.showModal = false;
      });
      if (this.shown) {
        document.body.classList.add('u-ofh');
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
          document.body.classList.add('u-ofh');
        } else {
          document.body.classList.remove('u-ofh');
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
      background-color: $white;
      top: 50%;      
      left: 50%;      
      padding: 0.3rem 0 0.4rem; 
      transform: translateX(-50%) translateY(-50%);
      box-sizing: border-box;
      border-radius:0.02rem;
      .modal-title{
      text-align: center;
      color: $modal-title;
      margin:0 0 0.3rem;       
      }
      > .modal-body{
            padding-bottom: 0.3rem; 
            >div{
            max-height: 0.48rem;
            overflow: auto;              
            > p{
            color:$gray-light ;
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
        border-top: 0.01rem $gray-lighter solid;
        > a{
          display: block;
          height: 100%;         
          float: left;
          text-align: center;
          text-decoration: none ;
          color:$gray;      
        }
        a+a{
            border-left: 0.01rem $gray-lighter solid;
          }
      }
    }
    /*隐藏模态框*/    
    .modal-button-1 > a{
      width: 100%;
    }
    .modal-button-2 > a{
      width: 49.8%;
    }
</style>