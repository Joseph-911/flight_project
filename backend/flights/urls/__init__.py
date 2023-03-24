from django.urls import path, include


urlpatterns = [
    path('', include('flights.urls.country_urls')),
]