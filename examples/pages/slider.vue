<template>
  <div>
    <div class="page-header row-2 u-cross-center">
      <div class="page-header-left u-cross-center row-2">
        <router-link to="/" class="back-link">
          <span class="icon v-icon-pull-left page-header-icon"></span>返回
        </router-link>
      </div>
    </div>

    <v-panel>
      <div slot="body" class="c-panel-body u-cross-center">
        <v-slide v-model="slide_value">
          <div slot="item">
            <div style="height: 100px; display: flex; justify-content: center; align-items: center;">item1</div>
          </div>
          <div slot="item">
            <div style="height: 100px; display: flex; justify-content: center; align-items: center;">item2</div>
          </div>
          <div slot="item">
            <div style="height: 100px; display: flex; justify-content: center; align-items: center;">item3</div>
          </div>
          <div slot="item">
            <div style="height: 100px; display: flex; justify-content: center; align-items: center;">item4</div>
          </div>
          <div slot="item">
            <div style="height: 100px; display: flex; justify-content: center; align-items: center;">item5</div>
          </div>
        </v-slide>
      </div>

    </v-panel>
  </div>

</template>

<script>

  export default {
    name: 'Modes',

    data() {
      return {
        slide_value: 0,
      };
    },

    mounted() {

    },

    methods: {
    },
  };
</script>

<style>


</style>
