$(function () {
        $.ajax({
            url: '/get_chart_data',
            type: 'get',
            dataType: 'json',
            success: function (res) {
                echarts_2(res['chart2']);
            }
        });

        function echarts_2(data) {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('echart2'));

            option = {
                //  backgroundColor: '#00265f',
                tooltip: {
                    trigger: 'item',
                    triggerOn: 'mousemove',
                    axisPointer: {type: 'shadow'},
                    formatter: function (params) {
                        var s = params.value[2] + ': (' + params.value[0] + ', ' + params.value[1] + ')';
                        return s
                    },
                    textStyle: {fontSize: 10},
                },
                grid: {
                    left: '0%',
                    top: '10px',
                    right: '0%',
                    bottom: '4%',
                    containLabel: true
                },
                xAxis: [{
                    // type: 'category',
                    boundaryGap: false,
                    // min:0,
                    // max:20,
                    interval: 4,
                    axisLabel: {
                        textStyle: {
                            color: "rgba(255,255,255,.6)",
                            fontSize: 12,
                        },
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,.2)'
                        }

                    },

                    //data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']
                    // data: data['x_name']
                }, {

                    axisPointer: {show: false},
                    axisLine: {show: false},
                    position: 'bottom',
                    offset: 20,
                }],

                yAxis: [{
                    // type: 'value',
                    axisTick: {show: false},
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,.1)'
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: "rgba(255,255,255,.6)",
                            fontSize: 12,
                        },
                    },

                    splitLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,.1)'
                        }
                    }
                }],
                aria: {
                    show: true
                },
                series: [
                    {
                        // name: '当日确诊',
                        type: 'scatter',
                        smooth: true,
                        symbol: 'circle',
                        symbolSize: 5,
                        showSymbol: false,
                        lineStyle: {
                            normal: {
                                color: '#d5110d',
                                width: 2
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(1, 132, 213, 0.4)'
                                }, {
                                    offset: 0.8,
                                    color: 'rgba(1, 132, 213, 0.1)'
                                }], false),
                                shadowColor: 'rgba(0, 0, 0, 0.1)',
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#d5110d',
                                borderColor: 'rgba(221, 220, 107, .1)',
                                borderWidth: 12,
                                label: {
                                    color: '#7B38F8',
                                    show: false,
                                    position: 'top',
                                    formatter: function (params) {
                                        var s = params.value[2];
                                        return s
                                    },
                                },
                            }
                        },
                        data: data,
                    },
                ]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        }

    }
)