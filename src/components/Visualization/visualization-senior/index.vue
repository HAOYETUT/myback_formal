<template>
    <div class="body">
        <header>
            <h1>可视化展板-ECharts</h1>
            <div class="showTime">当前时间：{{currentTime}}</div>
            </header>
            <section class="mainbox">
            <div class="column">
                <div class="panel bar">
                    <h2>
                        柱状图-就业行业 <a href="javascript:;">2019</a>
                        <a href="javacript:;"> 2020</a>
                    </h2>
                    <div class="chart"></div>
                    <div class="panel-footer"></div>
                </div>
                <div class="panel line">
                    <h2>折线图-人员变化</h2>
                    <div class="chart"></div>
                    <div class="panel-footer"></div>
                </div>
                <div class="panel pie">
                    <h2>饼形图-年龄分布</h2>
                    <div class="chart"></div>
                    <div class="panel-footer"></div>
                </div>
            </div>
            <div class="column">
                <div class="no">
                    <div class="no-hd">
                        <ul>
                            <li>{{musicNum}}</li>
                            <li>{{mvNum}}</li>
                        </ul>
                    </div>
                    <div class="no-bd">
                        <ul>
                            <li>音乐需求人数</li>
                            <li>视频供应人数</li>
                        </ul>
                    </div>
                </div>
                <div class="map" ref="map">
                    <div class="chart"></div>
                    <div class="map1"></div>
                    <div class="map2"></div>
                    <div class="map3"></div>
                </div>
            </div>
            <div class="column">
                <div class="panel bar1">
                        <h2>柱状图-技能掌握</h2>
                        <div class="chart"></div>
                        <div class="panel-footer"></div>
                </div>
                <div class="panel line1">
                    <h2>折线图-播放量</h2>
                    <div class="chart" ref="chart"></div>
                    <div class="panel-footer"></div>
                </div>
                <div class="panel pie1">
                    <h2>饼形图-地区分布</h2>
                    <div class="chart" ref="chart"></div>
                    <div class="panel-footer"></div>
                </div>
            </div>
            </section>
    </div>
</template>
  
  <script>
  // import { getListCar } from '@/api/car'
  
  export default {
    props:{},
    name: 'VisualizationSenior',
    data() {
      return {
        timer: undefined,
        currentTime: new Date(),
        musicNum: 164563,
        mvNum: 5320,
        timerMusic: undefined,
      }
    },
    async mounted() {
      // 主页测试调用
      // await getListCar({ page: 1, limit: 1 })
      this.getEcharts()
      this.getChart()
      this.getZheChart()
      this.getBingChart()
      this.getJinChart()
      this.getPinChart()
      this.getFenChart()
      this.timer = setInterval(() => {
            this.currentTime = new Date().toLocaleString();
            
        });
    this.timerMusic = setInterval(() => {
        this.musicNum+= 12;
        this.mvNum++
    },3000);
    },
    methods: {
        getFenChart() {
            var myChart = this.$echarts.init(document.querySelector(".pie1  .chart"));
            const option = {
                legend: {
                top: "90%",
                itemWidth: 10,
                itemHeight: 10,
                textStyle: {
                    color: "rgba(255,255,255,.5)",
                    fontSize: "12"
                }
                },
                tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                // 注意颜色写的位置
                color: [
                "#006cff",
                "#60cda0",
                "#ed8884",
                "#ff9f7f",
                "#0096ff",
                "#9fe6b8",
                "#32c5e9",
                "#1d9dff"
                ],
                series: [
                {
                    name: "点位统计",
                    type: "pie",
                    // 如果radius是百分比则必须加引号
                    radius: ["10%", "70%"],
                    center: ["50%", "42%"],
                    roseType: "radius",
                    data: [
                    { value: 20, name: "云南" },
                    { value: 26, name: "北京" },
                    { value: 24, name: "山东" },
                    { value: 25, name: "河北" },
                    { value: 20, name: "江苏" },
                    { value: 25, name: "浙江" },
                    { value: 30, name: "深圳" },
                    { value: 42, name: "广东" }
                    ],
                    // 修饰饼形图文字相关的样式 label对象
                    label: {
                    fontSize: 10
                    },
                    // 修饰引导线样式
                    labelLine: {
                    // 连接到图形的线长度
                    length: 10,
                    // 连接到文字的线长度
                    length2: 10
                    }
                }
                ]
            };

            // 3. 配置项和数据给我们的实例化对象
            myChart.setOption(option);
            // 4. 当我们浏览器缩放的时候，图表也等比例缩放
            window.addEventListener("resize", function() {
                // 让我们的图表调用 resize这个方法
                myChart.resize();
            });
        },
        getPinChart() {
            var myChart = this.$echarts.init(document.querySelector(".line1 .chart"));
            const option = {
                tooltip: {
                trigger: "axis",
                axisPointer: {
                    lineStyle: {
                    color: "#dddc6b"
                    }
                }
                },
                legend: {
                top: "0%",
                textStyle: {
                    color: "rgba(255,255,255,.5)",
                    fontSize: "12"
                }
                },
                grid: {
                left: "10",
                top: "30",
                right: "10",
                bottom: "10",
                containLabel: true
                },

                xAxis: [
                {
                    type: "category",
                    boundaryGap: false,
                    axisLabel: {
                    textStyle: {
                        color: "rgba(255,255,255,.6)",
                        fontSize: 12
                    }
                    },
                    axisLine: {
                    lineStyle: {
                        color: "rgba(255,255,255,.2)"
                    }
                    },

                    data: [
                    "01",
                    "02",
                    "03",
                    "04",
                    "05",
                    "06",
                    "07",
                    "08",
                    "09",
                    "11",
                    "12",
                    "13",
                    "14",
                    "15",
                    "16",
                    "17",
                    "18",
                    "19",
                    "20",
                    "21",
                    "22",
                    "23",
                    "24",
                    "25",
                    "26",
                    "27",
                    "28",
                    "29",
                    "30"
                    ]
                },
                {
                    axisPointer: { show: false },
                    axisLine: { show: false },
                    position: "bottom",
                    offset: 20
                }
                ],

                yAxis: [
                {
                    type: "value",
                    axisTick: { show: false },
                    axisLine: {
                    lineStyle: {
                        color: "rgba(255,255,255,.1)"
                    }
                    },
                    axisLabel: {
                    textStyle: {
                        color: "rgba(255,255,255,.6)",
                        fontSize: 12
                    }
                    },

                    splitLine: {
                    lineStyle: {
                        color: "rgba(255,255,255,.1)"
                    }
                    }
                }
                ],
                series: [
                {
                    name: "播放量",
                    type: "line",
                    smooth: true,
                    symbol: "circle",
                    symbolSize: 5,
                    showSymbol: false,
                    lineStyle: {
                    normal: {
                        color: "#0184d5",
                        width: 2
                    }
                    },
                    areaStyle: {
                    normal: {
                        color: new this.$echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                            {
                            offset: 0,
                            color: "rgba(1, 132, 213, 0.4)"
                            },
                            {
                            offset: 0.8,
                            color: "rgba(1, 132, 213, 0.1)"
                            }
                        ],
                        false
                        ),
                        shadowColor: "rgba(0, 0, 0, 0.1)"
                    }
                    },
                    itemStyle: {
                    normal: {
                        color: "#0184d5",
                        borderColor: "rgba(221, 220, 107, .1)",
                        borderWidth: 12
                    }
                    },
                    data: [
                    30,
                    40,
                    30,
                    40,
                    30,
                    40,
                    30,
                    60,
                    20,
                    40,
                    20,
                    40,
                    30,
                    40,
                    30,
                    40,
                    30,
                    40,
                    30,
                    60,
                    20,
                    40,
                    20,
                    40,
                    30,
                    60,
                    20,
                    40,
                    20,
                    40
                    ]
                },
                {
                    name: "转发量",
                    type: "line",
                    smooth: true,
                    symbol: "circle",
                    symbolSize: 5,
                    showSymbol: false,
                    lineStyle: {
                    normal: {
                        color: "#00d887",
                        width: 2
                    }
                    },
                    areaStyle: {
                    normal: {
                        color: new this.$echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                            {
                            offset: 0,
                            color: "rgba(0, 216, 135, 0.4)"
                            },
                            {
                            offset: 0.8,
                            color: "rgba(0, 216, 135, 0.1)"
                            }
                        ],
                        false
                        ),
                        shadowColor: "rgba(0, 0, 0, 0.1)"
                    }
                    },
                    itemStyle: {
                    normal: {
                        color: "#00d887",
                        borderColor: "rgba(221, 220, 107, .1)",
                        borderWidth: 12
                    }
                    },
                    data: [
                    50,
                    30,
                    50,
                    60,
                    10,
                    50,
                    30,
                    50,
                    60,
                    40,
                    60,
                    40,
                    80,
                    30,
                    50,
                    60,
                    10,
                    50,
                    30,
                    70,
                    20,
                    50,
                    10,
                    40,
                    50,
                    30,
                    70,
                    20,
                    50,
                    10,
                    40
                    ]
                }
                ]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            window.addEventListener("resize", function() {
                myChart.resize();
            });
        },
        getJinChart() {
            var myChart = this.$echarts.init(document.querySelector(".bar1 .chart"));
            var data = [70, 34, 60, 78, 69];
            var titlename = ["HTML5", "CSS3", "javascript", "VUE", "NODE"];
            var valdata = [702, 350, 610, 793, 664];
            var myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];
            const option = {
                //图标位置
                grid: {
                top: "10%",
                left: "22%",
                bottom: "10%"
                },
                xAxis: {
                show: false
                },
                yAxis: [
                {
                    show: true,
                    data: titlename,
                    inverse: true,
                    axisLine: {
                    show: false
                    },
                    splitLine: {
                    show: false
                    },
                    axisTick: {
                    show: false
                    },
                    axisLabel: {
                    color: "#fff",

                    rich: {
                        lg: {
                        backgroundColor: "#339911",
                        color: "#fff",
                        borderRadius: 15,
                        // padding: 5,
                        align: "center",
                        width: 15,
                        height: 15
                        }
                    }
                    }
                },
                {
                    show: true,
                    inverse: true,
                    data: valdata,
                    axisLabel: {
                    textStyle: {
                        fontSize: 12,
                        color: "#fff"
                    }
                    }
                }
                ],
                series: [
                {
                    name: "条",
                    type: "bar",
                    yAxisIndex: 0,
                    data: data,
                    barCategoryGap: 50,
                    barWidth: 10,
                    itemStyle: {
                    normal: {
                        barBorderRadius: 20,
                        color: function(params) {
                        var num = myColor.length;
                        return myColor[params.dataIndex % num];
                        }
                    }
                    },
                    label: {
                    normal: {
                        show: true,
                        position: "inside",
                        formatter: "{c}%"
                    }
                    }
                },
                {
                    name: "框",
                    type: "bar",
                    yAxisIndex: 1,
                    barCategoryGap: 50,
                    data: [100, 100, 100, 100, 100],
                    barWidth: 15,
                    itemStyle: {
                    normal: {
                        color: "none",
                        borderColor: "#00c1de",
                        borderWidth: 3,
                        barBorderRadius: 15
                    }
                    }
                }
                ]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            window.addEventListener("resize", function() {
                myChart.resize();
            });
        },
        getBingChart() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = this.$echarts.init(document.querySelector(".pie .chart"));
            const option = {
                tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b}: {c} ({d}%)",
                position: function(p) {
                    //其中p为当前鼠标的位置
                    return [p[0] + 10, p[1] - 10];
                }
                },
                legend: {
                top: "90%",
                itemWidth: 10,
                itemHeight: 10,
                data: ["0岁以下", "20-29岁", "30-39岁", "40-49岁", "50岁以上"],
                textStyle: {
                    color: "rgba(255,255,255,.5)",
                    fontSize: "12"
                }
                },
                series: [
                {
                    name: "年龄分布",
                    type: "pie",
                    center: ["50%", "42%"],
                    radius: ["40%", "60%"],
                    color: [
                    "#065aab",
                    "#066eab",
                    "#0682ab",
                    "#0696ab",
                    "#06a0ab",
                    "#06b4ab",
                    "#06c8ab",
                    "#06dcab",
                    "#06f0ab"
                    ],
                    label: { show: false },
                    labelLine: { show: false },
                    data: [
                    { value: 1, name: "0岁以下" },
                    { value: 4, name: "20-29岁" },
                    { value: 2, name: "30-39岁" },
                    { value: 2, name: "40-49岁" },
                    { value: 1, name: "50岁以上" }
                    ]
                }
                ]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            window.addEventListener("resize", function() {
                myChart.resize();
            });
        },
        getZheChart() {
            var myChart = this.$echarts.init(document.querySelector(".line .chart"));
            // (1)准备数据
            var data = {
                year: [
                [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
                [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
                ]
            };

            // 2. 指定配置和数据
            var option = {
                color: ["#00f2f1", "#ed3f35"],
                tooltip: {
                // 通过坐标轴来触发
                trigger: "axis"
                },
                legend: {
                // 距离容器10%
                right: "10%",
                // 修饰图例文字的颜色
                textStyle: {
                    color: "#4c9bfd"
                }
                // 如果series 里面设置了name，此时图例组件的data可以省略
                // data: ["邮件营销", "联盟广告"]
                },
                grid: {
                top: "20%",
                left: "3%",
                right: "4%",
                bottom: "3%",
                show: true,
                borderColor: "#012f4a",
                containLabel: true
                },

                xAxis: {
                type: "category",
                boundaryGap: false,
                data: [
                    "1月",
                    "2月",
                    "3月",
                    "4月",
                    "5月",
                    "6月",
                    "7月",
                    "8月",
                    "9月",
                    "10月",
                    "11月",
                    "12月"
                ],
                // 去除刻度
                axisTick: {
                    show: false
                },
                // 修饰刻度标签的颜色
                axisLabel: {
                    color: "rgba(255,255,255,.7)"
                },
                // 去除x坐标轴的颜色
                axisLine: {
                    show: false
                }
                },
                yAxis: {
                type: "value",
                // 去除刻度
                axisTick: {
                    show: false
                },
                // 修饰刻度标签的颜色
                axisLabel: {
                    color: "rgba(255,255,255,.7)"
                },
                // 修改y轴分割线的颜色
                splitLine: {
                    lineStyle: {
                    color: "#012f4a"
                    }
                }
                },
                series: [
                {
                    name: "新增粉丝",
                    type: "line",
                    stack: "总量",
                    // 是否让线条圆滑显示
                    smooth: true,
                    data: data.year[0]
                },
                {
                    name: "新增游客",
                    type: "line",
                    stack: "总量",
                    smooth: true,
                    data: data.year[1]
                }
                ]
            };
            // 3. 把配置和数据给实例对象
            myChart.setOption(option);

            // 重新把配置好的新数据给实例对象
            myChart.setOption(option);
            window.addEventListener("resize", function() {
                myChart.resize();
            });
        },
        getChart() {
            var myChart = this.$echarts.init(document.querySelector(".bar .chart"));
            if (myChart) {
                var option = {
                    color: ["#2f89cf"],
                    tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                    }
                    },
                    grid: {
                    left: "0%",
                    top: "10px",
                    right: "0%",
                    bottom: "4%",
                    containLabel: true
                    },
                    xAxis: [
                    {
                        type: "category",
                        data: [
                        "旅游行业",
                        "教育培训",
                        "游戏行业",
                        "医疗行业",
                        "电商行业",
                        "社交行业",
                        "金融行业"
                        ],
                        axisTick: {
                        alignWithLabel: true
                        },
                        axisLabel: {
                        textStyle: {
                            color: "rgba(255,255,255,.6)",
                            fontSize: "12"
                        }
                        },
                        axisLine: {
                        show: false
                        }
                    }
                    ],
                    yAxis: [
                    {
                        type: "value",
                        axisLabel: {
                        textStyle: {
                            color: "rgba(255,255,255,.6)",
                            fontSize: "12"
                        }
                        },
                        axisLine: {
                        lineStyle: {
                            color: "rgba(255,255,255,.1)"
                            // width: 1,
                            // type: "solid"
                        }
                        },
                        splitLine: {
                        lineStyle: {
                            color: "rgba(255,255,255,.1)"
                        }
                        }
                    }
                    ],
                    series: [
                    {
                        name: "直接访问",
                        type: "bar",
                        barWidth: "35%",
                        data: [200, 300, 300, 900, 1500, 1200, 600],
                        itemStyle: {
                        barBorderRadius: 5
                        }
                    }
                    ]
                };

                // 把配置给实例对象
                myChart.setOption(option);
                window.addEventListener("resize", function() {
                    myChart.resize();
                });
            }
        },

        getEcharts() {
            // if (chart) {
                // const myChart = this.$echarts.init(chinaMap)
                var myChart =  this.$echarts.init(document.querySelector(".map .chart"));
                var geoCoordMap = {
                    上海: [121.4648, 31.2891],
                    东莞: [113.8953, 22.901],
                    东营: [118.7073, 37.5513],
                    中山: [113.4229, 22.478],
                    临汾: [111.4783, 36.1615],
                    临沂: [118.3118, 35.2936],
                    丹东: [124.541, 40.4242],
                    丽水: [119.5642, 28.1854],
                    乌鲁木齐: [87.9236, 43.5883],
                    佛山: [112.8955, 23.1097],
                    保定: [115.0488, 39.0948],
                    兰州: [103.5901, 36.3043],
                    包头: [110.3467, 41.4899],
                    北京: [116.4551, 40.2539],
                    北海: [109.314, 21.6211],
                    南京: [118.8062, 31.9208],
                    南宁: [108.479, 23.1152],
                    南昌: [116.0046, 28.6633],
                    南通: [121.1023, 32.1625],
                    厦门: [118.1689, 24.6478],
                    台州: [121.1353, 28.6688],
                    合肥: [117.29, 32.0581],
                    呼和浩特: [111.4124, 40.4901],
                    咸阳: [108.4131, 34.8706],
                    哈尔滨: [127.9688, 45.368],
                    唐山: [118.4766, 39.6826],
                    嘉兴: [120.9155, 30.6354],
                    大同: [113.7854, 39.8035],
                    大连: [122.2229, 39.4409],
                    天津: [117.4219, 39.4189],
                    太原: [112.3352, 37.9413],
                    威海: [121.9482, 37.1393],
                    宁波: [121.5967, 29.6466],
                    宝鸡: [107.1826, 34.3433],
                    宿迁: [118.5535, 33.7775],
                    常州: [119.4543, 31.5582],
                    广州: [113.5107, 23.2196],
                    廊坊: [116.521, 39.0509],
                    延安: [109.1052, 36.4252],
                    张家口: [115.1477, 40.8527],
                    徐州: [117.5208, 34.3268],
                    德州: [116.6858, 37.2107],
                    惠州: [114.6204, 23.1647],
                    成都: [103.9526, 30.7617],
                    扬州: [119.4653, 32.8162],
                    承德: [117.5757, 41.4075],
                    拉萨: [91.1865, 30.1465],
                    无锡: [120.3442, 31.5527],
                    日照: [119.2786, 35.5023],
                    昆明: [102.9199, 25.4663],
                    杭州: [119.5313, 29.8773],
                    枣庄: [117.323, 34.8926],
                    柳州: [109.3799, 24.9774],
                    株洲: [113.5327, 27.0319],
                    武汉: [114.3896, 30.6628],
                    汕头: [117.1692, 23.3405],
                    江门: [112.6318, 22.1484],
                    沈阳: [123.1238, 42.1216],
                    沧州: [116.8286, 38.2104],
                    河源: [114.917, 23.9722],
                    泉州: [118.3228, 25.1147],
                    泰安: [117.0264, 36.0516],
                    泰州: [120.0586, 32.5525],
                    济南: [117.1582, 36.8701],
                    济宁: [116.8286, 35.3375],
                    海口: [110.3893, 19.8516],
                    淄博: [118.0371, 36.6064],
                    淮安: [118.927, 33.4039],
                    深圳: [114.5435, 22.5439],
                    清远: [112.9175, 24.3292],
                    温州: [120.498, 27.8119],
                    渭南: [109.7864, 35.0299],
                    湖州: [119.8608, 30.7782],
                    湘潭: [112.5439, 27.7075],
                    滨州: [117.8174, 37.4963],
                    潍坊: [119.0918, 36.524],
                    烟台: [120.7397, 37.5128],
                    玉溪: [101.9312, 23.8898],
                    珠海: [113.7305, 22.1155],
                    盐城: [120.2234, 33.5577],
                    盘锦: [121.9482, 41.0449],
                    石家庄: [114.4995, 38.1006],
                    福州: [119.4543, 25.9222],
                    秦皇岛: [119.2126, 40.0232],
                    绍兴: [120.564, 29.7565],
                    聊城: [115.9167, 36.4032],
                    肇庆: [112.1265, 23.5822],
                    舟山: [122.2559, 30.2234],
                    苏州: [120.6519, 31.3989],
                    莱芜: [117.6526, 36.2714],
                    菏泽: [115.6201, 35.2057],
                    营口: [122.4316, 40.4297],
                    葫芦岛: [120.1575, 40.578],
                    衡水: [115.8838, 37.7161],
                    衢州: [118.6853, 28.8666],
                    西宁: [101.4038, 36.8207],
                    西安: [109.1162, 34.2004],
                    贵阳: [106.6992, 26.7682],
                    连云港: [119.1248, 34.552],
                    邢台: [114.8071, 37.2821],
                    邯郸: [114.4775, 36.535],
                    郑州: [113.4668, 34.6234],
                    鄂尔多斯: [108.9734, 39.2487],
                    重庆: [107.7539, 30.1904],
                    金华: [120.0037, 29.1028],
                    铜川: [109.0393, 35.1947],
                    银川: [106.3586, 38.1775],
                    镇江: [119.4763, 31.9702],
                    长春: [125.8154, 44.2584],
                    长沙: [113.0823, 28.2568],
                    长治: [112.8625, 36.4746],
                    阳泉: [113.4778, 38.0951],
                    青岛: [120.4651, 36.3373],
                    韶关: [113.7964, 24.7028]
                };

                var XAData = [
                    [{ name: "西安" }, { name: "北京", value: 100 }],
                    [{ name: "西安" }, { name: "上海", value: 100 }],
                    [{ name: "西安" }, { name: "广州", value: 100 }],
                    [{ name: "西安" }, { name: "西宁", value: 100 }],
                    [{ name: "西安" }, { name: "拉萨", value: 100 }]
                ];

                var XNData = [
                    [{ name: "西宁" }, { name: "北京", value: 100 }],
                    [{ name: "西宁" }, { name: "上海", value: 100 }],
                    [{ name: "西宁" }, { name: "广州", value: 100 }],
                    [{ name: "西宁" }, { name: "西安", value: 100 }],
                    [{ name: "西宁" }, { name: "银川", value: 100 }]
                ];

                var YCData = [
                    [{ name: "拉萨" }, { name: "北京", value: 100 }],
                    [{ name: "拉萨" }, { name: "潍坊", value: 100 }],
                    [{ name: "拉萨" }, { name: "哈尔滨", value: 100 }]
                ];
                var planePath = "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z";
                var convertData = function(data) {
                    var res = [];
                    for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];

                    var fromCoord = geoCoordMap[dataItem[0].name];
                    var toCoord = geoCoordMap[dataItem[1].name];
                    if (fromCoord && toCoord) {
                        res.push({
                        fromName: dataItem[0].name,
                        toName: dataItem[1].name,
                        coords: [fromCoord, toCoord],
                        value: dataItem[1].value
                        });
                    }
                    }
                    return res;
                };
                var color = ["#fff", "#fff", "#fff"]; //航线的颜色
                var series = [];
                [
                    ["西安", XAData],
                    ["西宁", XNData],
                    ["银川", YCData]
                ].forEach(function(item, i) {
                    series.push(
                    {
                        name: item[0] + " Top3",
                        type: "lines",
                        zlevel: 1,
                        effect: {
                        show: true,
                        period: 6,
                        trailLength: 0.7,
                        color: "red", //arrow箭头的颜色
                        symbolSize: 3
                        },
                        lineStyle: {
                        normal: {
                            color: color[i],
                            width: 0,
                            curveness: 0.2
                        }
                        },
                        data: convertData(item[1])
                    },
                    {
                        name: item[0] + " Top3",
                        type: "lines",
                        zlevel: 2,
                        symbol: ["none", "arrow"],
                        symbolSize: 10,
                        effect: {
                        show: true,
                        period: 6,
                        trailLength: 0,
                        symbol: planePath,
                        symbolSize: 15
                        },
                        lineStyle: {
                        normal: {
                            color: color[i],
                            width: 1,
                            opacity: 0.6,
                            curveness: 0.2
                        }
                        },
                        data: convertData(item[1])
                    },
                    {
                        name: item[0] + " Top3",
                        type: "effectScatter",
                        coordinateSystem: "geo",
                        zlevel: 2,
                        rippleEffect: {
                        brushType: "stroke"
                        },
                        label: {
                        normal: {
                            show: true,
                            position: "right",
                            formatter: "{b}"
                        }
                        },
                        symbolSize: function(val) {
                        return val[2] / 8;
                        },
                        itemStyle: {
                        normal: {
                            color: color[i]
                        },
                        emphasis: {
                            areaColor: "#2B91B7"
                        }
                        },
                        data: item[1].map(function(dataItem) {
                        return {
                            name: dataItem[1].name,
                            value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                        };
                        })
                    }
                    );
                });
                var option = {
                    tooltip: {
                    trigger: "item",
                    formatter: function(params, ticket, callback) {
                        if (params.seriesType == "effectScatter") {
                        return "线路：" + params.data.name + "" + params.data.value[2];
                        } else if (params.seriesType == "lines") {
                        return (
                            params.data.fromName +
                            ">" +
                            params.data.toName +
                            "<br />" +
                            params.data.value
                        );
                        } else {
                        return params.name;
                        }
                    }
                    },

                    geo: {
                    map: "china",
                    label: {
                        emphasis: {
                        show: true,
                        color: "#fff"
                        }
                    },
                    roam: false,
                    //   放大我们的地图
                    zoom: 1,
                    itemStyle: {
                        normal: {
                        areaColor: "rgba(43, 196, 243, 0.42)",
                        borderColor: "rgba(43, 196, 243, 1)",
                        borderWidth: 1
                        },
                        emphasis: {
                        areaColor: "#2B91B7"
                        }
                    }
                    },
                    series: series
                };
                myChart.setOption(option);
                window.addEventListener("resize", function() {
                    myChart.resize();
                });
            // }
            
            this.$on('hook:destroyed',()=>{
                window.removeEventListener("resize", function() {
                    myChart.resize();
                });
            })
            
        }
    }
  }
  </script>
  
  <style scoped lang="less">
  /* css */
  * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
li {
  list-style: none;
}
// @font-face {
//   font-family: electronicFont;
//   src: url(../font/DS-DIGIT.TTF);
// }
.body {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
  padding: 0;
  /*  背景图定位 / 背景图尺寸  cover 完全铺满容器  contain 完整显示在容器内 */
//   background: url(../images/bg.jpg) no-repeat #000;
    background: url(@/assets/chartImage/bg.jpg) no-repeat #000;
  background-size: cover;
  /* 行高是字体1.15倍 */
  line-height: 1.15;
}
header {
  position: relative;
  height: 1.25rem;
//   background: url(../images/head_bg.png) no-repeat top center;
background: url(@/assets/chartImage/head_bg.png) no-repeat top center;
  background-size: 100% 100%;
}
header h1 {
  font-size: 0.475rem;
  color: #fff;
  text-align: center;
  line-height: 1rem;
}
header .showTime {
  position: absolute;
  top: 0;
  right: 0.375rem;
  line-height: 0.9375rem;
  font-size: 0.25rem;
  color: rgba(255, 255, 255, 0.7);
}
.mainbox {
  min-width: 1024px;
  max-width: 1920px;
  padding: 0.125rem 0.125rem 0;
  display: flex;
}
.mainbox .column {
  flex: 3;
}
.mainbox .column:nth-child(2) {
  flex: 5;
  margin: 0 0.125rem 0.1875rem;
  overflow: hidden;
}
.panel {
  position: relative;
  height: 3.875rem;
  border: 1px solid rgba(25, 186, 139, 0.17);
//   background: rgba(255, 255, 255, 0.04) url(../images/line\(1\).png);
background: rgba(255, 255, 255, 0.04) url(@/assets/chartImage/line.png);
  padding: 0 0.1875rem 0.5rem;
  margin-bottom: 0.1875rem;
}
.panel::before {
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  width: 10px;
  height: 10px;
  border-top: 2px solid #02a6b5;
  border-left: 2px solid #02a6b5;
}
.panel::after {
  position: absolute;
  top: 0;
  right: 0;
  content: "";
  width: 10px;
  height: 10px;
  border-top: 2px solid #02a6b5;
  border-right: 2px solid #02a6b5;
}
.panel .panel-footer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}
.panel .panel-footer::before {
  position: absolute;
  bottom: 0;
  left: 0;
  content: "";
  width: 10px;
  height: 10px;
  border-bottom: 2px solid #02a6b5;
  border-left: 2px solid #02a6b5;
}
.panel .panel-footer::after {
  position: absolute;
  bottom: 0;
  right: 0;
  content: "";
  width: 10px;
  height: 10px;
  border-bottom: 2px solid #02a6b5;
  border-right: 2px solid #02a6b5;
}
.panel h2 {
  height: 0.6rem;
  line-height: 0.6rem;
  text-align: center;
  color: #fff;
  font-size: 0.25rem;
  font-weight: 400;
}
.panel h2 a {
  margin: 0 0.1875rem;
  color: #fff;
  text-decoration: underline;
}
.panel .chart {
  height: 3rem;
}
.no {
  background: rgba(101, 132, 226, 0.1);
  padding: 0.1875rem;
}
.no .no-hd {
  position: relative;
  border: 1px solid rgba(25, 186, 139, 0.17);
}
.no .no-hd::before {
  content: "";
  position: absolute;
  width: 30px;
  height: 10px;
  border-top: 2px solid #02a6b5;
  border-left: 2px solid #02a6b5;
  top: 0;
  left: 0;
}
.no .no-hd::after {
  content: "";
  position: absolute;
  width: 30px;
  height: 10px;
  border-bottom: 2px solid #02a6b5;
  border-right: 2px solid #02a6b5;
  right: 0;
  bottom: 0;
}
.no .no-hd ul {
  display: flex;
}
.no .no-hd ul li {
  position: relative;
  flex: 1;
  text-align: center;
  height: 1rem;
  line-height: 1rem;
  font-size: 0.875rem;
  color: #ffeb7b;
  padding: 0.05rem 0;
  font-family: electronicFont;
  font-weight: bold;
}
.no .no-hd ul li:first-child::after {
  content: "";
  position: absolute;
  height: 50%;
  width: 1px;
  background: rgba(255, 255, 255, 0.2);
  right: 0;
  top: 25%;
}
.no .no-bd ul {
  display: flex;
}
.no .no-bd ul li {
  flex: 1;
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  font-size: 0.225rem;
  color: rgba(255, 255, 255, 0.7);
  padding-top: 0.125rem;
}
.map {
  position: relative;
  height: 10.125rem;
}
.map .chart {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  height: 10.125rem;
  width: 100%;
}
.map .map1,
.map .map2,
.map .map3 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 6.475rem;
  height: 6.475rem;
  background: url(@/assets/chartImage/map.png) no-repeat;
//   background: url(../images/map.png) no-repeat;
  background-size: 100% 100%;
  opacity: 0.3;
}
.map .map2 {
  width: 8.0375rem;
  height: 8.0375rem;
  background-image: url(@/assets/chartImage/lbx.png);
//   background-image: url(../images/lbx.png);
  opacity: 0.6;
  animation: rotate 15s linear infinite;
  z-index: 2;
}
.map .map3 {
  width: 7.075rem;
  height: 7.075rem;
  background-image: url(@/assets/chartImage/jt.png);
//   background-image: url(../images/jt.png);
  animation: rotate1 10s linear infinite;
}
@keyframes rotate {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
@keyframes rotate1 {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(-360deg);
  }
}
@media screen and (max-width: 1024px) {
  html {
    font-size: 42px !important;
  }
}
@media screen and (min-width: 1920) {
  html {
    font-size: 80px !important;
  }
}
/* less */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
li {
  list-style: none;
}
// @font-face {
//   font-family: electronicFont;
// //   src: url(../font/DS-DIGIT.TTF);
// }
.body {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
  padding: 0;
  height: 100%;
  /*  背景图定位 / 背景图尺寸  cover 完全铺满容器  contain 完整显示在容器内 */
//   background: url(../images/bg.jpg) no-repeat #000;
    background: url(@/assets/chartImage/bg.jpg) no-repeat #000;
  background-size: cover;
  /* 行高是字体1.15倍 */
  line-height: 1.15;
}
header {
  position: relative;
  height: 1.25rem;
//   background: url(../images/head_bg.png) no-repeat top center;
    background: url(@/assets/chartImage/head_bg.png) no-repeat top center;
  background-size: 100% 100%;
  h1 {
    font-size: 0.475rem;
    color: #fff;
    text-align: center;
    line-height: 1rem;
  }
  .showTime {
    position: absolute;
    top: 0;
    right: 0.375rem;
    line-height: 0.9375rem;
    font-size: 0.25rem;
    color: rgba(255, 255, 255, 0.7);
  }
}
.mainbox {
  min-width: 1024px;
  max-width: 1920px;
  padding: 0.125rem 0.125rem 0;
  display: flex;
  .column {
    flex: 3;
    &:nth-child(2) {
      flex: 5;
      margin: 0 0.125rem 0.1875rem;
      overflow: hidden;
    }
  }
}
.panel {
  position: relative;
  height: 3.875rem;
  border: 1px solid rgba(25, 186, 139, 0.17);
//   background: rgba(255, 255, 255, 0.04) url(../images/line\(1\).png);
  background: rgba(255, 255, 255, 0.04) url(@/assets/chartImage/line.png);
  padding: 0 0.1875rem 0.5rem;
  margin-bottom: 0.1875rem;
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    width: 10px;
    height: 10px;
    border-top: 2px solid #02a6b5;
    border-left: 2px solid #02a6b5;
  }
  &::after {
    position: absolute;
    top: 0;
    right: 0;
    content: "";
    width: 10px;
    height: 10px;
    border-top: 2px solid #02a6b5;
    border-right: 2px solid #02a6b5;
  }
  .panel-footer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    &::before {
      position: absolute;
      bottom: 0;
      left: 0;
      content: "";
      width: 10px;
      height: 10px;
      border-bottom: 2px solid #02a6b5;
      border-left: 2px solid #02a6b5;
    }
    &::after {
      position: absolute;
      bottom: 0;
      right: 0;
      content: "";
      width: 10px;
      height: 10px;
      border-bottom: 2px solid #02a6b5;
      border-right: 2px solid #02a6b5;
    }
  }

  h2 {
    height: 0.6rem;
    line-height: 0.6rem;
    text-align: center;
    color: #fff;
    font-size: 0.25rem;
    font-weight: 400;
    a {
      margin: 0 0.1875rem;
      color: #fff;
      text-decoration: underline;
    }
  }
  .chart {
    height: 3rem;
  }
}
.no {
  background: rgba(101, 132, 226, 0.1);
  padding: 0.1875rem;
  .no-hd {
    position: relative;
    border: 1px solid rgba(25, 186, 139, 0.17);
    &::before {
      content: "";
      position: absolute;
      width: 30px;
      height: 10px;
      border-top: 2px solid #02a6b5;
      border-left: 2px solid #02a6b5;
      top: 0;
      left: 0;
    }
    &::after {
      content: "";
      position: absolute;
      width: 30px;
      height: 10px;
      border-bottom: 2px solid #02a6b5;
      border-right: 2px solid #02a6b5;
      right: 0;
      bottom: 0;
    }
    ul {
      display: flex;
      li {
        position: relative;
        flex: 1;
        text-align: center;
        height: 1rem;
        line-height: 1rem;
        font-size: 0.875rem;
        color: #ffeb7b;
        padding: 0.05rem 0;
        font-family: electronicFont;
        font-weight: bold;
        &:first-child::after {
          content: "";
          position: absolute;
          height: 50%;
          width: 1px;
          background: rgba(255, 255, 255, 0.2);
          right: 0;
          top: 25%;
        }
      }
    }
  }
  .no-bd ul {
    display: flex;
    li {
      flex: 1;
      height: 0.5rem;
      line-height: 0.5rem;
      text-align: center;
      font-size: 0.225rem;
      color: rgba(255, 255, 255, 0.7);
      padding-top: 0.125rem;
    }
  }
}
.map {
  position: relative;
  height: 10.125rem;
  .chart {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
    height: 10.125rem;
    width: 100%;
  }
  .map1,
  .map2,
  .map3 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 6.475rem;
    height: 6.475rem;
    // background: url(../images/map.png) no-repeat;
    background: url(@/assets/chartImage/map.png) no-repeat;
    background-size: 100% 100%;
    opacity: 0.3;
  }
  .map2 {
    width: 8.0375rem;
    height: 8.0375rem;
    background-image: url(@/assets/chartImage/lbx.png);
    // background-image: url(../images/lbx.png);
    opacity: 0.6;
    animation: rotate 15s linear infinite;
    z-index: 2;
  }
  .map3 {
    width: 7.075rem;
    height: 7.075rem;
    background-image: url(@/assets/chartImage/jt.png);
    // background-image: url(../images/jt.png);
    animation: rotate1 10s linear infinite;
  }

  @keyframes rotate {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
  @keyframes rotate1 {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(-360deg);
    }
  }
}

@media screen and (max-width: 1024px) {
  html {
    font-size: 42px !important;
  }
}
@media screen and (min-width: 1920) {
  html {
    font-size: 80px !important;
  }
}

  </style>
  