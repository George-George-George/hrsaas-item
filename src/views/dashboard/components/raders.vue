<template>
  <div class="radar-contanier" ref="radar"></div>
</template>
<script>
import * as echarts from 'echarts'

export default {
  name: 'raders',
  data() {
    return {}
  },
  components: {},
  computed: {},
  created() {},
  mounted() {
    this.radar()
  },
  methods: {
    radar() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(this.$refs.radar)
      const lineStyle = {
        width: 1,
        opacity: 0.5
      } // 绘制图表
      myChart.setOption({
        backgroundColor: 'black',
        title: {
          text: '基础雷达图'
        },
        tooltip: {},
        legend: {
          data: ['张三', '李四']
        },
        legend: {
          bottom: 5,
          data: ['张三', '李四'],
          itemGap: 20,
          textStyle: {
            color: 'red',
            fontSize: 18
          },
          selectedMode: 'single'
        },
        radar: {
          // shape: 'circle',

          name: {
            textStyle: {
              color: '#fff',
              backgroundColor: '#999',
              borderRadius: 3,
              padding: [3, 5]
            }
          }, // 每个区域的最高值
          indicator: [
            { name: '工作效率', max: 100 },
            { name: '考勤', max: 100 },
            { name: '积极性', max: 100 },
            { name: '帮助同事', max: 100 },
            { name: '自主学习', max: 100 },
            { name: '正确率', max: 100 }
          ],
          splitLine: {
            lineStyle: {
              color: [
                'rgba(238, 197, 102, 0.1)',
                'rgba(238, 197, 102, 0.2)'
              ].reverse()
            }
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(238, 197, 102, 0.5)'
            }
          }
        },
        series: [
          {
            name: '预算 vs 开销（Budget vs spending）',
            type: 'radar', // areaStyle: {normal: {}},
            data: [
              {
                value: [10, 1, 100, 5, 100, 0],
                name: '张三'
              },
              {
                value: [50, 50, 50, 50, 50, 10],
                name: '李四'
              }
            ]
          }
        ]
      })
    }
  },
  watch: {}
}
</script>
<style lang="scss" scoped>
.radar-contanier {
  width: 700px;
  height: 500px;
}
</style>
