from django.urls import path, include


urlpatterns = [
    path('', include('flights.urls.flights_urls')),
    path('', include('flights.urls.roles_urls')),
]