<!--
 * @Description: loading 组件 review 代码改版
 * @Author: shilili1
 * @Date: 2018-11-13 14:49:59
 * @LastEditTime: 2019-01-03 18:12:38
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <v-mask :value="mask" :cls="cls"></v-mask>
    <div
      class="c-loading center" v-show="loadingShown">
      <div class="c-iconloading"> </div>
      <span class="c-iconloading-text">
        {{text}}
      </span>
    </div>

  </div>
</template>

<script>

export default {
  name: 'v-loading',
  type: 'singleton',
  data() {
    return {
      mask: false,
      loadingShown: false,
      text: '加载中',
      // pos: 'center',
      // duration: 3000, // 持续时间
      cls: 'c-bgc',
    };
  },
  methods: {
    /**
     * @description: 初始化
     * @param {}
     * @return:
     */
    init() {
      document.body.appendChild(this.$el);
      this.inited = true;
    },

    /**
     * @description: 展示
     * @param option {Object} 参数
     * @return:
     */
    show(option = {}) {

      this.mask = option.mask || this.mask;
      this.text = option.text || this.text;
      // this.pos = option.pos || this.pos;
      // this.duration = option.duration || this.duration;

      if (!this.inited) {
        this.init();
      }
      this.loadingShown = true;

      // setTimeout(() => {
      //   this.$loading.hide();
      // }, this.duration);
    },

    /**
     * @description: 隐藏
     * @param {}
     * @return:
     */
    hide() {
      this.mask = false;
      this.loadingShown = false;
    },

    /**
     * @description: 生命周期销毁
     * @param {}
     * @return:
     */
    destroy() {
      document.body.removeChild(this.$el);
      this.inited = false;
    },
  },
};
</script>

<style lang="postcss">
@import '../styles/default-theme/variables.css';
@import '../styles/mixins.css';
.c-loading {
  position: fixed;
  width: 40%;
  background-color: rgba(0, 0, 0, .8);
  border-radius: $l-radius;
  padding: 20px 0;
  z-index: 101;
}
.c-bgc {
  background-color: transparent;
}
@keyframes rotation {
  0% {
    transform: rotate3d(0, 0, 1, 0deg);
  }
  100% {
    transform: rotate3d(0, 0, 1, 360deg);
  }
}
.c-iconloading {
  background: transparent url(../assets/loading.png);
  width: 30px;
  height: 30px;
  background-size: cover;
  animation: rotation 1s infinite;
  margin: auto;
  margin-bottom: 10px;
  left: 50%;
  position: relative;
  display: inline-block;
  margin-left: -15px;
}

.c-iconloading-text {
  display: inline-block;
  text-align: center;
  color: #fff;
  width: 100%;
}
/* 增加位置信息 */
.center{
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
/* .bottom{
 left: 50%;
 margin-left: -20%;
 bottom: 10px;
} */
/* .top{
  left: 50%;
  margin-left: -20%;
  top: 10px;
}
.top,
.bottom{
  width: 50%;
  padding: 10px 4px;
  .c-iconloading{
    display: none;
  }
  .c-iconloading-text{
    &:after{
      content: '....';
      color: #fff;
      font-size: 20px;
    }
  }
} */
</style>
