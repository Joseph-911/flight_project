import re
import pycountry

from fuzzywuzzy import fuzz, process
from datetime import timedelta

from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password
from django.core.files.images import get_image_dimensions
from django.utils import timezone

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
    

def validate_hyphenated_word_pair(value):
    # Check for valid country name, examples: Japan, Guinea-Bissau
    if not re.match('^[a-zA-Z ]+(-[a-zA-Z]+)*$', value):
        raise serializers.ValidationError('Name must contain only alphabetical characters, spaces and hyphen in the middle.')
    

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
    
def validate_airline_id(value):
    # Check if the ID is valid, and if the country exists
    validate_id(value)
    try:
        AirlineCompany.objects.get(id=value)
    except AirlineCompany.DoesNotExist:
        raise serializers.ValidationError('Airline company is not found')
    

def validate_unique_name(value):
    # Check if company name is taken
    if AirlineCompany.objects.filter(name__iexact=value).exists():
        raise serializers.ValidationError('Name already exists.')
    
def validate_number_positive(value):
    # Check for positive number
    if value is None or value <= 0:
        raise ValidationError('Field must be a relavant positive number.')
    
def validate_time_is_future(value):
    # Check that time is in the future
    now = timezone.now()
    if value and value <= now:
        raise ValidationError('Date and time must be in the future.')
    

def validate_time_gap(date1, date1field, date2, date2field):
    # Check that date2 is greater than date1 and not equal
    if date1 and date2 and date1 >= date2:
        raise ValidationError({
                date1field: 'Departure time must be before landing time.',
                date2field: 'Departure time must be before landing time.'
            })


def validate_time_duration(date1, date2, date2field, min_duration, max_duration):
    # Check time duration is between min and max
    if date2 and date1:
        duration = date2 - date1
        print(duration)
        min_duration = timedelta(hours=min_duration)
        max_duration = timedelta(hours=max_duration)
        if duration < min_duration or duration > max_duration:
            raise ValidationError({date2field: 'Flight duration must be between 1 hour and 18 hours.'})

def suggest_country_name(value):
    countries = [c.name.title() for c in pycountry.countries]
    suggestions = process.extract(value.title(), countries, limit=5)
    suggested_countries = []
    for suggestion in suggestions:
        if fuzz.ratio(value.title(), suggestion[0]) >= 60:
            suggested_countries.append(pycountry.countries.lookup(suggestion[0]).name)
    return suggested_countries


def validate_country(value):
    if Country.objects.filter(name__iexact=value).exists():
        raise serializers.ValidationError('Country already exists.')
    
    validate_hyphenated_word_pair(value)
    validate_name_length(value)

    try:
        country = pycountry.countries.get(name=value.title())
        if country is None:
            raise LookupError
    except LookupError:
        suggestions = suggest_country_name(value)
        
        if suggestions:
            suggestions_str = ''.join([f'<li>- <span value="{suggestion}" role="button" class="btn btn-xs btn-primary-underline">{suggestion}</span></li>' for suggestion in suggestions])
            raise serializers.ValidationError(f'''
            Country doesn\'t exist! Suggestions based on your input:<br />
            <ul id="suggestions-list">{suggestions_str}</ul>
            ''')
        else:
            raise serializers.ValidationError(f'''
            Invalid country name.
            <p><br /><a target="_blank" href="https://www.worldometers.info/geography/alphabetical-list-of-countries/">Check: All countries list</a>.<br />Or simply try few letters you remember of the name and choose from the suggestions. Examples: united, itl, grmn</p>
            ''')
        
    return value
