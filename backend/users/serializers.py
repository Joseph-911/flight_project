import datetime
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm

from rest_framework import serializers
from rest_framework.authtoken.models import Token

# from users.models import User

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


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


class UserDetailsSerializer(serializers.ModelSerializer):
    last_login = serializers.SerializerMethodField(read_only=True)
    created = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['username', 'thumbnail', 'last_login', 'created']
        
    
    def get_last_login(self, obj):
        last_login = datetime.datetime.strptime(str(obj.last_login), '%Y-%m-%d %H:%M:%S.%f%z')
        last_login_formatted = last_login.strftime('%Y-%m-%d %H:%M')
        return last_login_formatted
    
    
    def get_created(self, obj):
        created = datetime.datetime.strptime(str(obj.created), '%Y-%m-%d %H:%M:%S.%f%z')
        created_formatted = created.strftime('%Y-%m-%d')
        return created_formatted
    

class UserRoleSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = User
        fields = ['role']

    def get_role(self, obj):
        if obj.user_role:
            return obj.user_role.role_name
        return None