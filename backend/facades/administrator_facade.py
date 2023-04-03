from rest_framework import status
from rest_framework.response import Response

from facades.facade_base import FacadeBase

from users.models import User
from users.serializers import *
from flights.models import *
from flights.serializers import *

class AdministratorFacade(FacadeBase):

    def get_user(self, pk):
        user = self.dal.read_object(User, pk)
        if (user == None):
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

    def get_country(self, pk):
        country = self.dal.read_object(Country, pk)
        if (country == None):
            return Response({'error': 'Country not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = CountrySerializer(country)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

    def get_all_users(self, request):
        users = []
        
        if request.method == 'GET':
            users = self.dal.read_all_objects(User)
        if request.method == 'POST':
            if 'search_query' in request.data:
                users = self.dal.read_objects_filter_username(User, request.data['search_query'])                

        serializer = UserSerializer(users, many=True)   
        return Response(serializer.data)
    

    def get_all_customers(self, request):
        customers = []

        if request.method == 'GET':
            customers = self.dal.read_all_objects(Customer)
        if request.method == 'POST':
            customers = self.dal.read_objects_filter_username(Customer, request.data['search_query'])

        serializer = CustomerSerializer(customers, many=True)
        return Response(serializer.data)
    

    def get_all_airlinecompanies(self, request):
        airlines = []

        if request.method == 'GET':
            airlines = self.dal.read_all_objects(AirlineCompany)
        if request.method == 'POST':
            if 'search_query' in request.data:
                airlines = self.dal.read_objects_filter_username(AirlineCompany, request.data['search_query'])

        serializer = AirlineCompanySerializer(airlines, many=True)
        return Response(serializer.data)
    

    def get_all_administrators(self, request):
        administrators = []

        if request.method == 'GET':
            administrators = self.dal.read_all_objects(Administrator)
        if request.method == 'POST':
            if 'search_query' in request.data:
                administrators = self.dal.read_objects_filter_username(Administrator, request.data['search_query'])

        serializer = AdministratorSerializer(administrators, many=True)
        return Response(serializer.data)
        
    
    def get_all_countries(self, request):
        countries = []

        if request.method == 'GET':
            countries = self.dal.read_all_objects(Country)
        if request.method == 'POST':
            if 'search_query' in request.data:
                countries = self.dal.read_objects_filter_name(Country, request.data['search_query'])

        serializer = CountrySerializer(countries, many=True)
        return Response(serializer.data)


administrator_facade = AdministratorFacade()