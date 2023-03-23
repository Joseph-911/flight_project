from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout

from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from users.serializers import *

# Create your views here.

# --------------------------------------------- # 
# ------------------- Login ------------------- # 
# --------------------------------------------- # 
@api_view(['POST'])
@permission_classes([AllowAny])
@authentication_classes([SessionAuthentication])
def user_login(request):
    if request.method == 'POST':
        data = request.data
        username = data['username']
        password = data['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            serializer = UserWithTokenSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Username or password is incorrect'})
