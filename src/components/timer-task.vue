<template lang="html">
  <div class="">

    <!-- 开关 -->
    <v-panel v-if="options[0].name === 'onOff'">
      <div slot="header" class="c-panel-header row-1 u-cross-center">{{ options[0].title || ''}}</div>
      <div slot="body" class="c-panel-body u-without-padding">
        <v-modes v-model="options[0].value"
          ref="onOff"
          :numberal="2"
          :items="switchData"
        ></v-modes>
      </div>
    </v-panel>

    <!-- 任务列表 -->
    <div v-show="_showTask" class="c-task-setting">
      <!-- 循环输出组件 -->
      <template v-for="item in componentsList">
        <!-- 加载组件 优雅方法 但需统一参数入口-->
        <!-- <v-panel>
          <div slot="header" class="c-panel-header row-1 u-cross-center">{{ item.title }}</div>
          <div slot="body" class="c-panel-body row-3 u-cross-center">
            <component :is="`v-${item.name}`" v-model="item.value" :items="item.items"></component>
          </div>
        </v-panel> -->

        <!-- 加载组件 不优雅方法 -->
        <!-- modes -->
        <v-panel v-if="item.name === 'modes'">
          <div slot="header" class="c-panel-header row-1 u-cross-center">{{ item.title }}</div>
          <div slot="body" class="c-panel-body u-without-padding">
            <component
            ref="tasks"
            is="v-modes"
            v-model="item.value"
            more="更多设置"
            :numberal="item.items.length > 4 ? 4 : item.items.length"
            :items="item.items"
            >
            </component>
          </div>
        </v-panel>

        <!-- step range -->
        <v-panel v-if="item.name === 'range'">
          <div slot="header" class="c-panel-header row-1 u-cross-center">{{ item.title }}</div>
          <div slot="body" class="c-panel-body row-3 u-cross-center">
            <component
            ref="tasks"
            is="v-range"
            :value="item.value"
            :min="item.min"
            :max="item.max"
            :show_tip="item.show_tip"
            :is_step="item.is_step"
            :dots="item.dots"
            :tooltip="item.tooltip"
            >
            </component>
          </div>
        </v-panel>

        <!-- counter  -->
        <v-panel v-if="item.name === 'counter'">
          <div slot="body" class="c-panel-body row-3 u-cross-center">
            <div>
              <div>{{ item.title }}</div>
              <div>{{ item.value }}</div>
            </div>
            <component
            ref="tasks"
            is="v-counter"
            v-model="item.value"
            :max="item.max"
            :min="item.min"
            :step="item.step"
            :longTap="item.longTap"
            >
            </component>
          </div>
        </v-panel>


      </template>
      <!-- 循环输出结束 -->



      <!-- 自定义内容 -->
      <slot @change=""></slot>
    </div>

  </div>
</template>

<script>
// let vm;

export default {
  name: 'v-timer-task',

  data() {
    return {
      componentsList: [], // created内初始化，用于渲染组件

      values: [],

      range_no_step: [], // 记录rang组件下属性为is_step的组件的索引值。

      switchStatus: 0,
      switchData: [{  // 开关默认参数
        text: '定时关闭',
        id: 0,
      }, {
        text: '定时开启',
        id: 1,
      }],
    };
  },

  props: {
    options: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
  },

  computed: {
    _showTask() {
      if (this.options[0].name === 'onOff' && this.options[0].value === 0) {
        return false;
      }
      return true;
    },
  },

  created() {
    // 初始化componentsList, 该值用于渲染组件
    this.componentsList = this.options.map(val => {
      const newval = val;
      newval.name = `${val.name}`;
      return newval;
    });

    // 若数组第一个值的name为onOff，则删除第一个元素。
    if (this.componentsList[0].name === 'onOff') {
      this.componentsList.shift();
    }

    // 初始化values.
    this.values = this.options.map((val, index) => {
      const obj = {
        name: val.name,
        title: val.title,
        text: '',
        value: '',
      };

      // 初始化onOff的值
      if (val.name === 'onOff' && index === 0) {
        obj.value = this.options[0].value === 1;
        obj.text = obj.value ? '定时开启' : '定时关闭';
      }

      // 初始化modes的值
      if (val.name === 'modes') {

        this.resolveModes(obj, index);
      }

      // 初始化range的值
      if (val.name === 'range') {

        this.resolveRange(obj, this.options[index].value, index);
      }

      // 初始化counter的值
      if (val.name === 'counter') {
        this.resolveCounter(obj, index);
      }

      return obj;
    });

    this.$emit('change', this.getvalues());
  },

  mounted() {
    // 开关
    this.$refs.onOff.$on('change', val => {
      if (this.values[0].name === 'onOff') {
        this.values[0].value = val === 1;
        this.$emit('change', this.getvalues());
      }
    });

    // 由于tasks数组中缺少onOff实例，所以在onOff存在的情况下, tasks数组的index需要加上1才能与values数组相对应起来
    let hasOnOff = 0;
    if (this.values[0].name === 'onOff') {
      hasOnOff = 1;
    }

    // 任务组件们
    this.$refs.tasks.forEach((val, index) => {
      // curIndex 与 values 的索引值相对应
      const curIndex = index + hasOnOff;

      // modes
      if (this.values[curIndex].name === 'modes') {
        val.$on('change', () => {

          this.resolveModes(this.values[curIndex], curIndex);
          this.$emit('change', this.getvalues());
        });
      }

      // range
      if (this.values[curIndex].name === 'range') {
        val.$on('change', v => {

          this.resolveRange(this.values[curIndex], v, curIndex);
          this.$emit('change', this.getvalues());
        });
      }

      // counter
      if (this.values[curIndex].name === 'counter') {
        val.$on('change', () => {

          this.resolveCounter(this.values, curIndex);
          this.$emit('change', this.getvalues());
        });
      }
    });
  },

  methods: {
    getvalues() {
      return this.values;
    },

    resolveModes(val, index) {
      const selected = this.options[index].items.find(v => v.id === this.options[index].value);

      val.value = selected.id;
      val.text = selected.text;
    },

    resolveRange(val, newval, index) {
      // is_step === true
      if (this.options[index].is_step) {
        val.value = newval;
        val.text = newval.text;

      // is_step === false
      } else {
        // 在tooltip值中分析出数据单位
        const unit = this.options[index].tooltip().replace(/undefined/, '');
        val.value = newval;
        val.text = val.value + unit;
      }
    },

    resolveCounter(val, index) {
      val.value = this.options[index].value;
      val.text = `${val.value}次`;
    },
  },
};

</script>

<style lang="css">
  .c-task-setting{
    margin-top: 10px;
  }
</style>
