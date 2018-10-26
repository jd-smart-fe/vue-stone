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
        <v-input ref="input" v-model="message" placeholder="未输入时提示内容"></v-input>
      </div>
    </v-panel>
    <v-panel>
      <div slot="body" class="c-panel-body">
        <v-input :result="result" relation ref="input" v-model="message2" placeholder="带匹配的搜索"></v-input>
      </div>
    </v-panel>

    <v-panel>
      <div slot="header" class="c-panel-header">
        单选
      </div>
      <div slot="body">
        <v-checkboard v-model="value">
          <div slot="item" data-value="item1">
            item1
          </div>
          <div slot="item" data-value="item2">
            item2
          </div>
          <div slot="item" data-value="item3">
            item3
          </div>
          <div slot="item" data-value="item4">
            item4
          </div>
        </v-checkboard>
      </div>
    </v-panel>

    <v-panel>
      <div slot="header" class="c-panel-header">
        复选
      </div>
      <div slot="body">
        <v-checkboard v-model="multipleValue" :multi="true">
          <div slot="item" data-value="item1">
            item1
          </div>
          <div slot="item" data-value="item2">
            item2
          </div>
          <div slot="item" data-value="item3">
            item3
          </div>
          <div slot="item" data-value="item4">
            item4
          </div>
        </v-checkboard>
      </div>
    </v-panel>

  </div>
</template>

<script>

  export default {
    name: 'Form',

    data() {
      return {
        message: '',
        message2: '',
        value: 'item1',
        multipleValue: ['item1', 'item2'],
        result: [],
      };
    },

    mounted() {
    },
    methods: {
      getResult(val) {
        if (!val) return [];
        return [
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
        ].filter(value => new RegExp(val, 'i').test(value));
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
