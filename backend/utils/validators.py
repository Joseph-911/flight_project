import re

from PIL import Image, UnidentifiedImageError

from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password

from rest_framework import serializers
from users.models import User
from flights.models import *
from users.models import *


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
    

def validate_name(value):
    # Check for valid name only with alphabetical characters
    if not re.match('^[a-zA-Z]+$', value):
        raise serializers.ValidationError('Name must contain only alphabetical characters.')
    

def validate_name_length(value):
    # Check for at least 2 characters
    if len(value) < 2:
        raise serializers.ValidationError('Name must be at least 2 characters long.')
    

def validate_name_with_alphabetical(value):
    # Check for at least one alphabetical character
    if not re.search('[a-zA-Z]', value):
        raise serializers.ValidationError('Name must contain at least 1 alphabetical character.')
    

def validate_id(value):
    # Check if user_id is an int
    if not value.isnumeric():
        raise serializers.ValidationError('Please type a valid ID (integer)')


def validate_user_id(value):
    # Check if user is exists and it's role in null
    validate_id(value)
    try:
        user = User.objects.get(id=value)
        if user:
            if user.user_role != None:
                raise serializers.ValidationError('User has a role already')
    except User.DoesNotExist:
        raise serializers.ValidationError('User is not found')
    

def validate_country_id(value):
    # Check if user is exists and it's role in null
    validate_id(value)
    try:
        Country.objects.get(id=value)
    except Country.DoesNotExist:
        raise serializers.ValidationError('Country is not found')
    

def validate_unique_name(value):
    if AirlineCompany.objects.filter(name__iexact=value).exists():
        raise serializers.ValidationError('Name already exists.')