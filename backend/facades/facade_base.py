import base64

from django.contrib.auth import authenticate, login, logout, get_user_model

from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import MethodNotAllowed

from PIL import Image
from io import BytesIO

from dal.dal import GenericDAL
from users.serializers import *
from utils.validators import *
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
                response = Response(serializer.data['token'], status=status.HTTP_200_OK)
                response.set_cookie(key='user', value=serializer.data['token'])
                return response
            else:
                return Response({'message': 'Username or password is incorrect'}, status=status.HTTP_401_UNAUTHORIZED)
    

    # --------------------------------------------- # 
    # ------------------ Logout ------------------- # 
    # --------------------------------------------- # 
    def user_logout(self, request):
        if request.method == 'POST':
            logout(request)
            response = Response({'message': 'User logged out'}) 
            response.set_cookie(key='user', value='', max_age=0, expires=0)
            return response
  

    # --------------------------------------------- # 
    # -------------- Create New User -------------- # 
    # --------------------------------------------- # 
    def create_new_user(self, request):
        if request.method == 'POST':
            serializer = UserRegisterSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                validated_data = serializer.validated_data
                username = validated_data['username'].lower()
                email = validated_data['email'].lower()
                password = validated_data['password1']
                user = self.dal.create_object(User, {'username': username, 'email': email, 'password': password})

                if 'thumbnail' in validated_data:
                    thumbnail = validated_data['thumbnail']
                    self.dal.update_object(user, {'thumbnail': thumbnail})
                return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)

            return Response({'error': 'An error during registeration'}, status=status.HTTP_400_BAD_REQUEST)  


    # --------------------------------------------- # 
    # ---------------- All Airlines --------------- # 
    # --------------------------------------------- #
    def get_all_airlines(self):
        airlines = self.dal.read_all_objects(AirlineCompany)
        serializer = AirlineCompanySerializer(airlines, many=True)
        return Response(serializer.data)


    # --------------------------------------------- # 
    # ---------------- Get Airline ---------------- # 
    # --------------------------------------------- # 
    def get_airline_by_id(self, request, pk):
        airline = self.dal.read_object(AirlineCompany, pk)

        if request.method == 'GET':
            if airline:
                serializer = AirlineCompanySerializer(airline)
                return Response(serializer.data)
            else:
                return Response({'message': 'No airline company found'}, status=status.HTTP_404_NOT_FOUND)
    
    
    # --------------------------------------------- # 
    # --------------- All Countries --------------- # 
    # --------------------------------------------- # 
    def get_all_countries(self):
        countries = self.dal.read_all_objects(Country)
        serializer = CountrySerializer(countries, many=True)
        return Response(serializer.data)


    # --------------------------------------------- # 
    # ---------------- Get Country ---------------- # 
    # --------------------------------------------- # 
    def get_country_by_id(self, request, pk):
        country = self.dal.read_object(Country, pk)

        if request.method == 'GET':
            if country:
                serializer = CountrySerializer(country)
                return Response(serializer.data)
            else:
                return Response({'message': 'No country found'}, status=status.HTTP_404_NOT_FOUND)


    # --------------------------------------------- #
    # ------------ Get Country Airlines ----------- #
    # --------------------------------------------- #
    def get_country_airlines(self, request, pk):
        airlines = self.dal.get_airlines_by_county(pk)
        if airlines is not None:
            serializer = AirlineCompanySerializer(airlines, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'message': 'Country not found'}, status=status.HTTP_404_NOT_FOUND)
    

    # --------------------------------------------- #
    # -------- Get Country Origin Flights --------- #
    # --------------------------------------------- #
    def get_country_origin_flights(self, request, pk):
        flights = self.dal.get_flights_by_origin_country_id(pk)
        if flights is not None:
            serializer = FlightSerializer(flights, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'message': 'Country not found'}, status=status.HTTP_404_NOT_FOUND)


    # --------------------------------------------- #
    # ------ Get Country Destination Flights ------ #
    # --------------------------------------------- #
    def get_country_destination_flights(self, request, pk):
        flights = self.dal.get_flights_by_destination_country_id(pk)
        if flights is not None:
            serializer = FlightSerializer(flights, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'message': 'Country not found'}, status=status.HTTP_404_NOT_FOUND)


    # --------------------------------------------- # 
    # ---------------- All Flights ---------------- # 
    # --------------------------------------------- #
    def get_all_flights(self):
        countries = self.dal.read_all_objects(Flight)
        serializer = FlightSerializer(countries, many=True)
        return Response(serializer.data)


facade_base = FacadeBase()