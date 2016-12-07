<template>

  <div :class="['c-grid']" >

    <div v-for="(item, index) in items"
      :class="['c-grid-item', colCls, rowCls, 
        selected_id == item.id ? 'c-grid-item-active' : '']"
      @click="handle(item)"
     >
       {{item.text}}
     </div>
  </div>
</template>

<script>

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

    computed: {

      colCls() {
        return `col-${12 / this.number_per_line}`;
      },

      rowCls() {
        let ret;
        if (this.number_per_line === 2 || this.number_per_line === 3) {
          ret = 'row-2';
        } else {
          ret = 'row-3';
        }
        return ret;
      },
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
    flex-direction: row;
    flex-wrap: wrap;
    /*align-items: center;*/
    /*justify-content: space-between;*/
  }

  .c-grid-item {
    display: flex;
    align-items: center;
    justify-content: center;
    @mixin transition background-color;
  }
  .c-grid-item-active {
    background: $c-primary;
    color: #fff;
  }

</style>