from django.urls import path

from flights.views import views_flights


urlpatterns = [
    # Countries
    path('countries/', views_flights.get_all_countries, name='countries'),
    path('countries/<str:pk>/', views_flights.get_country, name='country'),
    # Airlines
    path('airlines/', views_flights.get_all_airlines, name='airlines'),
    path('airlines/<str:pk>/', views_flights.get_airline, name='airline'),
    # Flights
    path('flights/', views_flights.get_all_flights, name='flights'),
]