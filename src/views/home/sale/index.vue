<template>
  <div class="container-fluid">
    <el-row class="curve-pie" :gutter="10">
      <el-col :sm="16" :xs="16">
        <div class="gragh_pannel" ref="curve_show"></div>
      </el-col>
      <el-col :sm="8" :xs="8">
        <div class="gragh_pannel" ref="pie_show"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'Sale',
  mounted () {
    this.setCurveChartFn()
    this.picChartFn()
  },
  methods: {
    // 设置面积图
    setCurveChartFn () {
      // 基于准备好的dom，初始化echarts实例
      const curveChart = echarts.init(this.$refs.curve_show)
      // 绘制面积图表
      // 数据源(模拟后台返回的数据)
      const aListAll = [
        { count: 36, date: '2019-04-13' },
        { count: 52, date: '2019-04-14' },
        { count: 78, date: '2019-04-15' },
        { count: 85, date: '2019-04-16' },
        { count: 65, date: '2019-04-17' },
        { count: 72, date: '2019-04-18' },
        { count: 88, date: '2019-04-19' },
        { count: 64, date: '2019-04-20' },
        { count: 72, date: '2019-04-21' },
        { count: 90, date: '2019-04-22' },
        { count: 96, date: '2019-04-23' },
        { count: 100, date: '2019-04-24' },
        { count: 102, date: '2019-04-25' },
        { count: 110, date: '2019-04-26' },
        { count: 123, date: '2019-04-27' },
        { count: 100, date: '2019-04-28' },
        { count: 132, date: '2019-04-29' },
        { count: 146, date: '2019-04-30' },
        { count: 200, date: '2019-05-01' },
        { count: 180, date: '2019-05-02' },
        { count: 163, date: '2019-05-03' },
        { count: 110, date: '2019-05-04' },
        { count: 80, date: '2019-05-05' },
        { count: 82, date: '2019-05-06' },
        { count: 70, date: '2019-05-07' },
        { count: 65, date: '2019-05-08' },
        { count: 54, date: '2019-05-09' },
        { count: 40, date: '2019-05-10' },
        { count: 45, date: '2019-05-11' },
        { count: 38, date: '2019-05-12' }
      ]

      // 但是图标要求直接给数字的值, 所以要把对象的值取出来形成2个只有值的数组
      const aCount = []
      const aDate = []

      for (let i = 0; i < aListAll.length; i++) {
        aCount.push(aListAll[i].count)
        aDate.push(aListAll[i].date)
      }

      // 面积图的echarts配置项(参考文档复制)
      const chartopt = {
        title: {
          text: '月新增文章数', // 标题
          left: 'center', // 位置居中
          top: '10' // 标题距离容器顶部px
        },
        tooltip: { // 提示框组件
          trigger: 'axis' // 坐标轴触发(鼠标放在坐标轴就能出提示框)
        },
        legend: { // 图例组件(每种颜色的意思)
          data: ['新增文章'], // 图例文字解释(要和series里name对应)
          top: '40' // 距离容器顶部px
        },
        toolbox: { // 工具栏
          show: true, // 要显示
          feature: { // 各工具配置项
            mark: { show: true }, // 辅助线开关
            dataView: { show: true, readOnly: false }, // 数据视图工具，可以展现当前图表所用的数据，编辑后可以动态更新。
            magicType: { show: true, type: ['line', 'bar'] }, // 动态类型切换
            restore: { show: true }, // 配置项还原
            saveAsImage: { show: true } // 点击保存下载图片
          }
        },
        xAxis: [ // 水平轴显示
          {
            name: '日',
            type: 'category',
            boundaryGap: false, // 坐标轴两边留白策略 (不留白)
            data: aDate // 水平轴上的数字数据 (时间)
          }
        ],
        yAxis: [ // 垂直轴显示
          {
            name: '月新增文章数',
            type: 'value' // 以series里的data值做划分段
          }
        ],
        series: [ // 系列(控制图表类型和数据)
          {
            name: '新增文章',
            type: 'line', // 折线图
            smooth: true, // 是否平滑视觉引导线，默认不平滑，可以设置成 true 平滑显示
            areaStyle: { type: 'default' }, // 区域填充样式。设置后显示成区域面积图。
            itemStyle: { color: '#f80', lineStyle: { color: '#f80' } }, // 折线拐点标志的样式。
            data: aCount // 真正数据源(用下标和x轴数组对应)
          }
        ],
        grid: { // 直角坐标系内绘图网格
          show: true,
          x: 50, // grid 组件离容器偏移量, 左侧
          x2: 50, // 右侧
          y: 80, // 上
          height: 220 // 高度
        }
      }

      curveChart.setOption(chartopt)
    },
    // 设置饼状图
    picChartFn () {
      const oPie = echarts.init(this.$refs.pie_show)
      const oPieopt = {
        title: {
          top: 10, // 标题距离容器顶部px
          text: '分类文章数量比', // 标题
          x: 'center' // 居中
        },
        tooltip: { // 提示框组件
          trigger: 'item', // 在图形上才会触发提示
          formatter: '{a} <br/>{b} : {c} ({d}%)' // 提示的文字显示的格式
          // a: 系列名
          // b: 数据名
          // c: 数值
          // d: 百分比 (只有饼状图生效)
        },
        color: ['#5885e8', '#13cfd5', '#00ce68', '#ff9565'], // 系列颜色
        legend: { // 图例组件
          x: 'center',
          top: 65,
          data: ['奇趣事', '会生活', '爱旅行', '趣美味'] // 每个部分对应的数据名(要和series里name对应)
        },
        toolbox: { // 工具箱
          show: true, // 要显示
          x: 'center', // 居中g
          top: 35, // 距离顶部35px
          feature: { // 各工具配置项
            mark: { show: true }, // 辅助线开关
            dataView: { show: true, readOnly: false }, // 数据视图工具，可以展现当前图表所用的数据，编辑后可以动态更新。
            magicType: { // 动态类型切换
              show: true,
              type: ['pie', 'funnel'],
              option: {
                funnel: {
                  x: '25%',
                  width: '50%',
                  funnelAlign: 'left',
                  max: 1548
                }
              }
            },
            restore: { show: true }, // 配置项还原，是否显示该工具
            saveAsImage: { show: true }// 保存为图片
          }
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['45%', '60%'], // 数组的第一项是内半径，第二项是外半径。每一项遵从上述 number string 的描述。
            // 可以将内半径设大显示成圆环图（Donut chart）。
            center: ['50%', '65%'], // ，设置成百分比时第一项是相对于容器宽度，第二项是相对于容器高度。
            data: [
              { value: 300, name: '奇趣事' },
              { value: 100, name: '会生活' },
              { value: 260, name: '爱旅行' },
              { value: 180, name: '趣美味' }
            ]
          }
        ]
      }
      oPie.setOption(oPieopt)
    }
  }
}

</script>

<style scoped>
.gragh_pannel {
  height: 350px;
  border: 1px solid #e7e7e9;
  background-color: #fff !important;
  margin-bottom: 20px;
}
</style>
