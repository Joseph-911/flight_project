from django.urls import path
from users import views

urlpatterns = [
    # Basic
    path('login/', views.user_login, name='login'),
    path('logout/', views.user_logout, name='logout'),
    path('register/', views.user_register, name='register'),
    # Users
    path('user-details/', views.user_details, name='user-details'),
    path('user-role/', views.user_role, name='user-role'),
]