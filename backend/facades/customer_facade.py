from rest_framework import status
from rest_framework.response import Response

from facades.facade_base import FacadeBase

from flights.serializers import *


class CustomerFacade(FacadeBase):
    
    # --------------------------------------------- #
    # -------------- Get My Tickets --------------- #
    # --------------------------------------------- #
    def get_my_tickets(self, request):
        pk = request.user.customer.id
        tickets = self.dal.get_tickets_by_customer(pk)

        serializer = TicketSerializer(tickets, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


customer_facade = CustomerFacade()