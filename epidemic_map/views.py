from django.http import JsonResponse
from django.shortcuts import render
from epidemic_map.getDataFromMysql.getChartData import *
from epidemic_map.getDataFromMysql.getMapData import *
from epidemic_map.mysql_conn import getData


# Create your views here.

# rander的三个参数：(前两个参数必须给出，第三个可以省略)
# 请求request
# 需要渲染的模板文件(跳转到哪一个.html文件)
# 字典对象(用来存放渲染模板的数据)
def index(request):
    return render(request, 'epidemic/epidemic.html')


def ncov_totalcount(request):
    ncov_data = list(getData("""SELECT SUM(confirmed_count) as total, (SUM(confirmed_count)-SUM(cured_count)-SUM(dead_count))
                as now_confirmed FROM covid_data_2017 WHERE DAY(update_time)=29 GROUP BY update_time;"""))
    confirmedCount = ncov_data[0][0]
    confirmedNow = ncov_data[0][1]
    return JsonResponse({'confirmedCount': confirmedCount, 'confirmedNow': confirmedNow})

# 响应体
def get_chart_data(request):
    chart_info = {}
    chart1_data = get_chart1_data()
    chart2_data = get_chart2_data()
    chart3_data = get_chart3_data()
    chart4_data = get_chart4_data()
    chart5_data = get_chart5_data()
    chart6_data = get_chart6_data()
    chart_info['chart1'] = chart1_data
    chart_info['chart2'] = chart2_data
    chart_info['chart3'] = chart3_data
    chart_info['chart4'] = chart4_data
    chart_info['chart5'] = chart5_data
    chart_info['chart6'] = chart6_data
    return JsonResponse(chart_info)


def get_map_data(request):  # 地图的数据
    map_data = drewi()
    city_data = drawmap()
    migration_data = migration()
    return JsonResponse({'country': map_data, 'city': city_data, 'migrate': migration_data})
