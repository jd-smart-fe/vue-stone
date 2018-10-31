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
      <div slot="body" class="c-panel-body">
        <v-search ref="input" v-model="message" placeholder="未输入搜索内容" @keyup.enter.native="submitHandler"></v-search>
      </div>
    </v-panel>
    <v-panel>
      <div slot="body" class="c-panel-body">
        <v-search :result="result" relation ref="search" v-model="message2" top="0.4rem" placeholder="带匹配的搜索" :itemClick="clickHandler"></v-search>
      </div>
    </v-panel>
  </div>
</template>
<script>
  export default {
    name: 'Search',
    data() {
      return {
        message: '',
        message2: '',
        value: 'item1',
        multipleValue: ['item1', 'item2'],
        sourceResult: [
          'Apple',
          'Banana',
          'Orange',
          'Durian',
          'Lemon',
          'Peach',
          'Cherry',
          'Berry',
          'Core',
          'Fig',
          'Haw',
          'Melon',
          'Plum',
          'Pear',
          'Peanut',
          'Other',
          '中国',
          {
            label: 'aa',
            id: 11,
          },
          {
            label: 'bb',
            id: 22,
          },
        ],
        result: [],
      };
    },

    mounted() {
    },
    methods: {
      getResult(val) {
        if (!val) return [];
        return this.sourceResult.filter((item) => {
          let str = '';
          if (typeof item === 'object') {
            str = item.label;
          }
          if (typeof item === 'string') {
            str = item;
          }
          return new RegExp(val, 'i').test(str);
        });
      },
      clickHandler(item) {
        console.log(`选择了：${item}`);
      },
      submitHandler() {
        console.log(`搜索：${this.message}`);
      },
    },
    watch: {
      message2(val) {
        this.result = this.getResult(val);
      },
    },
  };
</script>

<style>


</style>
