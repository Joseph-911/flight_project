from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated

from facades.facade_base import facade_base


# --------------------------------------------- #
# ------------ View All Countries ------------- #
# --------------------------------------------- #
@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_countries(request):
    return facade_base.get_all_countries(request)


# --------------------------------------------- #
# -------------- Country Details -------------- #
# --------------------------------------------- #
@api_view(['GET'])
@permission_classes([AllowAny])
def get_country(request, pk):
    return facade_base.get_country_by_id(request, pk)