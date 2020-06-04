from django.conf.urls import url
from django.urls import path

from . import views

app_name = 'git_app'

urlpatterns = [

path('register/',views.register,name = 'register'),
path('login/',views.user_login,name = 'user_login'),
path('logout/',views.user_logout,name = 'user_logout'),
path('search/',views.search,name = 'search'),
path('git_user/<str:name>',views.git_user,name = 'git_user'),
path('git_repo/<str:username>/<str:params>/',views.git_repo,name = 'git_repo'),

]
