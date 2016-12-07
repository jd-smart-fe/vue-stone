<template>

  <div :class="['c-grid', `c-grid-${number_per_line}`]" >
    <div v-for="(item, index) in items"
      :class="['c-grid-item', {'c-grid-item-active': selected_id == item.id}]"
      @click="handle(item)">
        <span :class="['c-grid-item-icon', `icon-${item.icon}`]" v-if="item.icon"></span>
        <span class="c-grid-item-text">{{item.text}}</span>
     </div>
  </div>
</template>

<script>

  // TODO: 组件初始化的时候，检查是否需要设置默认值。
  export default {
    name: 'v-grid',
    props: {

      items: {
        type: Array,
        required: true,
      },
      number_per_line: {
        type: Number,
        default: 4,     // 2, 3
      },
    },

    data() {
      return {
        selected_id: 0,
      };
    },

    methods: {
      handle(item) {
        this.selected_id = item.id;
        this.$emit('change', item);
      },
    },
  };
</script>

<style scoped>

  @import '../styles/default-theme/variables.css';
  @import '../styles/mixins.css';

  .c-grid {
    margin-left: -1px;
    margin-right: -1px;
    display: flex;
    flex-wrap: wrap;
  }

  .c-grid-item {
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: $font-size-sm;
    @mixin transition background-color;
  }
  .c-grid-item-icon {
    font-size: $font-size-xl;
  }

  .c-grid-4 {
    .c-grid-item {
      flex-direction: column;
      width: calc(100% / 4);
      height: calc($grid-size * 3);
    }
    .c-grid-item-icon {
      margin-bottom: 0.1rem;
    }
  }

  @for $i from 2 to 3 {
    .c-grid-$i {
      .c-grid-item {
        width: calc(100% / $i);
        height: calc($grid-size * 2);
      }
      .c-grid-item-icon {
        margin-right: 0.05rem;
      }
    }
  }

  .c-grid-item-active {
    background: $c-primary;
    color: #fff;
  }

</style>