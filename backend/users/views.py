from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated

from users.serializers import *
from facades.facade_base import facade_base

from utils.decorators import *

# Create your views here.

# --------------------------------------------- # 
# ------------------- Login ------------------- # 
# --------------------------------------------- #
@api_view(['POST', 'GET'])
@unauthenticated_user_only 
def user_login(request):
    return facade_base.user_login(request)


# --------------------------------------------- # 
# ------------------- Logout ------------------ # 
# --------------------------------------------- # 
@authentication_classes([IsAuthenticated])
@api_view(['POST'])
def user_logout(request):
    return facade_base.user_logout(request)


# --------------------------------------------- # 
# ------------------ Register ----------------- # 
# --------------------------------------------- # 
@api_view(['POST', 'GET'])
@unauthenticated_user_only
def user_register(request):
    return facade_base.create_new_user(request)


@api_view(['GET'])
def check_auth(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            return Response({'auth': True})
        else:
            return Response({'auth': False})