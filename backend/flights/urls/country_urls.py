from django.urls import path

from flights.views import *


urlpatterns = [
    path('countries/', views_country.get_all_countries, name='countries'),
    path('countries/<str:pk>/', views_country.get_country, name='country'),
]