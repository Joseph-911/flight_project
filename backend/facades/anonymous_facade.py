from rest_framework import status
from rest_framework.response import Response

from facades.facade_base import FacadeBase
from flights.serializers import CustomerSerializer
from flights.models import Customer
from users.models import User, UserRole


class AnonymousFacade(FacadeBase):
    # --------------------------------------------- # 
    # -------------- Create Customer -------------- # 
    # --------------------------------------------- # 
    def create_customer(self, request):
        if request.method == 'GET':
            if request.user.user_role:
                return Response({'message': 'You don\'t have the permission to visit this page'}, status=status.HTTP_403_FORBIDDEN)
            return Response()
        if request.method == 'POST':
            request.data['user_id'] = request.user.id
            serializer = CustomerSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            validated_data = serializer.validated_data

            # Get the user
            user = self.dal.read_object(User, request.user.id)
            # Format validated data
            validated_data['user_id'] = user
            validated_data['first_name'] = validated_data['first_name'].title()
            validated_data['last_name'] = validated_data['last_name'].title()
            validated_data['address'] = validated_data['address'].title()

            # Get customer role (object)
            role = self.dal.read_object_by(UserRole, 'role_name', 'customer')
            # Update the user role
            self.dal.update_object(user, {'user_role': role})
            # Create customer object
            self.dal.create_object(Customer, validated_data)

            return Response({'message': 'Customer added successfully'}, status=status.HTTP_200_OK)

                
        


anonymous_facade = AnonymousFacade()