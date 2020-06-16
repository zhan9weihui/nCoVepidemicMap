"""epidemic URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# from django.contrib import admin
from django.urls import re_path
from epidemic_map import views

# path()函数有两个参数：
# 请求路径，指定为空字符串表示项目首页对应的内容
# 表示调用函数

app_name = '[epidemic1]'
urlpatterns = [
    re_path(r'index$', views.index),
    re_path(r'get_map_data$', views.get_map_data),
    re_path(r'get_chart_data$', views.get_chart_data),
    # re_path(r'get_chart_city_map_data$', views.get_chart_city_map_data),
    re_path(r'ncov_totalcount$', views.ncov_totalcount)
]

