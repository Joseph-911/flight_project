from django.urls import path

from flights.views import *


urlpatterns = [
    path('countries/', views_country.get_all_countries, name='countries'),
]