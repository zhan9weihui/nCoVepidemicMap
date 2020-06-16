from epidemic_map.mysql_conn import getData


def get_chart1_data():
    # # 绘制二月每日全国数据
    chart1_info = {}
    chart1_date_list = []
    chart1_confirm_list = []
    chart1_heal_list = []
    chart1_dead_list = []
    chart1_today_confirm_list = []
    trend_data = list(getData("""select SUM(confirmed_add) as today_confirm,SUM(confirmed_count) as confirm,
                         SUM(cured_count)as heal,SUM(dead_count) as dead, update_time from covid_data_2017
                          WHERE DAY(update_time) != 13 GROUP BY update_time;"""))
    for date in trend_data:
        chart1_date_list.append(date[4].strftime('%m-%d'))
        chart1_confirm_list.append(int(date[1]))
        chart1_heal_list.append(int(date[2]))
        chart1_dead_list.append(int(date[3]))
        chart1_today_confirm_list.append(int(date[0]))
    chart1_info['x_name'] = chart1_date_list
    chart1_info['confirm'] = chart1_confirm_list
    chart1_info['heal'] = chart1_heal_list
    chart1_info['dead'] = chart1_dead_list
    chart1_info['today_confirm'] = chart1_today_confirm_list
    return chart1_info


def get_chart2_data():
    chart2_info = []
    migra_confirm = list(getData(
        """SELECT `value`, confirmed_count, target_province_name FROM(SELECT migrate_data_2017.target_province_name,
         `value` FROM migrate_data_2017 WHERE source_province_name = '湖北省')as a JOIN (SELECT province_name,
          SUM(confirmed_count) as confirmed_count FROM covid_data_2017 WHERE DAY(update_time)=29 AND 
           province_name != '湖北省' GROUP BY province_name) AS b ON a.target_province_name = b.province_name;"""))
    for data in migra_confirm:
        lists = list(data)
        lists[1] = int(lists[1])
        chart2_info.append(lists)
    return chart2_info


def get_chart3_data():
    data = getData("""SELECT SUM(dead_count)/SUM(confirmed_count) as dead_rate FROM covid_data_2017
                        WHERE DAY(update_time)=29 GROUP BY update_time;""")
    chart3_info = data[0][0] * 100
    return chart3_info


def get_chart4_data():
    gx_everyday_add = list(getData("""SELECT SUM(confirmed_add), update_time FROM covid_data_2017 WHERE
                    province_name = "广西壮族自治区" GROUP BY update_time;"""))
    chart4_info = {}
    days = []
    confirmed_add = []
    for data in gx_everyday_add:
        days.append(data[1].strftime('%m-%d'))
        confirmed_add.append(int(data[0]))
    chart4_info['days'] = days
    chart4_info['today_confirmed'] = confirmed_add
    return chart4_info


def get_chart5_data():
    gx_city_confirm = list(getData("""SELECT SUM(confirmed_count), city_name FROM covid_data_2017 WHERE
                        province_name = "广西壮族自治区" and DAY(update_time)=29 GROUP BY city_name;"""))
    chart5_info = {}
    cities = []
    confirmed_count = []
    for data in gx_city_confirm:
        cities.append(data[1])
        confirmed_count.append(int(data[0]))
        chart5_info['cities'] = cities
        chart5_info['confirmed'] = confirmed_count
    return chart5_info


def get_chart6_data():
    chart6_info = []
    gx_city_confirm = list(getData("""SELECT SUM(confirmed_count), city_name FROM covid_data_2017 WHERE
                        province_name = "广西壮族自治区" and DAY(update_time)=29 GROUP BY city_name;"""))
    for data in gx_city_confirm:
        dic = {'value': int(data[0]), 'name': data[1]}
        chart6_info.append(dic)
        del dic
    return chart6_info
