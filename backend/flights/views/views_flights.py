from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated

from facades.facade_base import facade_base


# --------------------------------------------- #
# ------------- View All Airlines ------------- #
# --------------------------------------------- #
@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_airlines(request):
    return facade_base.get_all_airlines()


# --------------------------------------------- #
# -------------- Airline Flights -------------- #
# --------------------------------------------- #
@api_view(['GET'])
@permission_classes([AllowAny])
def get_airline_flights(request, pk):
    return facade_base.get_flight_by_airline(request, pk)


# --------------------------------------------- #
# -------------- Airline Details -------------- #
# --------------------------------------------- #
@api_view(['GET'])
@permission_classes([AllowAny])
def get_airline(request, pk):
    return facade_base.get_airline_by_id(request, pk)


# --------------------------------------------- #
# ----------- Airline By Parameters ----------- #
# --------------------------------------------- #
@api_view(['POST'])
@permission_classes([AllowAny])
def get_airline_by_parameters(request):
    return facade_base.get_airline_by_parameters(request)


# --------------------------------------------- #
# ------------ View All Countries ------------- #
# --------------------------------------------- #
@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_countries(request):
    return facade_base.get_all_countries()


# --------------------------------------------- #
# -------------- Country Details -------------- #
# --------------------------------------------- #
@api_view(['GET'])
@permission_classes([AllowAny])
def get_country(request, pk):
    return facade_base.get_country_by_id(request, pk)


# --------------------------------------------- #
# ------------- Country Airlines -------------- #
# --------------------------------------------- #
@api_view(['GET'])
@permission_classes([AllowAny])
def get_country_airlines(request, pk):
    return facade_base.get_country_airlines(request, pk)


# --------------------------------------------- #
# ---------- Country Origin Flights ----------- #
# --------------------------------------------- #
@api_view(['GET'])
@permission_classes([AllowAny])
def get_country_origin_flights(request, pk):
    return facade_base.get_country_origin_flights(request, pk)


# --------------------------------------------- #
# ----- Country Origin Flights - 12 Hours ----- #
# --------------------------------------------- #
@api_view(['GET'])
@permission_classes([AllowAny])
def get_departure_flights(request, pk):
    return facade_base.get_departure_flights(request, pk)


# --------------------------------------------- #
# --- Country Destination Flights - 12 Hours -- #
# --------------------------------------------- #
@api_view(['GET'])
@permission_classes([AllowAny])
def get_arrival_flights(request, pk):
    return facade_base.get_arrival_flights(request, pk)


# --------------------------------------------- #
# -------- Country Destination Flights -------- #
# --------------------------------------------- #
@api_view(['GET'])
@permission_classes([AllowAny])
def get_country_destination_flights(request, pk):
    return facade_base.get_country_destination_flights(request, pk)


# --------------------------------------------- #
# -------------- View All Flights ------------- #
# --------------------------------------------- #
@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_flights(request):
    return facade_base.get_all_flights()


# --------------------------------------------- #
# -------------- Flight Details --------------- #
# --------------------------------------------- #
@api_view(['GET'])
@permission_classes([AllowAny])
def get_flight(request, pk):
    return facade_base.get_flight_by_id(pk)


# --------------------------------------------- #
# ----------- Flights By Parameters ----------- #
# --------------------------------------------- #
@api_view(['POST'])
@permission_classes([AllowAny])
def get_flights_by_parameters(request):
    return facade_base.get_flights_by_paremeters(request)