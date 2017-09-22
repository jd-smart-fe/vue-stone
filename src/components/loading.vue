<script>

  export default {
    name: 'v-loading',
    type: 'singleton',

    methods: {

      show() {
        this.$toast.show({
          icon: 'c-toast-iconloading',
          text: '加载中',
          autohide: false,
        });
      },

      hide() {
        this.$toast.hide();
      },
    },
  };
</script>

<style>

  @keyframes rotation {
    0% {
      transform: rotate3d(0, 0, 1, 0deg);
    }
    100% {
      transform: rotate3d(0, 0, 1, 360deg);
    }
  }

  .c-toast-iconloading {
    background: transparent url(../assets/loading.png);
    width: 30px;
    height: 30px;
    background-size: cover;
    animation: rotation 1s infinite;

    margin: auto;
    margin-top: 20px;
    margin-bottom: 5px;
  }

</style>
