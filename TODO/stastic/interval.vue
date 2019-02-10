<template>
  <div>
    <canvas id="interval-chart"></canvas>
  </div>
</template>

<script>
import F2 from '@antv/f2/lib/index';

F2.track(false);

const intervalColor = {
  interval: '#999',
  activeInterval: '#45A3F1',
  tooltipLabel: '#fff',
  axisXLabel: '#333',
};

export default {
  name: 'interval',
  props: {
    unitType: '',
    data: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    data(val) {
      this.setChangeData(val);
    },
  },
  mounted() {
    const html = document.querySelector('html');
    const htmlFontSize = html.style.fontSize;
    const r = Number.parseInt(htmlFontSize, 10) / 100;

    this.chart = new F2.Chart({
      id: 'interval-chart',
      pixelRatio: window.devicePixelRatio,
      padding: [40 * r, 0, 20, 0],
      appendPadding: 0,
      width: window.innerWidth * 0.915,
      height: 136 * r,
    });
    const { chart, data } = this;
    chart.source(data, {
      time: {
        range: [0.02, 0.98],
        tickCount: 7,
      },
    });
    this.setLegend(false);
    this.setAxis();
    this.setTooltip(r);
    chart
      .interval()
      .position('time*value')
      .color(intervalColor.interval)
      .style({
        radius: 2,
      })
      .size(4);
    chart.render();
  },
  beforeDestroy() {
    this.chart.destroy();
  },
  methods: {
    setLegend(bool) {
      this.chart.legend(bool);
    },
    setAxis() {
      this.chart.axis('time', {
        line: null,
        labelOffset: 7,
        label() {
          const cfg = {
            textAlign: 'center',
            fill: intervalColor.axisXLabel,
            fontSize: 12,
          };
          return cfg;
        },
      });

      this.chart.axis('value', {
        position: 'right',
        label: null,
        grid: null,
      });
    },
    setTooltip(r) {
      const { getChartChlidrens, data, unitType } = this;
      this.chart.tooltip({
        showItemMarker: false,
        offsetY: -10 * r,
        onShow(ev) {
          const { items } = ev;
          items[0].name = null;
          items[0].name = `${items[0].title}${unitType}`;
          items[0].value = `${items[0].value}`;
        },

        onChange(ev) {
          const item = ev.items[0];
          const toolTipndex = data.indexOf(item.origin);
          const childrens = getChartChlidrens();
          childrens.forEach((child, index) => {
            const { _attrs } = child;
            if (toolTipndex === index) {
              _attrs.attrs.fillStyle = intervalColor.activeInterval;
            } else {
              _attrs.attrs.fillStyle = intervalColor.interval;
            }
          });
        },
        onHide() {
          const childrens = getChartChlidrens();
          childrens.forEach((child) => {
            const { _attrs } = child;
            _attrs.attrs.fillStyle = intervalColor.interval;
          });
        },
        background: {
          radius: 2,
          fill: intervalColor.activeInterval,
          padding: [4, 6],
        },
        nameStyle: {
          fontSize: 10,
          fill: intervalColor.tooltipLabel,
          textAlign: 'start',
          textBaseline: 'middle',
        },
        valueStyle: {
          fontSize: 10,
          fill: intervalColor.tooltipLabel,
          textAlign: 'start',
          textBaseline: 'middle',
        },
      });
    },
    getChartChlidrens() {
      const geom = this.chart.get('geoms')[0];
      const container = geom.get('container');
      const childrens = container.get('children');
      return childrens;
    },
    setChangeData(data) {
      this.chart.changeData(data);
    },
  },
};
</script>
<style scoped>
.chart-tooltip {
  position: absolute;
  z-index: 99;
  font-size: 3.2vw;
  color: #ADC6FF;
  text-align: center;
  top: 28vw;
  left: 0;
  margin-top: 3px;
  visibility: hidden;
  transition: top 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}
</style>
