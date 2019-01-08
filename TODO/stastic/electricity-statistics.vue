<template>
  <div class="electricity-statistics">
    <header class="header">
      <v-panel>
        <div slot="body" style="padding: .1rem 0;">
           <div slot="body" class="c-panel-body u-without-padding">
            <v-modes
              v-model="activeId"
              :numberal="4"
              :items="btnList"
              @change="modeChange"
            ></v-modes>
          </div>
        </div>
      </v-panel>
    </header>
    <v-panel class="interval-box">
      <div slot="body" class="c-panel-body count row-1 u-cross-center">
        <div>用电量：</div>
        <div>{{sum}} {{unit}}</div>
      </div>
      <div slot="body" style="padding: 0 .1rem; height: 1.62rem">
          <Interval :unitType="unitType" :data="axis"></Interval>
      </div>
    </v-panel>
    <v-panel class="details">
      <div slot="body" class="title c-panel-body u-cross-center">
        <div>用电明细</div>
      </div>
      <div v-for="(item, index) in details"
      :key="index" slot="body"
      class="c-panel-body u-cross-center">
        <div>{{item.time}}</div>
        <div>{{item.desc === '没有数据' ? item.desc : `${item.desc} ${unit}`}}</div>
      </div>
    </v-panel>
  </div>
</template>

<script>

import dayjs from 'dayjs';
import Interval from './interval';
import utils from './utils';


export default {
  data() {
    return {
      axis: [],
      details: [],
      sum: '',
      unit: '',
      unitType: '',
      btnList: [
        {
          id: 1,
          type: 'day',
          text: '日',
        },
        {
          id: 2,
          type: 'week',
          text: '周',
        },
        {
          id: 3,
          type: 'month',
          text: '月',
        },
        {
          id: 4,
          type: 'year',
          text: '年',
        },
      ],
      activeId: 1,
      prevId: 1,
    };
  },
  name: 'electricityStatistics',
  components: {
    Interval,
  },
  methods: {
    modeChange(id, current) {
      // console.log(e, val);
      this.$loading.show();
      this.getElectricityStatistics(current).then((res) => {
        this.prevId = id;
        this.syncData(res.result.power_sum);
        this.$loading.hide();
      }).catch(() => {
        this.$loading.hide();
        this.$toast.show('服务器异常，请稍后重试。');
        console.log(this.prevId);
        this.$nextTick(() => {
          this.activeId = this.prevId;
        });
      });
    },
    syncData(powerSum) {
      const obj = utils.convertToCoordinate(powerSum);
      const keys = Object.keys(obj);
      keys.forEach((key) => {
        this[key] = obj[key];
      });
    },
    getElectricityStatistics(obj) {
      const { feedId, productId } = this;
      console.log(feedId, productId, 'ele');
      if (!feedId || !productId) {
        console.log('没有feedid和productid');
        return Promise.reject();
      }

      const params = {
        feed_id: feedId,
        product_id: productId,
        date: dayjs().format('YYYY-MM-DD'),
        type: obj.type,
      };
      return new Promise((resolve, reject) => {
        window.JDSMART.util.post('service/getStatisticsData', params, (res) => {
          if (!res.status) {
            resolve(res);
            return;
          }
          reject(res);
        });
      }).catch((e) => {
        this.$toast.show(e.error.errorInfo);
      });
    },
    getDeviceInfo() {
      this.feedId = this.$route.query.feed_id;
      this.productId = this.$route.query.product_id;
      this.deviceName = this.$route.query.device_name;
    },
    initBar() {
      window.SmartSDK.titleBar('one', 'drawable_back', 'drawable_setting', 'goHome', 'setting', this.deviceName);
      window.goHome = () => {
        console.log(1111111);
        this.$router.push({ path: '/', query: { bridge_ready: true } });
      };
    },
  },
  mounted() {
    try {
      this.initBar();
      this.getDeviceInfo();
      this.getElectricityStatistics({ type: 'day' }).then((res) => {
        this.syncData(res.result.power_sum);
      }).catch((e) => {
        this.$toast.show(e.error.errorInfo);
      });
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>

@import './vue-stone-replace.css';

.electricity-statistics{
  background: #f2f2f2;
  height: 100%;
}
.data-select {
  justify-content: center;
}
.data-select .c-btn{
  padding: .1rem .26rem;
  background: #fff;
}
.header .c-panel {
  border: 0;
  background: transparent;
}
.interval-box{
  margin-top: 0;
}
.count {
  border-bottom: 1px solid #eaeaea;
}
.count div {
  color: #333;
}
.count div + div{
  color: #45A3F1;
}
.details {
  color: #333;
  margin-top: .05rem;
}
.details div.c-panel-body:nth-child(2n){
  background: #fafafa;
}
.c-mode-container{
  background: #fff;
  border: 1px solid #45a3f1;

  border-radius: .03rem;
  color: #45A3F1;
  overflow: hidden;
}
.title{
  height: .515rem;
  box-sizing: border-box;
}

</style>
