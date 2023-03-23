from django.contrib.auth.models import Group, Permission
from users.models import UserRole


def create_roles_groups():
    # Create UserRole objects
    admin_role, _ = UserRole.objects.get_or_create(role_name='admin')
    customer_role, _ = UserRole.objects.get_or_create(role_name='customer')
    airline_company_role, _ = UserRole.objects.get_or_create(role_name='airline company')

    # Create Group objects for each UserRole
    admin_group, _ = Group.objects.get_or_create(name='admin')
    customer_group, _ = Group.objects.get_or_create(name='customer')
    airline_company_group, _ = Group.objects.get_or_create(name='airline company')

    # Assign permissions to each Group
    admin_permissions = Permission.objects.filter(codename__in=[
        # Group CRUD
        'view_group', 'add_group', 'change_group', 'delete_group',
        # User CRUD
        'view_user', 'add_user', 'delete_user',
        # Airline Company CRUD
        'view_airlinecompany', 'add_airlinecompany', 'delete_airlinecompany',
        # Customer CRUD
        'view_customer', 'add_customer', 'delete_customer',
        # Admin CRUD
        'view_administrator', 'add_administrator', 'delete_administrator',
        # Country CRUD
        'view_country', 'add_country', 'delete_country',
    ])
    customer_permissions = Permission.objects.filter(codename__in=[
        'change_customer','add_ticket', 'delete_ticket', 'view_ticket',
    ])
    airline_company_permissions = Permission.objects.filter(codename__in=[
        'change_airlinecompany', 'add_flight', 'change_flight', 'delete_flight', 'view_flight',
    ])
    
    # Set (connect) the permissions to each Group
    admin_group.permissions.set(admin_permissions)
    customer_group.permissions.set(customer_permissions)
    airline_company_group.permissions.set(airline_company_permissions)

    # Assign each Group to the appropriate UserRole
    admin_role.group = admin_group
    customer_role.group = customer_group
    airline_company_role.group = airline_company_group

    # Save the UserRole objects to persist the changes
    admin_role.save()
    customer_role.save()
    airline_company_role.save()
    