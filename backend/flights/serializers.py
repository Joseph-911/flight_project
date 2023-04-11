from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.http import JsonResponse

from flights.models import *
from users.models import *
from utils.validators import *


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'


class CountryCreationSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True, max_length=25, validators=[validate_country])
    flag = serializers.ImageField(required=False, validators=[validate_image_field])

    class Meta:
        model = Country
        fields = ['name', 'flag']


    def create(self, validated_data):
        validated_data['name'] = validated_data['name'].title()
        return super().create(validated_data)
    

class FlightSerializer(serializers.ModelSerializer):
    from_to = serializers.SerializerMethodField()
    tickets_sold = serializers.SerializerMethodField()
    flight_duration = serializers.SerializerMethodField()
    formatted_departure_date = serializers.SerializerMethodField()
    formatted_landing_date = serializers.SerializerMethodField()
    formatted_departure_time = serializers.SerializerMethodField()
    formatted_landing_time = serializers.SerializerMethodField()
    formatted_departure_datetime = serializers.SerializerMethodField()
    formatted_landing_datetime = serializers.SerializerMethodField()
    origin_country = serializers.SerializerMethodField()
    destination_country = serializers.SerializerMethodField()
    airline_company = serializers.SerializerMethodField()
    airline_company_thumbnail = serializers.CharField(source='airline_company_id.user_id.thumbnail.url')

    class Meta:
        model = Flight
        fields = '__all__'

    def get_origin_country(self, obj):
        return obj.origin_country_id.name
    
    def get_destination_country(self, obj):
        return obj.destination_country_id.name
    
    def get_airline_company(self, obj):
        return obj.airline_company_id.name

    def get_from_to(self, obj):
        return obj.get_from_to()

    def get_tickets_sold(self, obj):
        return obj.get_tickets_sold()

    def get_flight_duration(self, obj):
        return obj.get_flight_duration()

    def get_formatted_departure_date(self, obj):
        return obj.formatted_departure_date()

    def get_formatted_landing_date(self, obj):
        return obj.formatted_landing_date()

    def get_formatted_departure_time(self, obj):
        return obj.formatted_departure_time()

    def get_formatted_landing_time(self, obj):
        return obj.formatted_landing_time()

    def get_formatted_departure_datetime(self, obj):
        return obj.formatted_departure_datetime()

    def get_formatted_landing_datetime(self, obj):
        return obj.formatted_landing_datetime()
    


class FlightCreationSerializer(serializers.ModelSerializer):
    airline_company_id = serializers.CharField(required=True, validators=[validate_airline_id])
    origin_country_id = serializers.CharField(required=True, validators=[validate_country_id])
    destination_country_id = serializers.CharField(required=True, validators=[validate_country_id])
    departure_time = serializers.DateTimeField(input_formats=['%Y-%m-%dT%H:%M'], validators=[validate_time_is_future])
    landing_time = serializers.DateTimeField(input_formats=['%Y-%m-%dT%H:%M'], validators=[validate_time_is_future])
    price = serializers.IntegerField(validators=[validate_number_positive])
    remaining_tickets = serializers.IntegerField(validators=[validate_number_positive])

    class Meta:
        model = Flight
        fields = ['airline_company_id', 'origin_country_id', 'destination_country_id', 'departure_time', 'landing_time', 'price', 'remaining_tickets']


    def validate(self, data):
        data = super().validate(data)
        departure_time = data['departure_time']
        landing_time = data['landing_time']

        validate_time_gap(departure_time, 'departure_time', landing_time, 'landing_time')
        validate_time_duration(departure_time, landing_time, 'landing_time', 1, 18)
        return data

    def create(self, validated_data):
        validated_data['airline_company_id'] = AirlineCompany.objects.get(id=validated_data['airline_company_id'])
        validated_data['origin_country_id'] = Country.objects.get(id=validated_data['origin_country_id'])
        validated_data['destination_country_id'] = Country.objects.get(id=validated_data['destination_country_id'])
        return super().create(validated_data)
    
class AirlineCompanySerializer(serializers.ModelSerializer):
    flight_count = serializers.SerializerMethodField()
    country_name = serializers.CharField(source='country_id.name')
    user_thumbnail = serializers.ImageField(source='user_id.thumbnail')
    username = serializers.CharField(source='user_id.username')

    class Meta:
        model = AirlineCompany
        fields = '__all__'

    def get_flight_count(self, obj):
        return obj.flight_set.count()


class CustomerSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    username = serializers.CharField(source='user_id.username')

    class Meta:
        model = Customer
        fields = '__all__'

    def get_full_name(self, obj):
        return f'{obj.first_name} {obj.last_name}'
    

class AdministratorSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    username = serializers.CharField(source='user_id.username')
    is_superuser = serializers.CharField(source='user_id.is_superuser')

    class Meta:
        model = Administrator
        fields = '__all__'

    def get_full_name(self, obj):
        return f'{obj.first_name} {obj.last_name}'
    


class AirlineCompanyCreationSerializer(serializers.ModelSerializer):
    user_id = serializers.CharField(required=True, validators=[validate_user_id])
    name = serializers.CharField(required=True, max_length=30, validators=[validate_name_length, validate_name_with_alphabetical, UniqueValidator(queryset=AirlineCompany.objects.all())])
    country_id = serializers.CharField(required=True, validators=[validate_country_id])

    class Meta:
        model = AirlineCompany
        fields = ['user_id', 'name', 'country_id']

    def create(self, validated_data):
        user = User.objects.get(id=validated_data.get('user_id'))
        country = Country.objects.get(id=validated_data.get('country_id'))
        name = validated_data.get('name')

        name = name.title()
        user.user_role = UserRole.objects.get(role_name='airline company')
        user.save()

        airline_company = AirlineCompany(user_id=user, country_id=country, name=name)
        airline_company.save()
        return airline_company
        
    
    def update(self, instance, validated_data):
        if validated_data['name']:
            validated_data['name'] = validated_data['name'].title()
        if validated_data['country_id']:
            validated_data['country_id'] = Country.objects.get(id=validated_data.get('country_id'))

        return super().update(instance, validated_data)
    

class AdministratorCreationSerializer(serializers.ModelSerializer):
    user_id = serializers.CharField(required=True, validators=[validate_user_id])
    first_name = serializers.CharField(required=True, max_length=30, validators=[validate_name, validate_name_length])
    last_name = serializers.CharField(required=True, max_length=30, validators=[validate_name, validate_name_length])

    class Meta:
        model = Administrator
        fields = ['user_id', 'first_name', 'last_name'] 

    def create(self, validated_data):
        user = User.objects.get(id=validated_data.get('user_id'))
        first_name = validated_data.get('first_name')
        last_name = validated_data.get('last_name')

        first_name = first_name.title()
        last_name = last_name.title()
        user.user_role = UserRole.objects.get(role_name='admin')
        user.save()

        administrator = Administrator(user_id=user, first_name=first_name, last_name=last_name)
        administrator.save()
        return administrator