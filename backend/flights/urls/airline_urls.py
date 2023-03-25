from django.urls import path, include

from flights.views import views_airline

urlpatterns = [
    path('airlines/', views_airline.get_all_airlines, name='airlines'),
    path('airlines/<str:pk>/', views_airline.get_airline, name='airline'),
]