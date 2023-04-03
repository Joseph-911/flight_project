from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated

from facades.administrator_facade import administrator_facade
from utils.decorators import *

# --------------------------------------------- #
# --------------- View All Users -------------- #
# --------------------------------------------- #
@api_view(['GET','POST'])
@user_has_permission('view_user')
def view_all_users(request):
    return administrator_facade.get_all_users(request)


# --------------------------------------------- #
# ----------------- View User ----------------- #
# --------------------------------------------- #
@api_view(['GET'])
@user_has_permission('view_user')
def view_user(request, pk):
    return administrator_facade.get_user(pk)


# --------------------------------------------- #
# ------------ View All Customers ------------- #
# --------------------------------------------- #
@api_view(['GET','POST'])
@user_has_permission('view_customer')
def view_all_customers(request):
    return administrator_facade.get_all_customers(request)


# --------------------------------------------- #
# ------------- View All Airlines ------------- #
# --------------------------------------------- #
@api_view(['GET','POST'])
@user_has_permission('view_airlinecompany')
def view_all_airlines(request):
    return administrator_facade.get_all_airlinecompanies(request)


# --------------------------------------------- #
# ---------- View All Administrators ---------- #
# --------------------------------------------- #
@api_view(['GET','POST'])
@user_has_permission('view_administrator')
def view_all_administrators(request):
    return administrator_facade.get_all_administrators(request)


# --------------------------------------------- #
# ------------ View All Countries ------------- #
# --------------------------------------------- #
@api_view(['GET','POST'])
@user_has_permission('view_country')
def view_all_countries(request):
    return administrator_facade.get_all_countries(request)
