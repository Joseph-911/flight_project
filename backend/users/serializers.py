import datetime
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.files import File
from django.db import transaction

from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.authtoken.models import Token


from utils.validators import *
from flights.serializers import *

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    user_role = serializers.SerializerMethodField(read_only=True) 
    role_obj = serializers.SerializerMethodField()
    created = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = '__all__'

    
    def get_user_role(self, obj):
        if obj.user_role:
            return obj.user_role.role_name
        else:
            return None
        
    def get_created(self, obj):
        return obj.created.date();


    def get_role_obj(self, obj):
        if obj.user_role:
            match obj.user_role.role_name:
                case 'admin':
                    return AdministratorSerializer(obj.administrator).data
                case 'airline company':
                    return AirlineCompanySerializer(obj.airlinecompany).data
                case 'customer':
                    return CustomerSerializer(obj.customer).data
        else: 
            None
        

class UserWithTokenSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['token']

    def get_token(self, obj):
        try:
            token = obj.auth_token
            token.delete()
        except Token.DoesNotExist:
            pass
        token = Token.objects.create(user=obj)
        return str(token.key)
    


class UserExistedToken(serializers.ModelSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = User
        fields = ['token']

    def get_token(self, obj):
        token = obj.auth_token
        return str(token.key)


class UserDetailsSerializer(serializers.ModelSerializer):
    created = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['username', 'thumbnail', 'created']
    
    
    def get_created(self, obj):
        return obj.created.date()
    

class UserRoleSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = User
        fields = ['role']

    def get_role(self, obj):
        if obj.user_role:
            return obj.user_role.role_name
        return None


class UserRegisterSerializer(serializers.ModelSerializer):
    thumbnail = serializers.ImageField(required=False, validators=[validate_image_field])
    username = serializers.CharField(required=True, max_length=15, validators=[validate_user_username])
    password1 = serializers.CharField(required=True, validators=[validate_user_password1])
    password2 = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'thumbnail', 'password1', 'password2']

    def validate(self, data):
        data = super().validate(data)
        data = validate_user_passwords(data)
        return data
    