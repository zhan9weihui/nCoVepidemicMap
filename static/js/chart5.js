$(function () {
        $.ajax({
            url: '/get_chart_data',
            type: 'get',
            dataType: 'json',
            success: function (res) {
                echarts_5(res['chart5']);
            }
        });

        function echarts_5(data) {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('echart5'));

            option = {
                //  backgroundColor: '#00265f',
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },

                grid: {
                    left: '0%',
                    top: '10px',
                    right: '0%',
                    bottom: '2%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    //data: ['浙江', '上海', '江苏', '广东', '北京', '深圳', '安徽', '四川'],
                    data: data['cities'],
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "rgba(255,255,255,.1)",
                            width: 1,
                            type: "solid"
                        },
                    },

                    axisTick: {
                        show: false,
                    },
                    axisLabel: {
                        interval: 1,
                        // rotate:50,
                        show: true,
                        splitNumber: 15,
                        textStyle: {
                            color: "rgba(255,255,255,.6)",
                            fontSize: '12',
                        },
                    },
                }],
                yAxis: [{
                    type: 'value',
                    axisLabel: {
                        //formatter: '{value} %'
                        show: true,
                        textStyle: {
                            color: "rgba(255,255,255,.6)",
                            fontSize: '12',
                        },
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "rgba(255,255,255,.1	)",
                            width: 1,
                            type: "solid"
                        },
                    },
                    splitLine: {
                        lineStyle: {
                            color: "rgba(255,255,255,.1)",
                        }
                    }
                }],
                series: [{
                    type: 'bar',
                    //data: [2, 3, 3, 9, 15, 12, 6, 4, 6, 7, 4, 10],
                    data: data['confirmed'],
                    barWidth: '35%', //柱子宽度
                    // barGap: 1, //柱子之间间距
                    itemStyle: {
                        normal: {
                            color: '#00d887',
                            opacity: 1,
                            barBorderRadius: 5,
                        }
                    }
                }
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