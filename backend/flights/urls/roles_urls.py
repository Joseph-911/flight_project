from django.urls import path, include

from flights.views import views_administrator


administrator_url_patterns = [
    # Users
    path('users/', views_administrator.view_all_users, name='users-list'),
    path('user/<str:pk>', views_administrator.view_user, name='user'),
    # Customers
    path('customers/', views_administrator.view_all_customers, name='customers-list'),
    # Airlines
    path('airlines/', views_administrator.view_all_airlines, name='airlines-list'),
    # Administrators
    path('administrators/', views_administrator.view_all_administrators, name='administrators-list'),
    # Countries
    path('countries/', views_administrator.view_all_countries, name='countries-list'),
    path('country/<str:pk>/', views_administrator.view_country, name='country-details')
]


roles_urls = [
    path('administrator/', include(administrator_url_patterns)),
]


urlpatterns = [
    path('profile/', include(roles_urls)),
]