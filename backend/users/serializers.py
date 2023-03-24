from rest_framework import serializers
from rest_framework.authtoken.models import Token

from users.models import User

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


class UserDetailsSerializer(UserWithTokenSerializer):
    username = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['username']