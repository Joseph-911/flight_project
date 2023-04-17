from rest_framework.decorators import api_view

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


# --------------------------------------------- #
# ----------------- View User ----------------- #
# --------------------------------------------- #
@api_view(['GET'])
@user_has_permission('view_user')
def view_user(request, pk):
    return administrator_facade.get_user(pk)


# --------------------------------------------- #
# ------------- View Users No Role ------------ #
# --------------------------------------------- #
@api_view(['GET'])
@user_has_permission('view_user')
def view_user_no_role(request):
    return administrator_facade.get_users_no_role()


# --------------------------------------------- #
# ---------------- View Country --------------- #
# --------------------------------------------- #
@api_view(['GET'])
@user_has_permission('view_country')
def view_country(request, pk):
    return administrator_facade.get_country_by_id(request, pk)


# --------------------------------------------- #
# ---------------- Add Customer --------------- #
# --------------------------------------------- #
@api_view(['POST'])
@user_has_permission('add_customer')
def add_customer(request):
    return administrator_facade.add_customer(request)


# --------------------------------------------- #
# ----------------- Add Airline --------------- #
# --------------------------------------------- #
@api_view(['POST'])
@user_has_permission('add_airlinecompany')
def add_airline(request):
    return administrator_facade.add_airline(request)


# --------------------------------------------- #
# ------------- Add Administrator ------------- #
# --------------------------------------------- #
@api_view(['POST'])
@user_has_permission('add_administrator')
def add_administrator(request):
    return administrator_facade.add_administrator(request)


# --------------------------------------------- #
# ---------------- Add Country ---------------- #
# --------------------------------------------- #
@api_view(['POST'])
@user_has_permission('add_country')
def add_country(request):
    return administrator_facade.add_country(request)


# --------------------------------------------- #
# ---------------- Remove User ---------------- #
# --------------------------------------------- #
@api_view(['POST'])
@user_has_permission('delete_user')
def remove_user(request, pk):
    return administrator_facade.remove_user(request, pk)


# --------------------------------------------- #
# -------------- Remove Customer -------------- #
# --------------------------------------------- #
@api_view(['POST'])
@user_has_permission('delete_customer')
def remove_customer(request, pk):
    return administrator_facade.remove_customer(pk)


# --------------------------------------------- #
# --------------- Remove Airline -------------- #
# --------------------------------------------- #
@api_view(['POST'])
@user_has_permission('delete_airlinecompany')
def remove_airline(request, pk):
    return administrator_facade.remove_airline(pk)


# --------------------------------------------- #
# ------------ Remove Administrator ----------- #
# --------------------------------------------- #
@api_view(['POST'])
@user_has_permission('delete_airlinecompany')
def remove_administrator(request, pk):
    return administrator_facade.remove_administrator(request, pk)