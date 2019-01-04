<template>
  <div>
    <tmpl-back></tmpl-back>
    <v-panel>
      <div slot="body" class="c-panel-body row-3 u-cross-center">
        <div slot="title" class="c-panel-title ">counter:
          <div class="number-text" >
            {{ countNumber }}
          </div>
        </div>
        <v-counter
          slot="main" ref="counter" v-model="countNumber"
          :max="10" :min="0" :step="1" :longTap="true">
        </v-counter>
      </div>
    </v-panel>

    <v-panel>
      <div slot="body" class="c-panel-body row-3 u-cross-center">
        <div slot="title" class="c-panel-title ">禁用状态:
          <div :class="['number-text', disabled ? 'disabled' : '']">
            {{ countNumber2 }}
          </div>
        </div>
        <v-counter
          slot="main" ref="counterDisabled" v-model="countNumber2"
          :max="max" :min="min" :step="step" :disabled= "disabled" :longTap="true">
        </v-counter>
      </div>
    </v-panel>

  </div>
</template>

<script>

  export default {
    name: 'Counter',

    data() {
      return {
        countNumber: 5,
        disabled: true,
        countNumber2: 5,
        max: 10,
        min: 0,
        step: 1,
      };
    },

    mounted() {
      this.$refs.counter.$on('increase', (val) => {
        console.log(`触发increase事件 当前值为：${val}`);
      });

      this.$refs.counter.$on('decrease', (val) => {
        console.log(`触发decrease事件 当前值为：${val}`);
      });
    },

    methods: {
    },
  };
</script>

<style>

  @import '../../src/styles/default-theme/variables.css';
  @import '../../src/styles/mixins.css';

  .number-text{
    font-size: $font-size-32;
    color: $c-primary;
  }
  .disabled {
   color: #ccc;
  }
</style>
