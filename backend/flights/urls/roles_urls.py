from django.urls import path, include

from flights.views import views_administrator, views_airline, views_customer, views_anonymous


administrator_url_patterns = [
    # Users
    path('users/', views_administrator.view_all_users, name='users-list'),
    path('users/no-role/', views_administrator.view_user_no_role, name='users-list-no-role'),
    path('user/<str:pk>/', views_administrator.view_user, name='user'),
    path('users/delete/<str:pk>/', views_administrator.remove_user, name='remove-user'),
    # Customers
    path('customers/', views_administrator.view_all_customers, name='customers-list'),
    path('customers/add/', views_administrator.add_customer, name='add-customer'),
    path('customers/delete/<str:pk>/', views_administrator.remove_customer, name='remove-customer'),
    # Airlines
    path('airlines/', views_administrator.view_all_airlines, name='airlines-list'),
    path('airlines/add/', views_administrator.add_airline, name='add-airline'),
    path('airlines/delete/<str:pk>/', views_administrator.remove_airline, name='remove-airline'),
    # Administrators
    path('administrators/', views_administrator.view_all_administrators, name='administrators-list'),
    path('administrators/add/', views_administrator.add_administrator, name='add-administrator'),
    path('administrators/delete/<str:pk>/', views_administrator.remove_administrator, name='remove-administrator'),
    # Countries
    path('countries/', views_administrator.view_all_countries, name='countries-list'),
    path('countries/add/', views_administrator.add_country, name='add-country'),
    path('country/<str:pk>/', views_administrator.view_country, name='country-details')
]


airline_url_patterns = [
    path('edit/', views_airline.update_airline, name='update-airline'),
    path('flights/', views_airline.view_my_flights, name='company-all-flights'),
    path('flights/<str:pk>/edit/', views_airline.update_flight, name='company-flight-edit'),
    path('flights/add/', views_airline.add_flight, name='add-flight'),
]

customer_url_patterns = [
    path('tickets/', views_customer.get_my_tickets, name='customer-all-tickets'),
    path('tickets/<str:pk>/add/', views_customer.add_ticket, name='add-ticket'),
]

anonymous_url_patterns = [
    path('create-customer/', views_anonymous.create_customer, name='create-customer'),
]

roles_urls = [
    path('administrator/', include(administrator_url_patterns)),
    path('airline/', include(airline_url_patterns)),
    path('customer/', include(customer_url_patterns)),
]


urlpatterns = [
    path('profile/', include(roles_urls)),
    path('', include(anonymous_url_patterns))
]