from django.urls import path, include

from flights.views import views_administrator


administrator_url_patterns = [
    path('users/', views_administrator.view_all_users, name='users-list'),
]


roles_urls = [
    path('administrator/', include(administrator_url_patterns)),
]


urlpatterns = [
    path('profile/', include(roles_urls)),
]