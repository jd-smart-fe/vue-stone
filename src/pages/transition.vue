<template>

  <div>
    <tmpl-back></tmpl-back>

    <v-panel>
      <div slot="header" class="c-panel-header u-cross-center">
        <div class="c-panel-title">过渡效果／动画效果</div>
      </div>

      <div slot="body" class="c-panel-body row-2 u-cross-center">
        <v-button type="click" ref="btn_transition"
          @change="transition_status = !transition_status">
          过渡效果
        </v-button>
        <v-transition name="fade" time="1">
          <div v-show="transition_status" class="square"></div>
        </v-transition>
      </div>

      <div slot="body" class="c-panel-body row-2 u-cross-center">
        <v-button ref="btn_animation"
          @change="animation_status = !animation_status"
        > 动画效果 </v-button>
        <v-transition enter="bounceIn" leave="bounceOut" time="1">
          <div v-show="animation_status" class="square"></div>
        </v-transition>
      </div>
    </v-panel>
  </div>
</template>

<script>

  export default {
    name: 'Transition',

    data() {
      return {
        transition_status: true,
        animation_status: true,
      };
    },

    mounted() {
    },

    methods: {
    },
  };
</script>

<style>

  .square {
    width: .5rem;
    height: .5rem;
    background-color: green;
  }
</style>
