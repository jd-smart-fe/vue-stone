<template>
  <div :class="['c-toast',
    icon && 'c-toast-withicon',
    shown ? 'c-toast-show' : 'c-toast-hide']">

    <span v-if="icon" :class="['c-toast-icon', `${icon}`,
      icon.indexOf('icon-') == 0 && 'icon']"></span>

    <span class="c-toast-text">{{text}}</span>
  </div>
</template>

<script>

  const defaults = {
    autohide: true,
    shown: false,
    duration: 2000,
    icon: '',
  };

  export default {
    name: 'v-toast',
    type: 'singleton',

    data() {
      return {

        ...Object.assign({}, defaults),

        text: '',
        timer: null,
      };
    },

    created() {
      this.inited = false;
    },

    methods: {

      init() {

        document.body.appendChild(this.$el);
        this.inited = true;
      },

      config(cfg) {

        cfg = Object.assign({}, defaults, cfg);

        for (const prop in cfg) {
          if (Object.prototype.hasOwnProperty.call(cfg, prop)) {
            this[prop] = cfg[prop];
          }
        }
      },

      destroy() {
        document.body.removeChild(this.$el);
        this.inited = false;
      },

      show(opt) {

        if (!this.inited) {
          this.init();
        }

        if (typeof opt === 'string') {
          opt = {
            text: opt,
          };
        }
        clearTimeout(this.timer);
        this.config(opt);
        this.shown = true;

        if (!this.autohide) {
          return;
        }
        this.timer = setTimeout(() => {
          this.hide();
        }, this.duration);
      },
      hide() {
        this.shown = false;
      },
    },
  };
</script>

<style>

  @import '../styles/default-theme/variables.css';
  @import '../styles/mixins.css';

  $prefix: .c-toast;

  $prefix {
    position:fixed;
    top: 45%;
    left: 50%;
    width: 80%;
    max-width: 80%;
    transform:translate(-50%,-50%);

    text-align:center;
    z-index:10000;
    font-size: inherit;

    background: rgba(0, 0, 0, 0.8);
    border-radius: $l-radius;

    height: 40px;
    line-height: 40px;

    &.c-toast-withicon {
      width: 100px;
      height: 100px;
      @mixin cross-center;
      border-radius: $l-radius;
      flex-direction: column;
    }

    &.c-toast-hide {
      display: none;
    }

    &.c-toast-show {
      /*display: block;*/
    }
  }

  .c-toast-icon {
    display: block;
    color: white;
    margin-top: 20px;
    font-size: 30px;
    margin-bottom: 5px;
  }

  .c-toast-text {
    color: white;
    display: inline-block;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    max-width: 100%;
    width: auto;
  }

</style>
