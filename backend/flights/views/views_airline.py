from rest_framework.decorators import api_view

from facades.airline_facade import airline_facade
from utils.decorators import *


# --------------------------------------------- #
# ----------------- Add Flight ---------------- #
# --------------------------------------------- #
@api_view(['POST'])
@user_has_permission('add_flight')
def add_flight(request):
    return airline_facade.add_flight(request)


# --------------------------------------------- #
# -------------- Get My Flights --------------- #
# --------------------------------------------- #
@api_view(['GET'])
@user_has_permission('view_flight')
def view_my_flights(request):
    return airline_facade.get_my_flights(request)