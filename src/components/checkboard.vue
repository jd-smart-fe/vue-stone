<template lang="html">
  <div class="c-checkboard">
    <label for="" v-for="item in items" @click="handle(item)"
    :class="item.id === value ? 'c-checkboard-active': '' "
    >
      {{ item.text }}
      <span class="c-checkboard-icon icon-check"></span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'v-checkboard',

  data() {
    return {
      active_id: this.value,
    };
  },

  props: {
    items: {
      type: Array,
      required: false,
      default() {
        return [{
          id: 0,
        }];
      },
    },

    value: {
      type: Number,
      required: false,
      default: 0,
    },
  },

  methods: {
    handle(item) {
      console.log(item.id);
      const val = item.id;

      this.$emit('input', val);
      this.$emit('change', val);
    },
  },
};
</script>

<style lang="css">
@import '../styles/default-theme/variables.css';
@import '../styles/mixins.css';

  .c-checkboard{
    display: flex;
    flex-direction: column;
    width: 100%;

    label{
      padding: 0.16rem 0.12rem;
    }

    label + label{
      border-top: 1px solid $gray-lighter;
    }

    .c-checkboard-active{
      position: relative;

      .c-checkboard-icon{
        display: block;
        color: #00a678;
        font-weight: bolder;
        width: 16px;
        height: 16px;
        position: absolute;
        right: 0.12rem;
        top: 50%;
        transform: translate(0, calc(-@height / 2));
      }
    }

    .c-checkboard-icon{
      display: none;
    }
  }


</style>
