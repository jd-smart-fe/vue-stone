<template>
  <div>
    <div class="control-content">
      <div class="control-plate">
        <button
          :class="['plate-top']"
          @click="topHandle"
          @touchstart="touchHandle"
          >
          <dl class="dl-top">
            <dt :class="['icon-top']">
              <img :src="top_icon"/>
            </dt>
            <dd>{{top_text === '' ? '主页' : top_text}}</dd>
          </dl>
        </button>
        <button
          :class="['plate-right']"
          @click="rightHandle"
          @touchstart="touchHandle"
          >
          <dl class="dl-right">
            <dt :class="['icon-right']">
              <img :src="right_icon"/>
            </dt>
            <dd>{{right_text === '' ? '返回' : right_text}}</dd>
          </dl>
        </button>
        <button
          :class="['plate-bottom']"
          @click="bottomHandle"
          @touchstart="touchHandle"
          >
          <dl class="dl-bottom">
            <dt :class="['icon-bottom']">
              <img :src="bottom_icon"/>
            </dt>
            <dd>{{bottom_text === '' ? '静音' : bottom_text}}</dd>
          </dl>
        </button>
        <button
          :class="['plate-left']"
          @click="leftHandle"
          @touchstart="touchHandle"
          >
          <dl class="dl-left">
            <dt :class="['icon-left']">
              <img :src="left_icon"/>
            </dt>
            <dd>{{left_text === '' ? '菜单' : left_text}}</dd>
          </dl>
        </button>
      </div>
      <div
        class="control-circle"
        @click="centerHandle"
        @touchstart="touchHandle"
      >{{center_text === '' ? 'OK' : center_text}}</div>
      <div class="line-firt"></div>
      <div class="line-sec"></div>
    </div>
  </div>
</template>

<script>
import topIcon from '../assets/home.png';
import bottomIcon from '../assets/mute.png';
import leftIcon from '../assets/menu.png';
import rightIcon from '../assets/return.png';

export default {
  name: 'v-control-center',
  data() {
    return {
    };
  },
  props: {
    top_text: {
      type: String,
      default: '主页',
    },
    top_icon: {
      type: String,
      default: topIcon,
    },
    bottom_text: {
      type: String,
      default: '静音',
    },
    bottom_icon: {
      type: String,
      default: bottomIcon,
    },
    left_text: {
      type: String,
      default: '菜单',
    },
    left_icon: {
      type: String,
      default: leftIcon,
    },
    right_text: {
      type: String,
      default: '返回',
    },
    right_icon: {
      type: String,
      default: rightIcon,
    },
    center_text: {
      type: String,
      default: 'OK',
    },
  },
  mounted() {
  },
  methods: {
    // 为了解决ios端active不生效问题需要加一个touchstart空函数
    touchHandle() {
    },
    // 点击控制面板
    topHandle() {
      // 上部
      this.$emit('topHandle');
    },
    bottomHandle() {
      // 下部
      this.$emit('bottomHandle');
    },
    leftHandle() {
      // 左部
      this.$emit('leftHandle');
    },
    rightHandle() {
      // 右部
      this.$emit('rightHandle');
    },
    centerHandle() {
      // 中间
      this.$emit('centerHandle');
    },
  },
};
</script>

<style lang="postcss">
* {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.control-content {
  border: 1px solid #EAEAEA;
  margin: 0.05rem 0.04rem 0 0.04rem;
  height: 2.05rem;
  display: flex;
  background: white;
  justify-content: center;
  align-items: center;
  border-radius: 0.03rem;
  position: relative;
  .control-plate {
    width: 1.654rem;
    height: 1.654rem;
    border-radius: 0.37rem;
    border: 1px solid #C8C8C8;
    overflow: hidden;
    position: relative;
    .plate-top, .plate-right, .plate-bottom, .plate-left {
      width: 1.654rem;
      height: 1.654rem;
      transform: rotate(45deg);
      position: absolute;
      background: transparent;
      border: 0;
      top:0;
      left: 0;
      &:active {
        background: #EFEFEF;
      }
    }
    .plate-top {
      top: -70%;
    }
    .plate-right {
      left: 70%;
    }
    .plate-bottom {
      top: 70%;
    }
    .plate-left {
      left: -70%;
    }
  }
  .control-circle {
    width: 0.56rem;
    height: 0.56rem;
    line-height: 0.56rem;
    border-radius: 50%;
    background: white;
    border: 1px solid #C8C8C8;
    color: #03BCEE;
    text-align: center;
    font-size: 0.16rem;
    position: absolute;
    z-index: 1;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    &:active {
      background: #EFEFEF;
    }
  }
  .line-firt {
    position: absolute;
    transform: rotate(135deg);
    width: 2.05rem;
    height: 1px;
    background: #C8C8C8;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .line-sec {
    position: absolute;
    transform: rotate(45deg);
    width: 2.05rem;
    height: 1px;
    background: #C8C8C8;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .dl-top {
    position: absolute;
    width: 0.84rem;
    z-index: 1;
    text-align: center;
    top: 1rem;
    left: 0.86rem;
    transform: rotate(-45deg);
    .icon-top img {
      width: 0.19rem;
      height: 0.19rem;
      margin-left: 0.25rem;
    }
    dd {
      margin-top: 0.03rem;
      font-size: 0.12rem;
      color: #03BCEE;
      -webkit-margin-start: 0px;
      margin-left: 0.25rem;
      margin-bottom: 0.3rem;
    }
  }
  .dl-left {
    position: absolute;
    width: 0.55rem;
    z-index: 1;
    text-align: center;
    top: 0.1rem;
    left: 1rem;
    transform: rotate(-45deg);
    .icon-left img {
      width: 0.19rem;
      height: 0.19rem;
    }
    dd {
      margin-top: 0.03rem;
      font-size: 0.12rem;
      color: #03BCEE;
      -webkit-margin-start: 0px;
    }
  }
  .dl-bottom {
    position: absolute;
    width: 0.84rem;
    z-index: 1;
    text-align: center;
    top: 0.1rem;
    left: -0.03rem;
    transform: rotate(-45deg);
    .icon-bottom img {
      width: 0.19rem;
      height: 0.19rem;
      margin-left: 0.04rem;
    }
    dd {
      margin-top: 0.03rem;
      font-size: 0.12rem;
      color: #03BCEE;
      -webkit-margin-start: 0px;
      margin-left: 0.04rem;
    }
  }
  .dl-right {
    position: absolute;
    width: 0.55rem;
    z-index: 1;
    text-align: center;
    top: 1rem;
    left: 0.1rem;
    transform: rotate(-45deg);
    .icon-right img {
      width: 0.19rem;
      height: 0.19rem;
      margin-left: 0.09rem;
    }
    dd {
      margin-top: 0.03rem;
      font-size: 0.12rem;
      color: #03BCEE;
      -webkit-margin-start: 0px;
      margin-left: 0.09rem;
    }
  }
}
</style>
