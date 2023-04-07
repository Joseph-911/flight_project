import re

from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password
from django.core.files.images import get_image_dimensions

from rest_framework import serializers
from users.models import User
from flights.models import *
from users.models import *


def validate_user_username(username):
    errors = []

    # Check if username is taken
    if User.objects.filter(username=username).exists():
        raise serializers.ValidationError('Username is taken.')
    else:
        # Check for username length
        if len(username) < 4:
            errors.append("Username must be at least 4 characters long.")
        # Check for at least one alphabet characters
        if not any(char.isalpha() for char in username):
            errors.append("Username must contain at least one alphabet character.")
        # Check if first character is a number
        if username[0].isdigit():
            errors.append("Username can't start with a number.")
        # Check for alphabetical characters and numbers
        if bool(re.search('[^a-zA-Z0-9]', username)):
            raise serializers.ValidationError("Username must contain only alphabet charatcers a number.")
        # return list of errors if found
        if errors:
            raise serializers.ValidationError(errors)
        
    return username


def validate_user_password1(password):
    # Check for Django-built password validation
    validate_password(password)


def validate_user_passwords(data):
    # Get the two passwords
    password1 = data.get('password1')
    password2 = data.get('password2')

    # Check for matching passwords
    if password1 and password2 and password1 != password2:
        raise serializers.ValidationError({'password2': 'Passwords do not match.'})

    return data


def validate_image_field(file):
    # Check the content type of the image
    valid_extensions = ['jpg', 'jpeg', 'png']
    extension = file.name.split('.')[-1].lower()
    if extension not in valid_extensions:
        raise serializers.ValidationError(f"Invalid file type. Supported types are {', '.join(valid_extensions)}")

    # Check the dimensions of the image
    width, height = get_image_dimensions(file)
    if width < 200 or height < 200:
        raise serializers.ValidationError("Image dimensions are too small. Minimum size is 200x200 pixels.")

    # Return the validated image
    return file    

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
    # Check if the ID is valid, and if the country exists
    validate_id(value)
    try:
        Country.objects.get(id=value)
    except Country.DoesNotExist:
        raise serializers.ValidationError('Country is not found')
    

def validate_unique_name(value):
    # Check if company name is taken
    if AirlineCompany.objects.filter(name__iexact=value).exists():
        raise serializers.ValidationError('Name already exists.')