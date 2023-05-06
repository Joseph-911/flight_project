from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.http import JsonResponse

from flights.models import *
from users.models import *
from utils.validators import *


# --------------------------------------------- # 
# ------------- Country Serializer ------------ # 
# --------------------------------------------- # 
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


# --------------------------------------------- # 
# ------------- Flight Serializer ------------- # 
# --------------------------------------------- # 
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
    company_id = serializers.SerializerMethodField()
    airline_company_thumbnail = serializers.CharField(source='airline_company_id.user_id.thumbnail.url', read_only=True)

    airline_company_id = serializers.CharField(required=True, validators=[validate_airline_id])
    origin_country_id = serializers.CharField(required=True, validators=[validate_country_id])
    destination_country_id = serializers.CharField(required=True, validators=[validate_country_id])
    departure_time = serializers.DateTimeField(input_formats=['%Y-%m-%dT%H:%M'], validators=[validate_time_is_future])
    landing_time = serializers.DateTimeField(input_formats=['%Y-%m-%dT%H:%M'], validators=[validate_time_is_future])
    price = serializers.IntegerField(validators=[validate_number_positive])
    remaining_tickets = serializers.IntegerField(validators=[validate_number_positive2])

    class Meta:
        model = Flight
        fields = '__all__'

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['origin_country_id'] = instance.origin_country_id.id
        ret['destination_country_id'] = instance.destination_country_id.id
        return ret
    
    def get_company_id(self, obj):
        return obj.airline_company_id.id
    
    def get_origin_country(self, obj):
        return obj.origin_country_id.name

    def get_destination_country(self, obj):
        return obj.destination_country_id.name
    
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
    

    def validate(self, data):
        data = super().validate(data)
        departure_time = data['departure_time']
        landing_time = data['landing_time']

        validate_time_gap(departure_time, 'departure_time', landing_time, 'landing_time')
        validate_time_duration(departure_time, landing_time, 'landing_time', 1, 18)
        return data
    

# --------------------------------------------- # 
# ------------- Ticket Serializer ------------- # 
# --------------------------------------------- # 
class TicketSerializer(serializers.ModelSerializer):
    flight = serializers.SerializerMethodField()

    class Meta:
        model = Ticket
        fields = '__all__'

    def get_flight(self, obj):
        return FlightSerializer(obj.flight_id).data

    
# --------------------------------------------- # 
# -------- Airline Company Serializer --------- # 
# --------------------------------------------- # 
class AirlineCompanySerializer(serializers.ModelSerializer):
    flight_count = serializers.SerializerMethodField()
    user_thumbnail = serializers.ImageField(source='user_id.thumbnail', read_only=True)
    country_name = serializers.CharField(source='country_id.name', read_only=True)
    username = serializers.CharField(source='user_id.username', read_only=True)

    user_id = serializers.CharField(required=True, validators=[validate_user_id])
    name = serializers.CharField(required=True, max_length=30, validators=[validate_name_length, validate_name_with_alphabetical, UniqueValidator(queryset=AirlineCompany.objects.all())])
    country_id = serializers.CharField(required=True, validators=[validate_country_id])

    class Meta:
        model = AirlineCompany
        fields = '__all__'

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['user_id'] = instance.user_id.id
        ret['country_id'] = instance.country_id.id
        return ret

    
    def get_flight_count(self, obj):
        return obj.flight_set.count()


# --------------------------------------------- # 
# ------------ Customer Serializer ------------ # 
# --------------------------------------------- # 
class CustomerSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    username = serializers.CharField(source='user_id.username', read_only=True)

    user_id = serializers.CharField(required=True, validators=[validate_user_id])
    first_name = serializers.CharField(required=True, max_length=15, validators=[validate_name, validate_name_length])
    last_name = serializers.CharField(required=True, max_length=15, validators=[validate_name, validate_name_length])
    address = serializers.CharField(required=True, max_length=100, validators=[validate_address])
    credit_card_no = serializers.CharField(required=True, max_length=16, validators=[validate_credit_card, UniqueValidator(queryset=Customer.objects.all())])
    phone_no = serializers.CharField(required=True, max_length=10, validators=[validate_phone_number, UniqueValidator(queryset=Customer.objects.all())])

    class Meta:
        model = Customer
        fields = '__all__'

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['user_id'] = instance.user_id.id
        return ret

    def get_full_name(self, obj):
        return f'{obj.first_name} {obj.last_name}'
    

# --------------------------------------------- # 
# --------- Administrator Serializer ---------- # 
# --------------------------------------------- # 
class AdministratorSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    username = serializers.CharField(source='user_id.username', read_only=True)
    is_superuser = serializers.CharField(source='user_id.is_superuser', read_only=True)

    user_id = serializers.CharField(required=True, validators=[validate_user_id])
    first_name = serializers.CharField(required=True, max_length=30, validators=[validate_name, validate_name_length])
    last_name = serializers.CharField(required=True, max_length=30, validators=[validate_name, validate_name_length])

    class Meta:
        model = Administrator
        fields = '__all__'

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['user_id'] = instance.user_id.id
        return ret
    
    def get_full_name(self, obj):
        return f'{obj.first_name} {obj.last_name}'
    