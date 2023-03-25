from django.urls import path, include


urlpatterns = [
    path('', include('flights.urls.country_urls')),
    path('', include('flights.urls.airline_urls')),
]