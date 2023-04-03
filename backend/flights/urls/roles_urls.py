from django.urls import path, include

from flights.views import views_administrator


administrator_url_patterns = [
    path('users/', views_administrator.view_all_users, name='users-list'),
    path('customers/', views_administrator.view_all_customers, name='customers-list'),
    path('airlines/', views_administrator.view_all_airlines, name='airlines-list'),
    path('countries/', views_administrator.view_all_countries, name='countries-list'),
    path('administrators/', views_administrator.view_all_administrators, name='administrators-list'),
]


roles_urls = [
    path('administrator/', include(administrator_url_patterns)),
]


urlpatterns = [
    path('profile/', include(roles_urls)),
]