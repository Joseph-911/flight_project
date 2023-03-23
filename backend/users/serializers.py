from rest_framework import serializers
from rest_framework.authtoken.models import Token

from users.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class UserWithTokenSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField(read_only=True)
    is_admin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'is_admin']

    def get_role(self, obj):
        return obj.user_role.role_name
    
    def get_is_admin(self, obj):
        return obj.is_superuser
    
