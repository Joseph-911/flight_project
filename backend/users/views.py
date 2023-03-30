from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes, renderer_classes, parser_classes
from rest_framework.permissions import AllowAny, IsAuthenticated


from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.renderers import MultiPartRenderer, JSONRenderer

from rest_framework.authtoken.models import Token


from users.serializers import *
from facades.facade_base import facade_base

from utils.decorators import *

# Create your views here.

# --------------------------------------------- # 
# ------------------- Login ------------------- # 
# --------------------------------------------- #
@api_view(['POST', 'GET'])
@permission_classes([AllowAny])
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
@parser_classes([MultiPartParser, FormParser])
@permission_classes([AllowAny])
@unauthenticated_user_only
def user_register(request):
    return facade_base.create_new_user(request)


# --------------------------------------------- # 
# ---------------- User Details --------------- # 
# --------------------------------------------- # 
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
@api_view(['GET'])
def user_details(request):
    serializer = UserDetailsSerializer(request.user)
    return Response(serializer.data)


# --------------------------------------------- # 
# ------------------ Profile ------------------ # 
# --------------------------------------------- # 
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
@api_view(['GET'])
def user_role(request):
    serializer = UserRoleSerializer(request.user)
    return Response(serializer.data)



# --------------------------------------------- # 
# --------------------------------------------- # 
# --------------------------------------------- # 
@api_view(['POST', 'GET'])
def user_is_auth(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            serializer = UserExistedToken(request.user)
            return Response(serializer.data)
        else:
            return Response({'message': 'not authenticated'})
