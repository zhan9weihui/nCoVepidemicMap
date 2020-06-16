from epidemic_map.mysql_conn import getData


def drawmap():
    """
        获得各省内各市的疫情数据，由于Echarts和pyechart传入的地市名成不一致，Echarts传入的是市名比如：‘郑州’，
        而pyecharts传入的为‘郑州市’所以地图名不用再做之前的处理。
        :return: 各市级数据
    """
    # 获取城市名
    province = list(getData("""SELECT father_code, map_name FROM area_china WHERE area_level=1;"""))
    cities = list(getData("""SELECT area_name, father_code FROM area_china WHERE area_level=2"""))
    # 获取全国各城市二月累计确诊数
    data = getData("""select SUM(confirmed_count) as province_confirmed from covid_data_2017
                        where day(update_time) = 29 group by province_name;""")
    confirmed = []
    for x in data:
        confirmed.append(int(x[0]))
    map_chart_list = []
    for i in range(len(data)):
        map_chart_list.append([{'name': cities[i][0], 'value': str(confirmed[i])}, cities[i][1]])
    get_all_city_map_data = {}
    for province_code in province:
        province_citise = []
        for city in map_chart_list:
            if city[1] == province_code[0]:
                province_citise.append(city[0])
        get_all_city_map_data[province_code[1]] = province_citise
    return get_all_city_map_data


def drewi():
    """
        获得全国各省数据
        :return: 各省数据
    """
    cities = list(getData("""SELECT area_name, map_name FROM area_china WHERE area_level=1;"""))
    # 获取全国各省二月累计确诊数
    data = list(getData("""select province_name, SUM(confirmed_count) as province_confirmed from covid_data_2017
                        where day(update_time ) = 29 group by province_name;"""))
    map_chart = []
    map_chart_list = []
    for x in data:
        map_chart.append({'name': x[0], 'value': int(x[1])})
    for confirmed in map_chart:
        for provice in cities:
            if confirmed['name'] == provice[0]:
                map_chart = {'name': provice[1], 'value': confirmed['value']}
                map_chart_list.append(map_chart)
    return map_chart_list


def migration():
    data = list(getData("""SELECT map_name, `value` FROM (SELECT source_province_name, target_province_name, `value`
                    FROM migrate_data_2017 WHERE source_province_name="湖北省") as a
                    JOIN area_china ON a.target_province_name=area_china.area_name;"""))
    migrate_list = []
    for i in data:
        migrate_list.append(['湖北', i[0], i[1]])
    return migrate_list


# def get_chart_city_map_data():
#     city_map_dict = {}
#     map_data = json.loads(get_trend_data())
#     city_data = map_data['data']['areaTree'][0]
#     special = ['北京', '天津', '上海', '重庆', '香港', '澳门']
#     for data in city_data['children']:
#         city_list = []
#         if data['name'] in special:
#             for inner_data in data['children']:
#                 if '区' in inner_data['name']:
#                     city_list.append({'name': inner_data['name'], 'value': inner_data['total']['confirm']})
#                 else:
#                     city_list.append({'name': inner_data['name'] + '区', 'value': inner_data['total']['confirm']})
#         else:
#             for inner_data in data['children']:
#                 city_list.append({'name': inner_data['name'], 'value': inner_data['total']['confirm']})
#         city_map_dict[data['name']] = city_list
#     return city_map_dict


# 响应体
