import re

from PIL import Image, UnidentifiedImageError

from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password

from rest_framework import serializers

from users.models import User


def validate_user_username(username):
    errors = []

    if User.objects.filter(username=username).exists():
        raise serializers.ValidationError('Username is taken.')
    else:
        if len(username) < 4:
            errors.append("Username must be at least 4 characters long.")

        if not any(char.isalpha() for char in username):
            errors.append("Username must contain at least one alphabet character.")

        if username[0].isdigit():
            errors.append("Username can't start with a number.")

        if bool(re.search('[^a-zA-Z0-9]', username)):
            raise serializers.ValidationError("Username must contain only alphabet charatcers a number.")

        if errors:
            raise serializers.ValidationError(errors)
        
    return username

    

def validate_user_password1(password):
    validate_password(password)


def validate_user_passwords(data):
    password1 = data.get('password1')
    password2 = data.get('password2')

    if password1 and password2 and password1 != password2:
        raise serializers.ValidationError({'password2': 'Passwords do not match.'})

    return data


def validate_user_thumbnail(file):
    try:
        image = Image.open(file)
        image.verify()
        return True
    except Exception:
        return False