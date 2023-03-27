from django.urls import path
from users import views

urlpatterns = [
    path('login/', views.user_login, name='login'),
    path('logout/', views.user_logout, name='logout'),
    path('register/', views.user_register, name='register'),
    path('check-auth/', views.check_auth, name='check-auth'),
]