from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from flights.models import *
from users.models import *
from utils.validators import *


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'


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
    name = serializers.CharField(required=True, max_length=30, validators=[validate_name_length, validate_name_with_alphabetical,validate_unique_name])
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