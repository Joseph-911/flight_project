import re
from .validation_rules import *


# --------------------------------------------- #
# ----------- Validate Database Name ---------- #
# --------------------------------------------- #
def validate_db_name(name):
    # Must be between 3 and 25 characters long
    if len(name) > 25 or len(name) < 3:
        return {'success': False, 'message': 'Must be between 3 and 25 characters long'}
    
    # Must only contain alphanumeric characters and underscores
    if not re.match(r'^[a-zA-Z0-9_]+$', name):
        return {'success': False, 'message': 'Must only contain alphanumeric characters and underscores'}
    
    # Cannot start with a number
    if name[0].isdigit():
        return {'success': False, 'message': 'Cannot start with a number'}

    # Valid database name
    return {'success': True, 'message': 'Valid database name'}


# --------------------------------------------- #
# ----------- Validate Database User ---------- #
# --------------------------------------------- #
def validate_db_user(username):
    # Must be between 4 and 16 characters long
    if len(username) > 16 or len(username) < 4:
        return {'success': False, 'message': 'Must be between 4 and 16 characters long'}
    
    # Must only contain alphanumeric characters and underscores
    if not re.match(r'^[a-zA-Z0-9_]+$', username):
        return {'success': False, 'message': 'Must only contain alphanumeric characters and underscores'}
    
    # Cannot start with a number
    if username[0].isdigit():
        return {'success': False, 'message': 'Cannot start with a number'}

    # Valid database user
    return {'success': True, 'message': 'Valid database user'}


# --------------------------------------------- #
# -------- Validation Database Password ------- #
# --------------------------------------------- #
def validate_db_password(password):
    # Must be between 8 and 30 characters long
    if len(password) < 8 or len(password) > 30:
        return {'success': False, 'message': 'Must be between 8 and 30 characters long'}
    
    # Must contain at least one number
    if not any(char.isdigit() for char in password):
        return {'success': False, 'message': 'Must contain at least one number'}
    
    # Must contain at least one alphabet character
    if not any(char.isalpha() for char in password):
        return {'success': False, 'message': 'Must contain at least one alphabet character'}

    # Valid database password
    return {'success': True, 'message': 'Valid database password'}


# --------------------------------------------- #
# --------- Validation Admin Username --------- #
# --------------------------------------------- #
def validate_admin_username(username):
    # Must be between 4 and 20 characters long
    if len(username) > 20 or len(username) < 4:
        return {'success': False, 'message': 'Must be between 4 and 20 characters long'}

    # Must only contain alphanumeric characters
    if not username.isalnum():
        return {'success': False, 'message': 'Must only contain alphanumeric characters'}

    # Cannot start with a number
    if not username[0].isalpha():
        return {'success': False, 'message': 'Cannot start with a number'}
    
    # Valid admin username
    return {'success': True, 'message': 'Valid admin username'}


# --------------------------------------------- #
# ----------- Validate Admin E-mail ----------- #
# --------------------------------------------- #
def validate_admin_email(email):
    pattern = r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+'

    # Must be a valid email address
    if not re.match(pattern, email):
        return {'success': False, 'message': 'Must be a valid e-mail address'}
    
    # Valid admin e-email
    return {'success': True, 'message': 'Valid admin e-mail'}


# --------------------------------------------- #
# ---------- Validate Admin Password ---------- #
# --------------------------------------------- #
def validate_admin_password(password1, password2):
    # Must match passwords
    if password1 != password2:
        return {'success': False, 'message': 'Passwords didn\'t match'} 
    
    # Must be between 8 and 20 characters long
    if len(password1) < 8 and len(password1) > 20:
        return {'success': False, 'message': 'Must be between 8 and 20 characters long'} 
    
    # Must contain at least one number
    if not any(char.isdigit() for char in password1):
        return {'success': False, 'message': 'Must contain at least one number'}
    
    # Must contain at least one alphabet character
    if not any(char.isalpha() for char in password1):
        return {'success': False, 'message': 'Must contain at least one alphabet character'}
    
    # Cannot start with a number
    if not password1[0].isalpha():
        return {'success': False, 'message': 'Cannot start with a number'} 
    
    # Valid admin password
    return {'success': True, 'message': 'Valid admin password'} 


# --------------------------------------------- #
# ------------ Validate Admin Name ------------ #
# --------------------------------------------- #
def validation_admin_name(name):
    # Must only contain alphabet characters
    if not name.isalpha():
        return {'success': False, 'message': 'Must only contain alphabet characters'} 
    
    # Must be between 2 and 15 characters long
    if len(name) > 15 or len(name) < 2:
        return {'success': False, 'message': 'Must only contain alphabet characters'} 
    
    # Valid admin name
    return {'success': True, 'message': 'Valid admin name'} 




def generate_env_file(env_file): 
    
    print('\nDatabase name:')
    print_rules(db_name_rules)
    database_name = input('\nEnter database name (schema):  ')
    
    while not validate_db_name(database_name)['success']:
        print(f'\nInvalid name - {validate_db_name(database_name)["message"]}')
        database_name = input('Enter database name (schema):  ')


    print('\nDatabase user:')
    print_rules(db_user_rules)
    database_user = input('\nEnter database user:  ')
    
    while not validate_db_user(database_user)['success']:
        print(f'\nInvalid user - {validate_db_user(database_user)["message"]}')
        database_user = input('Enter database user:  ')


    print('\nDatabase password:')
    print_rules(db_password_rules)
    database_password = input('\nEnter database password:  ')
    
    while not validate_db_password(database_password)['success']:
        print(f'\nInvalid password - {validate_db_password(database_password)["message"]}')
        database_password = input('Enter database password:  ')


    print('\nAdmin username:')
    print_rules(admin_username_rules)
    admin_username = input('\nEnter admin username:  ')
    
    while not validate_admin_username(admin_username)['success']:
        print(f'\nInvalid username - {validate_admin_username(admin_username)["message"]}')
        admin_username = input('Enter admin username:  ')

    
    print('\nAdmin e-mail:')
    print_rules(admin_email_rules)
    admin_email = input('\nEnter admin email:  ')
    
    while not validate_admin_email(admin_email)['success']:
        print(f'\nInvalid email - {validate_admin_email(admin_email)["message"]}')
        admin_email = input('Enter admin email:  ')
    
    
    print('\nAdmin password:')
    print_rules(admin_password_rules)
    admin_password1 = input('\nEnter admin password:  ')
    admin_password2 = input('Re-enter admin password:  ')
    
    while not validate_admin_password(admin_password1, admin_password2)['success']:
        print(f'\nInvalid password - {validate_admin_password(admin_password1, admin_password2)["message"]}')
        admin_password1 = input('Enter admin password:  ')
        admin_password2 = input('Re-enter admin password:  ')


    print('\nAdmin first name:')
    print_rules(admin_name_rules)
    admin_fname = input('\nEnter admin first name: ')
    
    while not validation_admin_name(admin_fname)['success']:
        print(f'\nInvalid name - {validation_admin_name(admin_fname)["message"]}')
        admin_fname = input('Enter admin first name: ')

    print('\nAdmin last name:')
    print_rules(admin_name_rules)
    admin_lname = input('\nEnter admin last name: ')
    
    while not validation_admin_name(admin_lname)['success']:
        print(f'\nInvalid name - {validation_admin_name(admin_lname)["message"]}')
        admin_lname = input('Enter admin last name: ')


    # Open the .env file in the root directory
    with open(env_file, 'w') as env_file:
        # Write the inputs to the .env file
        env_file.write(f'DATABASE_NAME={database_name}\n')
        env_file.write(f'DATABASE_USER={database_user}\n')
        env_file.write(f'DATABASE_PASSWORD={database_password}\n')
        env_file.write(f'ADMIN_USERNAME={admin_username}\n')
        env_file.write(f'ADMIN_EMAIL={admin_email}\n')
        env_file.write(f'ADMIN_PASSWORD={admin_password1}\n')
        env_file.write(f'ADMIN_FIRSTNAME={admin_fname}\n')
        env_file.write(f'ADMIN_LASTNAME={admin_lname}\n')

    print('\n----- .env file created -----')
    return database_name, database_user
