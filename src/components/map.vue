<template>
  <div id="map" ref="map" class="map"></div>
</template>

<script>
// import map from '@/map'
export default {
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const geoJson = this.getData();
      console.log(geoJson);
      this.$echarts.registerMap("zj", geoJson);
      this.setOption();
    },
    setOption() {
      const map = this.$echarts.init(this.$refs.map);
      const option = {
        //数据映射
        visualMap: {
          type: "piecewise", //分段标签
          min: 0, //最小值
          max: 50, //最大值，不设置为无限大
          right: 30, //距离右侧位置
          bottom: 30, //距离底部位置
          orient: "vertical", //组件竖直放置
          align: "left", //色块在左
          textGap: 14, //文字主体之间的距离
          itemSymbol: "circle", //右下角映射组件使用圆点形状
          show: true,
          seriesIndex: 0, //指定取哪个系列的数据(series.data)，若不设置则会影响图上标点颜色设置。

          //一以下是分段式视觉映射组件的每一段的范围
          //gt：大于、gte：大于等于、lt：小于、lte：小于等于。
          pieces: [
            {
              gt: 5,
              label: "5个以上",
              color: "#1492FF",
            },
            {
              gte: 2,
              lte: 5,
              label: "2-5个",
              color: "#59AAF5",
            },
            {
              gte: 0,
              lt: 2,
              label: "0-2个",
              color: "#99CBF9",
            },
          ],
          /*
          pieces或者inRange内设置颜色试验时都能生效，个人认为需要传入组件控制颜色时
          再选择用inRange，两个都存在并给予不同的颜色，显示以pieces为主。
          */
          //inRange: {
          //    color: ["#99CBF9", "#59AAF5", "#1492FF"],
          //},
        },
        geo: {
          map: "zj", //上面引入的数据名
          show: true,
          roam: false, //关闭拖拽
          label: {
            //地图显示的地点名
            show: true,
            color: "#fff",
            fontSize: 6,
          },
          itemStyle: {
            areaColor: "#99CBF9", //地图区域的颜色(没有数据时会按照这个颜色显示)
            borderColor: "#fff", //地图区域的边框
            borderWidth: 0.6,
          },
          emphasis: {
            //高亮的显示设置
            label: {
              color: "#000",
            },
            itemStyle: {
              areaColor: "#9DE3FF",
            },
          },
          select: {
            //选中显示设置
            label: {
              color: "#fff",
            },
            itemStyle: {
              areaColor: "#9DE3FF",
            },
          },
        },
        series: [
          //配置数据的显示
          {
            type: "map", //类型map
            geoIndex: 0, //指定geo属性后，series-map.map 属性，以及 series-map.itemStyle 等样式配置不再起作用，而是采用 geo 中的相应属性。
            data: [
              { name: "杭州市", value: 100 },
              { name: "湖州市", value: 0 },
              { name: "嘉兴市", value: 0 },
              { name: "金华市", value: 0 },
              { name: "丽水市", value: 0 },
              { name: "宁波市", value: 0 },
              { name: "衢州市", value: 0 },
              { name: "绍兴市", value: 0 },
              { name: "台州市", value: 0 },
              { name: "温州市", value: 0 },
              { name: "舟山市", value: 0 },
            ],
          },
          //以下配置了图中白色标记圆点的显示
          // {
          //   type: "scatter", //类型：散点
          //   coordinateSystem: "geo", //使用地理坐标系
          //   itemStyle: {
          //     color: {
          //       type: "radial", // 径向渐变，前三个参数分别是圆心 x, y 和半径
          //       x: 0.5,
          //       y: 0.5,
          //       r: 0.5,
          //       colorStops: [
          //         {
          //           offset: 0.5,
          //           color: "#fff", // 50% 处的颜色
          //         },
          //         {
          //           offset: 1,
          //           color: "rgb(0 0 0 / 0%)", // 100% 处的颜色
          //         },
          //       ],
          //       global: false, // 缺省为 false
          //     },
          //     borderColor: "#fff", //边框白色
          //     borderWidth: 1, //边框宽度
          //   },
          //   symbolSize: 10, //散点大小
          //   data: [
          //     { name: "杭州市", value: [119.5035076, 29.703459] },
          //     { name: "宁波市", value: [121.579792, 29.468388] },
          //     { name: "温州市", value: [120.452111, 27.700575] },
          //     { name: "嘉兴市", value: [120.770865, 30.500653] },
          //     { name: "湖州市", value: [119.882398, 30.607198] },
          //     { name: "绍兴市", value: [120.582112, 29.597117] },
          //     { name: "金华市", value: [120.009506, 28.950024] },
          //     { name: "衢州市", value: [118.67263, 28.681708] },
          //     { name: "舟山市", value: [122.106863, 30.016028] },
          //     { name: "台州市", value: [121.128599, 28.561378] },
          //     { name: "丽水市", value: [119.571786, 28.001993] },
          //   ],
          //   zlevel: 1,
          // },
        ],
      };

      map.setOption(option);
    },

    getData() {
      const moduleFiles = require.context("../map", true, /json$/);
      const modules = moduleFiles.keys().reduce((module, moduleFile) => {
        // const moduleName = moduleFile.replace(/^\.\/(.*)\.\w+$/, "$1")
        // 执行modulesFiles函数，返回一个对象{default: {// 文件内容}, _esModule: true}
        const value = moduleFiles(moduleFile);
        return [...module, ...value.features];
      }, []);
      // console.log(modules);
      const obj = { features: modules, type: "FeatureCollection" };
      return obj;
    },
  },
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 800px;
}
</style>