def print_rules(rules):
    print("* " + "\n* ".join(rules))
    

db_name_rules = [
    'Must be between 3 and 25 characters long',
    'Must only contain alphanumeric characters and underscores',
    'Cannot start with a number',
]

db_user_rules = [
    'Must be between 4 and 16 characters long',
    'Must only contain alphanumeric characters and underscores',
    'Cannot start with a number',
]

db_password_rules = [
    'Must be between 8 and 30 characters long',
    'Must contain at least one number and one alphabet character',
]

admin_username_rules = [
    'Must be between 4 and 20 characters long',
    'Must only contain alphanumeric characters',
    'Cannot start with a number',
]

admin_email_rules = [
    'Must be a valid e-mail address',
]

admin_password_rules = [
    'Must be between 8 and 20 characters long',
    'Must contain at least one number and one alphabet character',
    'Cannot start with a number',
    'Passwords must match',
]

admin_name_rules = [
    'Must be between 2 and 15 characters long',
    'Must only contain alphabet characters',
]