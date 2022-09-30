<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
import resize from './mixins/resize'
export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      handler(val) {
        this.setOptions(val)
      },
      deep: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) return
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el)
      this.setOptions(this.chartData)
    },
    setOptions({ x = [], value = [] }) {
      const option = {
        grid: {
          left: '1%',
          right: '1%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: x
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: value,
            type: 'line',
            // 平滑过渡的线条
            symbol: 'circle',
            areaStyle: {},
            smooth: true
          }
        ]
      }
      this.chart.setOption(option)
      this.chart.resize()
    }
  }
}
</script>
