from rest_framework import serializers

from flights.models import *


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