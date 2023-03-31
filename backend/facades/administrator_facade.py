from rest_framework.response import Response

from facades.facade_base import FacadeBase

from users.models import User
from users.serializers import *

class AdministratorFacade(FacadeBase):

    def get_all_users(self, request):
        if request.method == 'GET':
            users = self.dal.read_all_objects(User)

        if request.method == 'POST':
            if 'search_query' in request.data:
                users = self.dal.read_objects_filter_username(request.data['search_query'])

        serializer = UserSerializer(users, many=True)   
        return Response(serializer.data)


administrator_facade = AdministratorFacade()