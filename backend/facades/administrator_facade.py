from rest_framework.response import Response

from facades.facade_base import FacadeBase

from users.models import User
from users.serializers import *

class AdministratorFacade(FacadeBase):

    def get_all_users(self):
        users = self.dal.read_all_objects(User)
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)


administrator_facade = AdministratorFacade()