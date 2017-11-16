<template>
  <div>
    <v-mask :value="maskShown" :cls="cls">

    </v-mask>
    <div class="c-loading" v-show="loadingShown">
      <div class="c-iconloading">

      </div>
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
      maskShown: false,
      loadingShown: false,
      text: '加载中',
      cls: 'c-bgc',
    };
  },
  methods: {
    init() {
      document.body.appendChild(this.$el);
      this.inited = true;
    },
    show(option = {}) {
      console.log(option.modal);
      if (option.modal) {
        this.maskShown = option.modal;
      }
      if (option.text) {
        this.text = option.text;
      }
      if (!this.inited) {
        this.init();
      }
      this.loadingShown = true;
    },
    hide() {
      this.maskShown = false;
      this.loadingShown = false;
      // this.$toast.hide();
    },
    destroy() {
      document.body.removeChild(this.$el);
      this.inited = false;
    },
  },
};
</script>

<style>
@import '../styles/default-theme/variables.css';
@import '../styles/mixins.css';
.c-loading {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
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
</style>
