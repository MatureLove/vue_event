<template>
   <div class="container-fluid">
      <div class="column_pannel" ref="column_show"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'Footer',
  mounted () {
    this.columnChartFn()
  },
  methods: {
    // 设置底部柱状图
    columnChartFn () {
      const oColumn = echarts.init(this.$refs.column_show)
      const oColumnopt = {
        title: { // 标题
          text: '文章访问量', // 标题
          left: 'center', // 居中
          top: '10' // 距离顶部10px
        },
        tooltip: {
          trigger: 'axis' // 在坐标轴上才会触发提示
        },
        legend: { // 图例组件(每种颜色的意思)
          data: ['奇趣事', '会生活', '爱旅行', '趣美味'],
          top: '40' // 距离顶部40px
        },
        toolbox: { // 工具栏
          show: true, // 是否显示
          feature: { // 个工具配置项
            mark: { show: true }, // 辅助线开关
            dataView: { show: true, readOnly: false }, // 数据视图工具，可以展现当前图标所用的数据，编辑后可以动态更新
            magicType: { show: true, type: ['line', 'bar'] }, // 动态切换类型
            restore: { show: true }, // 配置项还原
            saveAsImage: { show: true }// 点击保存下载图片
          }
        },
        xAxis: [ // x轴
          {
            type: 'category', // 类型
            data: ['1月', '2月', '3月', '4月', '5月'] // x轴内容
          }
        ],
        yAxis: [ // y轴
          {
            name: '访问量', // 名字
            type: 'value'
          }
        ],
        series: [
          {
            name: '奇趣事',
            type: 'bar',
            barWidth: 20, // 柱条的宽度，不设时自适应。
            areaStyle: { type: 'default' }, // 区域填充样式
            itemStyle: { // 柱条的颜色
              color: '#fd956a'
            },
            data: [800, 708, 920, 1090, 1200] // 数据
          },
          {
            name: '会生活',
            type: 'bar',
            barWidth: 20,
            areaStyle: { type: 'default' },
            itemStyle: {
              color: '#2bb6db'
            },
            data: [400, 468, 520, 690, 800]
          },
          {
            name: '爱旅行',
            type: 'bar',
            barWidth: 20,
            areaStyle: { type: 'default' },
            itemStyle: {
              color: '#13cfd5'
            },
            data: [500, 668, 520, 790, 900]
          },
          {
            name: '趣美味',
            type: 'bar',
            barWidth: 20,
            areaStyle: { type: 'default' },
            itemStyle: {
              color: '#00ce68'
            },
            data: [600, 508, 720, 890, 1000]
          }
        ],
        grid: { // 直角坐标系内绘图网格
          show: true,
          x: 50, // grid 组件离容器偏移量, 左侧
          x2: 30, // 右侧
          y: 80, // 上
          height: 260// 高度
        },
        dataZoom: [ // 给x轴设置滚动条
          {
            start: 0, // 默认为0 ,起始位置
            end: 100 - 1000 / 31, // 默认为100 ，进度条结束位置
            type: 'slider',
            show: true, // 是否显示 组件。如果设置为 false，不会显示，但是数据过滤的功能还存在。
            xAxisIndex: [0], // 控制第一个x轴
            handleSize: 0, // 滑动条的 左右2个滑动条的大小
            height: 8, // 组件高度
            left: 45, // 左边的距离
            right: 50, // 右边的距离
            bottom: 26, // 右边的距离
            handleColor: '#ddd', // h滑动图标的颜色
            handleStyle: { // 两侧滑动条的样式配置
              borderColor: '#cacaca', // 颜色
              borderWidth: '1', // 宽
              shadowBlur: 2, // 阴影
              background: '#ddd', //
              shadowColor: '#ddd' // 阴影颜色
            }
          }
        ]
      }
      oColumn.setOption(oColumnopt)
    }
  }
}
</script>

<style scoped>
.column_pannel {
  margin-bottom: 20px;
  height: 400px;
  border: 1px solid #e7e7e9;
  background-color: #fff !important;
}
</style>
