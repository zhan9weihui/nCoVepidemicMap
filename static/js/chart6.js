$(function () {
        $.ajax({
            url: '/get_chart_data',
            type: 'get',
            dataType: 'json',
            success: function (res) {
                echarts_6(res['chart6']);
            }
        });

        function echarts_6(data) {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('echart6'));

            option = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{b}: {c} ({d}%)",
                    position: function (p) {   //其中p为当前鼠标的位置
                        return [p[0] + 10, p[1] - 10];
                    }
                },
                series: [
                    {
                        type: 'pie',
                        center: ['50%', '52%'],
                        radius: ['40%', '80%'],
                        label: {show: true},
                        labelLine: {show: true},
                        data: data
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