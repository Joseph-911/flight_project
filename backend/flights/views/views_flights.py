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