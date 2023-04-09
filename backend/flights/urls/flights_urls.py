from django.urls import path

from flights.views import views_flights


urlpatterns = [
    # Countries
    path('countries/', views_flights.get_all_countries, name='countries'),
    path('countries/<str:pk>/', views_flights.get_country, name='country'),
    path('countries/<str:pk>/airlines/', views_flights.get_country_airlines, name='country-airlines'),
    path('countries/<str:pk>/flights/origin/', views_flights.get_country_origin_flights, name='country-origin-flights'),
    path('countries/<str:pk>/flights/destination/', views_flights.get_country_destination_flights, name='country-destination-flights'),
    # Airlines
    path('airlines/', views_flights.get_all_airlines, name='airlines'),
    path('airlines/<str:pk>/', views_flights.get_airline, name='airline'),
    # Flights
    path('flights/', views_flights.get_all_flights, name='flights'),
]