from rest_framework.decorators import api_view

from facades.airline_facade import airline_facade
from utils.decorators import *

# --------------------------------------------- #
# -------------- Update Airline --------------- #
# --------------------------------------------- #
@api_view(['GET','PUT'])
@user_has_permission('change_airlinecompany')
def update_airline(request):
    airline = request.user.airlinecompany
    return airline_facade.update_airline(request, airline)


# --------------------------------------------- #
# ----------------- Add Flight ---------------- #
# --------------------------------------------- #
@api_view(['POST'])
@user_has_permission('add_flight')
def add_flight(request):
    return airline_facade.add_flight(request)


# --------------------------------------------- #
# --------------- Update Flight --------------- #
# --------------------------------------------- #
@api_view(['GET', 'PUT'])
@user_has_permission('change_flight')
def update_flight(request, pk):
    return airline_facade.update_flight(request, pk)


# --------------------------------------------- #
# -------------- Get My Flights --------------- #
# --------------------------------------------- #
@api_view(['GET'])
@user_has_permission('view_flight')
def view_my_flights(request):
    return airline_facade.get_my_flights(request)