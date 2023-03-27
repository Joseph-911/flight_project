from functools import wraps
from rest_framework.response import Response
from rest_framework import status

def unauthenticated_user_only(view_func):
    """
    Decorator to check if the user is not authenticated.
    If the user is authenticated, return an error message.
    """
    @wraps(view_func)
    def wrapper_func(request, *args, **kwargs):
        if request.user.is_authenticated:
            if request.method == 'GET':
                return Response({'message': 'Authenticated user cannot visit this page'}, status=status.HTTP_401_UNAUTHORIZED)
            elif request.method == 'POST':
                return Response({'message': 'Authenticated user cannot make action on this page'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            if request.method == 'GET':
                return Response(status=status.HTTP_200_OK)        
            return view_func(request, *args, **kwargs)
    return wrapper_func
