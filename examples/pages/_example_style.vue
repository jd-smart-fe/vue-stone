

<style>
  @import '../../src/styles/default-theme/variables.css';
  @import '../../src/styles/mixins.css';

  body {
    background-color: #efefef;
  }

  #app {
    color: #2c3e50;
    margin-top: 80px;
    margin-bottom: 60px;
  }

  a {
    text-decoration: none;
    -webkit-tap-highlight-color:rgba(0, 0, 0, 0);
  }

  .page-header {

    @mixin box-shadow;
    @mixin cross-center;

    line-height: calc($grid-size * 2);
    font-size: 16px;
    text-align: center;
    display: block;

    margin-top: -80px;

    width: 100%;
    position: fixed;

    background: whitesmoke;

    .page-header-left {
      padding: 0 10px;
      @mixin cross-center;
    }

    .back-link {
      color: inherit;
    }
  }

</style>
