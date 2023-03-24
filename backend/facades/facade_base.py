from django.contrib.auth import authenticate, login, logout

from rest_framework import status
from rest_framework.response import Response

from dal.dal import GenericDAL
from users.serializers import *
from flights.models import *
from flights.serializers import *


class FacadeBase:
    
    def __init__(self):
        self.dal = GenericDAL()

    # --------------------------------------------- # 
    # ------------------- Login ------------------- # 
    # --------------------------------------------- # 
    def user_login(self, request):
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
    

    # --------------------------------------------- # 
    # ------------------ Logout ------------------- # 
    # --------------------------------------------- # 
    def user_logout(self, request):
        if request.method == 'POST':
            logout(request)
            return Response({'message': 'User logged out'})
        
    
    # --------------------------------------------- # 
    # --------------- All Countries --------------- # 
    # --------------------------------------------- # 
    def get_all_countries(self, request):
        countries = self.dal.read_all_objects(Country)
        serializer = CountrySerializer(countries, many=True)
        return Response(serializer.data)



facade_base = FacadeBase()