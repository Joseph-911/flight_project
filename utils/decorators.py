from functools import wraps
from django.core.exceptions import PermissionDenied

from rest_framework.response import Response
from rest_framework import status

def unauthenticated_user_only(view_func):
    """
    Decorator to check if the user is not authenticated.
    If the user is authenticated, return an error message.
    """
    @wraps(view_func)
    def wrapper_func(request, *args, **kwargs):
        if request.user.is_authenticated and (request.user.user_role.role_name != 'admin'):
            if request.method == 'GET':
                return Response({'message': 'Authenticated user cannot visit this page'}, status=status.HTTP_401_UNAUTHORIZED)
            elif request.method == 'POST':
                return Response({'message': 'Authenticated user cannot make action on this page'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            if request.method == 'GET':
                return Response(status=status.HTTP_200_OK)        
            return view_func(request, *args, **kwargs)
    return wrapper_func


# def user_has_permission(permission):
#     """
#     Decorator to check if the user has a permission to visit the page.
#     If the user don't have the permission, return 403 error.
#     """
#     def decorator(view_func):
#         def wrapper(request, *args, **kwargs):
#             if request.user.user_role:
#                 group = request.user.user_role.group
#                 if group and group.permissions.filter(codename=permission).exists():
#                     return view_func(request, *args, **kwargs)
#                 else:
#                     return Response({'error': 'You don\'nt have the permission to visit this page'}, status=status.HTTP_403_FORBIDDEN)
#             else:
#                 return Response({'error': 'You don\'nt have the permission to visit this page'}, status=status.HTTP_403_FORBIDDEN)
#         return wrapper
#     return decorator

def user_has_permission(permission):
    """
    Decorator to check if the user has a permission to visit the page.
    If the user don't have the permission, return 403 error.
    """
    def decorator(view_func):
        def wrapper(request, *args, **kwargs):
            if request.user.user_role and request.user.user_role.group.permissions.filter(codename=permission).exists():
                return view_func(request, *args, **kwargs)
            else:
                return Response({'error': 'You don\'t have the permission to visit this page'}, status=status.HTTP_403_FORBIDDEN)
        return wrapper
    return decorator