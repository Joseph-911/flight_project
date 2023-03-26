from rest_framework import serializers
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model

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


class CustomUserCreationSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=True, max_length=15)
    email = serializers.EmailField(required=True, max_length=255)
    password = serializers.CharField(required=True, max_length=128, write_only=True)
    thumbnail = serializers.ImageField(required=False)

    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'thumbnail')

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
