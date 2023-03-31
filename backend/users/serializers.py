import datetime
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.files import File

from rest_framework import serializers
from rest_framework.authtoken.models import Token

from utils.validators import *

# from users.models import User

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    user_role = serializers.SerializerMethodField(read_only=True) 

    class Meta:
        model = User
        fields = '__all__'

    
    def get_user_role(self, obj):
        if obj.user_role:
            return obj.user_role.role_name
        else:
            return None
        

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
    thumbnail = serializers.ImageField(required=False)
    username = serializers.CharField(required=True, max_length=15, validators=[validate_user_username])
    password1 = serializers.CharField(required=True, validators=[validate_user_password1])
    password2 = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'thumbnail', 'password1', 'password2']

    def validate(self, data):
        data = super().validate(data)
        data = validate_user_passwords(data)

        if 'thumbnail' in data:
            thumbnail = data['thumbnail']
            try:
                validate_user_thumbnail(thumbnail)
            except:
                raise serializers.ValidationError("Invalid image file.")
        return data
    

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password1']
        )
        if 'thumbnail' in validated_data:
            thumbnail = validated_data['thumbnail']
            user.thumbnail.save(thumbnail.name, thumbnail)
        return user