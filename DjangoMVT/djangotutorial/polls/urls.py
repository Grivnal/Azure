from django.urls import path

from . import views

app_name = 'polls'

urlpatterns = [
    path('', views.index, name='index'),
    path('register/', views.register, name='register'),
    path('users/', views.list_users, name='list_users'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('posts/', views.PostListView.as_view(), name='post_list'),
    path('posts/create/', views.post_create, name='post_create'),
]