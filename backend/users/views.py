from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated

from users.serializers import *
from facades.facade_base import facade_base

# Create your views here.

# --------------------------------------------- # 
# ------------------- Login ------------------- # 
# --------------------------------------------- # 
@api_view(['POST'])
@permission_classes([AllowAny])
@authentication_classes([SessionAuthentication])
def user_login(request):
    return facade_base.user_login(request)


# --------------------------------------------- # 
# ------------------- Logout ------------------ # 
# --------------------------------------------- # 
@authentication_classes([IsAuthenticated])
@api_view(['POST'])
def user_logout(request):
    return facade_base.user_logout(request)