$(function () {
        $.ajax({
            url: '/get_chart_data',
            type: 'get',
            dataType: 'json',
            success: function (res) {
                echarts_3(res['chart3']);
            }
        });

        function echarts_3(data) {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('echart3'));
            option = {
                tooltip: {
                    trigger: 'item',
                    triggerOn: 'mousemove',
                    formatter: '{a}',
                    textStyle: {fontSize: 10},
                },
                aria: {
                    show: true
                },
                series: [
                    {
                        name: '死亡率',
                        type: 'gauge',
                        min: 0,
                        max: 10,
                        symbol: 'circle',
                        symbolSize: 5,
                        showSymbol: false,
                        radius: '120%',
                        center: ['50%', '60%'],
                        detail: {formatter: '{value}%'},
                        data: [{value: data, name: '死亡率'}],
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
                            }
                        },
                    }
                ]
            }
        // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        }

    }
)