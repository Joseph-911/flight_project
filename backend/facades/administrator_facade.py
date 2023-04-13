from django.db import transaction
from django.contrib.auth.hashers import make_password

from rest_framework import status
from rest_framework.response import Response

from facades.facade_base import FacadeBase

from users.models import User
from users.serializers import *
from flights.models import *
from flights.serializers import *

class AdministratorFacade(FacadeBase):

    # --------------------------------------------- # 
    # ------------- Get User No Role -------------- # 
    # --------------------------------------------- # 
    def get_users_no_role(self):
        users = self.dal.read_object_filter_by(User, {'user_role': None})
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


    # --------------------------------------------- # 
    # ------------------ Get User ----------------- # 
    # --------------------------------------------- # 
    def get_user(self, pk):
        user = self.dal.read_object(User, pk)
        if (user == None):
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

    # --------------------------------------------- # 
    # ---------------- Get Country ---------------- # 
    # --------------------------------------------- # 
    def get_country(self, pk):
        country = self.dal.read_object(Country, pk)
        if (country == None):
            return Response({'error': 'Country not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = CountrySerializer(country)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

    # --------------------------------------------- # 
    # --------------- Get All Users --------------- # 
    # --------------------------------------------- # 
    def get_all_users(self, request):
        users = []
        
        if request.method == 'GET':
            users = self.dal.read_all_objects(User)
        if request.method == 'POST':
            if 'search_query' in request.data:
                users = self.dal.read_objects_filter_username(User, request.data['search_query'])                

        serializer = UserSerializer(users, many=True)   
        return Response(serializer.data)
    

    # --------------------------------------------- # 
    # ------------ Get All Customers -------------- # 
    # --------------------------------------------- # 
    def get_all_customers(self, request):
        customers = []

        if request.method == 'GET':
            customers = self.dal.read_all_objects(Customer)
        if request.method == 'POST':
            customers = self.dal.read_objects_filter_username(Customer, request.data['search_query'])

        serializer = CustomerSerializer(customers, many=True)
        return Response(serializer.data)
    

    # --------------------------------------------- # 
    # --------- Get All Airline Companies --------- # 
    # --------------------------------------------- # 
    def get_all_airlinecompanies(self, request):
        airlines = []

        if request.method == 'GET':
            airlines = self.dal.read_all_objects(AirlineCompany)
        if request.method == 'POST':
            if 'search_query' in request.data:
                airlines = self.dal.read_objects_filter_username(AirlineCompany, request.data['search_query'])

        serializer = AirlineCompanySerializer(airlines, many=True)
        return Response(serializer.data)
    

    # --------------------------------------------- # 
    # ----------- Get All Administrators ---------- # 
    # --------------------------------------------- # 
    def get_all_administrators(self, request):
        administrators = []

        if request.method == 'GET':
            administrators = self.dal.read_all_objects(Administrator)
        if request.method == 'POST':
            if 'search_query' in request.data:
                administrators = self.dal.read_objects_filter_username(Administrator, request.data['search_query'])

        serializer = AdministratorSerializer(administrators, many=True)
        return Response(serializer.data)
        

    # --------------------------------------------- # 
    # ------------- Get All Countries ------------- # 
    # --------------------------------------------- # 
    def get_all_countries(self, request):
        countries = []

        if request.method == 'GET':
            countries = self.dal.read_all_objects(Country)
        if request.method == 'POST':
            if 'search_query' in request.data:
                countries = self.dal.read_objects_filter_name(Country, request.data['search_query'])

        serializer = CountrySerializer(countries, many=True)
        return Response(serializer.data)
    

    # --------------------------------------------- # 
    # ---------------- Add Customer --------------- # 
    # --------------------------------------------- #
    def add_customer(self, request):
        pass
        
    
    # --------------------------------------------- # 
    # ---------------- Add Airline ---------------- # 
    # --------------------------------------------- #
    def add_airline(self, request):
        if 'user_id' in request.data:
            serializer = AirlineCompanySerializer(data=request.data)
            # Check if serializer is valid
            serializer.is_valid(raise_exception=True)
            validated_data = serializer._validated_data

            # Get the user and the country
            user = self.dal.read_object_by(User, 'id', validated_data['user_id'])
            country = self.dal.read_object_by(Country, 'id', validated_data['country_id'])
            # Assign the values to the validated data 
            validated_data['user_id'] = user
            validated_data['country_id'] = country
            validated_data['name'] = validated_data['name'].title()

            # Get airline company role (object)
            role = self.dal.read_object_by(UserRole, 'role_name', 'airline company')
            # Update the user role
            self.dal.update_object(user, {'user_role': role})
            # Create airline company object
            self.dal.create_object(AirlineCompany, validated_data)

            return Response({'message': 'Airline company added successfully'}, status=status.HTTP_200_OK)
        elif 'username' in request.data:
                data = request.data.dict()
                airline_fields = {'name': data.pop('name').title(), 'country_id': data.pop('country_id')}
                user_fields = data

                with transaction.atomic():
                    # Get username, email and password from request data
                    username = user_fields['username'].lower()
                    email = user_fields['email'].lower()
                    password = user_fields['password1']
                    hashed_password = make_password(password)

                    # Create user 
                    user_serializer = UserRegisterSerializer(data=user_fields)
                    user_serializer.is_valid(raise_exception=True)
                    user = self.dal.create_object(User, {'username': username, 'email': email, 'password': hashed_password})

                    # Create airline company
                    airline_fields['user_id'] = str(user.id)
                    airline_serializer = AirlineCompanySerializer(data=airline_fields)
                    airline_serializer.is_valid(raise_exception=True)
                    airline_fields['user_id'] = user
                    airline_fields['country_id'] = self.dal.read_object(Country, airline_fields['country_id'])
                    self.dal.create_object(AirlineCompany, airline_fields)

                    # Update user (role and thumbnail if found)
                    role = self.dal.read_object_by(UserRole, 'role_name', 'airline company')
                    self.dal.update_object(user, {'user_role': role})     
                    if 'thumbnail' in user_fields:
                        self.dal.update_object(user, {'thumbnail': user_fields['thumbnail']})
                    
                return Response({'message': 'User airline company created successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Error during creating an airline'}, status=status.HTTP_400_BAD_REQUEST)


    # --------------------------------------------- # 
    # ------------- Add Administrator ------------- # 
    # --------------------------------------------- # 
    def add_administrator(self, request):
        if 'user_id' in request.data:
            # Check if serializer is valid
            serializer = AdministratorSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            validated_data = serializer._validated_data
            
            # Update the validated data
            user = self.dal.read_object_by(User, 'id', validated_data['user_id'])
            validated_data['user_id'] = user
            validated_data['first_name'] = validated_data['first_name'].title()
            validated_data['last_name'] = validated_data['last_name'].title()

            # Update user role and create Administrator object
            role = self.dal.read_object_by(UserRole, 'role_name', 'admin')
            self.dal.update_object(user, {'user_role': role})
            self.dal.create_object(Administrator, validated_data)

            return Response({'message': 'Administrator added successfully'}, status=status.HTTP_200_OK)
        elif 'username' in request.data:
            data = request.data.dict()
            admin_fields = {'first_name': data.pop('first_name').title(), 'last_name': data.pop('last_name').title()}
            user_fields = data

            with transaction.atomic():
                # Get username, email and password from request data
                username = user_fields['username'].lower()
                email = user_fields['email'].lower()
                password = user_fields['password1']
                hashed_password = make_password(password)

                # Create user 
                user_serializer = UserRegisterSerializer(data=user_fields)
                user_serializer.is_valid(raise_exception=True)
                user = self.dal.create_object(User, {'username': username, 'email': email, 'password': hashed_password})

                # Create administrator
                admin_fields['user_id'] = str(user.id)
                admin_serializer = AdministratorSerializer(data=admin_fields)
                admin_serializer.is_valid(raise_exception=True)
                admin_fields['user_id'] = user
                self.dal.create_object(Administrator, admin_fields)

                # Update user (role and thumbnail if found)
                role = self.dal.read_object_by(UserRole, 'role_name', 'admin')
                self.dal.update_object(user, {'user_role': role})
                if 'thumbnail' in user_fields:
                    self.dal.update_object(user, {'thumbnail': user_fields['thumbnail']})

            return Response({'message': 'User administrator created successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Error during creating an administrator'}, status=status.HTTP_400_BAD_REQUEST)

    
    # --------------------------------------------- # 
    # ---------------- Add Country ---------------- # 
    # --------------------------------------------- # 
    def add_country(self, request):
        serializer = CountryCreationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            validated_data = serializer.validated_data
            validated_data['name'] = validated_data['name'].title()
            self.dal.create_object(Country, validated_data)
            return Response({'message': 'Country added successfully'}, status=status.HTTP_200_OK)
        return Response({'message': 'not valid'}, status=status.HTTP_400_BAD_REQUEST)



administrator_facade = AdministratorFacade()