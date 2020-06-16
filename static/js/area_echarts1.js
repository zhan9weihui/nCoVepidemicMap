$(function () {
        var local_var = '';
        $.ajax({
            url: '/get_map_data',
            type: 'get',
            dataTpye: 'json',
            success: function (res) {
                local_var = res;
                mymap(res);
            },
            error: function (res) {
                console.log('erro');
            }
        });


        var geoCoordMap = {
            '湖北': [112.29, 30.98],
            '新疆': [86.61, 40.79],
            '西藏': [89.13, 30.66],
            '黑龙江': [128.34, 47.05],
            '吉林': [126.32, 43.38],
            '辽宁': [123.42, 41.29],
            '内蒙古': [112.17, 42.81],
            '北京': [116.40, 40.40],
            '宁夏': [106.27, 36.76],
            '山西': [111.95, 37.65],
            '河北': [115.21, 38.44],
            '天津': [117.04, 39.52],
            '青海': [97.07, 35.62],
            '甘肃': [103.82, 36.05],
            '山东': [118.01, 36.37],
            '陕西': [108.94, 34.46],
            '河南': [113.46, 34.25],
            '安徽': [117.28, 31.86],
            '江苏': [120.26, 32.54],
            '上海': [121.46, 31.28],
            '四川': [103.36, 30.65],
            '浙江': [120.15, 29.28],
            '重庆': [107.51, 29.63],
            '湖南': [112.08, 27.79],
            '江西': [115.89, 27.97],
            '贵州': [106.91, 26.67],
            '福建': [118.31, 26.07],
            '云南': [101.71, 24.84],
            '台湾': [121.01, 23.54],
            '广西': [108.67, 23.68],
            '广东': [113.98, 22.82],
            '海南': [110.03, 19.33],
            '澳门': [113.54, 22.19],
            '香港': [114.17, 22.32],
        };

        var convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                var fromCoord = geoCoordMap[dataItem[0]];
                var toCoord = geoCoordMap[dataItem[1]];
                if (fromCoord && toCoord) {
                    res.push({
                        fromName: dataItem[0],
                        toName: dataItem[1],
                        coords: [fromCoord, toCoord]
                    });
                }
            }
            // alert(res[1].coords);
            return res; // ['北京',toName, coords([fromCoord, toCoord]坐标)]
        };


        function mymap(data) {
            var MapContainer = document.getElementById('map_1');
            var mapChart = echarts.init(MapContainer);
            // 34个省、市、自治区的名字拼音映射数组
            var provinces = {
                // 23个省
                台湾: 'taiwan',
                河北: 'hebei',
                山西: 'shanxi',
                辽宁: 'liaoning',
                吉林: 'jilin',
                黑龙江: 'heilongjiang',
                江苏: 'jiangsu',
                浙江: 'zhejiang',
                安徽: 'anhui',
                福建: 'fujian',
                江西: 'jiangxi',
                山东: 'shandong',
                河南: 'henan',
                湖北: 'hubei',
                湖南: 'hunan',
                广东: 'guangdong',
                海南: 'hainan',
                四川: 'sichuan',
                贵州: 'guizhou',
                云南: 'yunnan',
                陕西: 'shanxi2',
                甘肃: 'gansu',
                青海: 'qinghai',
                // 5个自治区
                新疆: 'xinjiang',
                广西: 'guangxi',
                内蒙古: 'neimenggu',
                宁夏: 'ningxia',
                西藏: 'xizang',
                // 4个直辖市
                北京: 'beijing',
                天津: 'tianjin',
                上海: 'shanghai',
                重庆: 'chongqing',
                // 2个特别行政区
                香港: 'xianggang',
                澳门: 'aomen'
            };
            option = {
                title: {
                    text: '全国各省市累计确诊人数\n与湖北迁入各省的人口迁徙路线',
                    left: 'center',
                    textStyle: {
                        color: '#fff',
                        fontSize: '16'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a}<br/> {b} :{c}<br/>点击查看详情',
                },
                visualMap: [
                    {
                        show: true,                          //是否显示 visualMap-continuous 组件。如果设置为 false，不会显示，但是数据映射的功能还存在
                        type: 'piecewise',                  // 定义为分段型 visualMap
                        color: '#ffffff',
                        pieces: [                           //自定义『分段式视觉映射组件（visualMapPiecewise）』的每一段的范围，以及每一段的文字，以及每一段的特别的样式
                            {min: 2001, label: '>2001', color: '#811C24'},                     // 不指定 max，表示 max 为无限大（Infinity）。
                            {min: 1001, max: 2000, label: '1000-2000', color: '#CB2A2F'},
                            {min: 501, max: 1000, label: '501-1000', color: '#E55A4E'},
                            {min: 101, max: 500, label: '101-500', color: '#F08080'},
                            {min: 51, max: 100, label: '10-99', color: '#F59E83'},
                            {min: 1, max: 50, label: '1-50', color: '#FDEBCF'}, // 表示 value 等于 123 的情况。
                            {value: 0, label: '0', color: "#FFFFFF"}                        // 不指定 min，表示 min 为无限大（-Infinity）。
                        ],
                        left: '25%',
                        bottom: '0%',
                        textStyle: {
                            color: '#ffffff'
                        }
                    }
                ],
                series: [
                    {
                        name: '累计确诊人数',
                        type: 'map',
                        aspectScale: 0.75,
                        zoom: 1.2,
                        mapType: 'china',
                        zlevel: 2,
                        roam: false,
                        label: {
                            show: true,
                            normal: {
                                show: true,//显示省份标签
                                textStyle: {color: "#000000"}//省份标签字体颜色
                            },
                            emphasis: {//对应的鼠标悬浮效果
                                show: false,
                                textStyle: {color: "#800080"}
                            }
                        },
                        itemStyle: {
                            normal: {
                                borderWidth: .5,//区域边框宽度
                                borderColor: '#002097',//区域边框颜色
                                areaColor: "#ffffff",//区域颜色
                            },
                            emphasis: {
                                borderWidth: .5,
                                borderColor: '#4b0082',
                                areaColor: "#feff5b",
                            }
                        },
                        data: data['country']
                        //     {'name': '重庆', 'value': 14}]

                    },
                    ////////////////////////////////////////////////////
                    {
                        name: '湖北迁出',
                        type: "lines",
                        zlevel: 2,
                        effect: {
                            show: true,
                            period: 6,
                            trailLength: 0,
                            color: "#4B7CF3",
                            symbol: "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z",
                            symbolSize: 14
                        },
                        symbol: [
                            "none",
                            "arrow"
                        ],
                        symbolSize: 5,
                        data: convertData(data['migrate']),
                        lineStyle: {
                            normal: {
                                color: "#4B7CF3",
                                width: 1,
                                opacity: 0.6,
                                curveness: 0.2,
                                type: "solid"
                            }
                        },
                    },
                    {
                        type: "scatter",
                        zlevel: 2,
                        coordinateSystem: "geo",
                        symbolSize: 10,
                        data: convertData(data['migrate']),
                        label: {
                            normal: {
                                show: false,
                                position: "top",
                                textStyle: {
                                    fontSize: 12
                                }
                            },
                            emphasis: {
                                show: false,
                                textStyle: {
                                    fontSize: 12
                                }
                            }
                        },
                        tooltip: {
                            formatter: "{b}"
                        }
                    },
                ],
                ////////////////////////////////////////////
                legend: [
                    {
                        data: [
                            ""
                        ],
                        selectedMode: "multiple",
                        show: true,
                        left: "center",
                        top: "top",
                        orient: "horizontal",
                        textStyle: {
                            fontSize: 12
                        }
                    }
                ],
                animation: true,
                geo: {
                    map: "china",
                    aspectScale: 0.75,
                    zoom: 1.2,
                    zlevel: 2,
                    show: false,
                    itemStyle: {
                        areaColor: 'rgba(128, 128, 128, 0)',
                        borderColor: '#ccc',
                    },
                    // emphasis: {
                    //     itemStyle: {
                    //         areaColor: '#2a333d'
                    //     }
                    // },
                    label: {show: true}
                },
                /////////////////////////////////////////////////////

            };

            mapChart.setOption(option);
            window.addEventListener("resize", function () {
                mapChart.resize();
            });
            // 使用刚指定的配置项和数据显示图表。
            mapChart.on('click', function (params) {//点击事件
                if (params.name in provinces) {
                    $.getJSON('https://data.jianshukeji.com/geochina/' + provinces[params.name] + '.json', function (jsondata) { //获得市级地图数据
                        echarts.registerMap(params.name, jsondata);
                        var d = [];
                        for (var i = 0; i < jsondata.features.length; i++) {
                            d.push({
                                name: jsondata.features[i].properties.name
                            })
                        }
                        renderMap(params.name, data)
                    });
                }
            })
        }


        function renderMap(map, data) {
            // 初始化绘制省市地图配置
            var cityMapContainer = document.getElementById('map_1');
            var myMapChart = echarts.init(cityMapContainer);
            var option1 = {
                title: {
                    text: map + '疫情地图',
                    subtext: '点击标题返回全国地图',
                    sublink: window.location.protocol + "//" + window.location.host + '/index',
                    subtarget: 'self',
                    triggerEvent: true
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a}<br/> {b} :{c}<br/>',
                },
                visualMap: {
                    show: true,
                    color: '#ffffff',
                    //是否显示 visualMap-continuous 组件。如果设置为 false，不会显示，但是数据映射的功能还存在
                    type: 'piecewise',                  // 定义为分段型 visualMap
                    // splitNumber: 5,                      //对于连续型数据，自动平均切分成几段。默认为5段
                    pieces: [                           //自定义『分段式视觉映射组件（visualMapPiecewise）』的每一段的范围，以及每一段的文字，以及每一段的特别的样式
                        {min: 500, label: '>500', color: '#811C24'},                     // 不指定 max，表示 max 为无限大（Infinity）。
                        {min: 200, max: 499, label: '200-499', color: '#811C24'},
                        {min: 100, max: 199, label: '100-199', color: '#CB2A2F'},
                        {min: 50, max: 99, label: '50-99', color: '#E55A4E'},
                        {min: 10, max: 49, label: '10-49', color: '#F59E83'},
                        {min: 1, max: 9, label: '1-9', color: '#FDEBCF'}, // 表示 value 等于 123 的情况。
                        {value: 0, label: '0', color: "#FFFFFF"}                        // 不指定 min，表示 min 为无限大（-Infinity）。
                    ],
                    left: '25%',
                    textStyle: {
                        color: '#ffffff'
                    },
                },
                series: [
                    {
                        name: '现存确诊人数',
                        type: 'map',
                        mapType: map,
                        roam: false,
                        data: data['city'][map],
                        //             data: [{'name': '拉萨', 'value': 300}, {'name': '日喀则', 'value': 120}, {'name': '昌都', 'value': 13},
                        //                     {'name': '林芝', 'value': 14}, {'name': '那曲', 'value': 250}, {'name': '阿里', 'value': 100},
                        //                 {'name': '山南', 'value': 120}],
                        //  data: convertedData[0],
                        label: {
                            show: true,
                            emphasis: {//对应的鼠标悬浮效果
                                show: false,
                                textStyle: {color: "#800080"}
                            }
                        },
                        itemStyle: {
                            normal: {
                                borderWidth: .5,//区域边框宽度
                                borderColor: '#002097',//区域边框颜色
                                areaColor: "#ffffff",//区域颜色
                            },
                            emphasis: {
                                borderWidth: .5,
                                borderColor: '#4b0082',
                                areaColor: "#feff5b",
                            }
                        }
                    }
                ],

            };
            // 渲染地图
            myMapChart.setOption(option1);
            myMapChart.on('click', function (params) {
                if (params.componentType == 'subtext') {
                    mymap(local_var)
                }
            });

        }

// 渲染地图
    }
)

