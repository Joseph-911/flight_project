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

    class Meta:
        model = AirlineCompany
        fields = '__all__'

    def get_flight_count(self, obj):
        return obj.flight_set.count()