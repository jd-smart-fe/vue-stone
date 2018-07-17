<template>
  <div>

    <tmpl-back></tmpl-back>

    <v-control-center
      ref="controlCenter"
      top_text="上部"
      :top_icon="topIcon"
      bottom_text="下部"
      :bottom_icon="bottomIcon"
      left_text="左部"
      :left_icon="leftIcon"
      right_text="右部"
      :right_icon="rightIcon"
      center_text="OK"
    ></v-control-center>
  </div>
</template>

<script>
import topIcon from '../../src/assets/home.png';
import bottomIcon from '../../src/assets/mute.png';
import leftIcon from '../../src/assets/menu.png';
import rightIcon from '../../src/assets/return.png';

export default {
  name: 'Control-center',
  data() {
    return {
      topIcon,
      bottomIcon,
      leftIcon,
      rightIcon,
    };
  },
  mounted() {
    this.$refs.controlCenter.$on('topHandle', () => {
      console.log('触发topHandle事件');
    });
    this.$refs.controlCenter.$on('bottomHandle', () => {
      console.log('触发bottomHandle事件');
    });
    this.$refs.controlCenter.$on('leftHandle', () => {
      console.log('触发leftHandle事件');
    });
    this.$refs.controlCenter.$on('rightHandle', () => {
      console.log('触发rightHandle事件');
    });
    this.$refs.controlCenter.$on('centerHandle', () => {
      console.log('触发centerHandle事件');
    });
  },
  methods: {
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
