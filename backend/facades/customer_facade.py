from django.utils import timezone

from rest_framework import status
from rest_framework.response import Response

from facades.facade_base import FacadeBase

from flights.serializers import *


class CustomerFacade(FacadeBase):
    
    # --------------------------------------------- #
    # ---------------- Add Ticket ----------------- #
    # --------------------------------------------- #
    def add_ticket(self, request, pk):
        flight = self.dal.read_object_by(Flight, 'id', pk)
        customer = request.user.customer
        flight_serializer = FlightSerializer(flight)
        customer_serializer = CustomerSerializer(customer)
        
        if request.method == 'GET':
            if flight is not None:
                return Response(
                    {
                        'flight': flight_serializer.data,
                        'customer': customer_serializer.data
                    }, status=status.HTTP_200_OK
                )
            return Response({'message': 'Flight not found'}, status=status.HTTP_404_NOT_FOUND)
        
        if request.method == 'POST':
            customer_has_ticket = self.dal.read_object_filter_by(Ticket, {'customer_id': customer.id, 'flight_id': pk})

            if flight.departure_time <= timezone.now():
                return Response({'message': 'Sorry this flight took a place in the past.'}, status=status.HTTP_400_BAD_REQUEST)

            if customer_has_ticket:
                return Response({'message': 'You already bought this ticket before.'}, status=status.HTTP_400_BAD_REQUEST)
            
            if flight.remaining_tickets == 0:
                return Response({'message': 'Sorry, no tickets available left for this flight.'}, status=status.HTTP_400_BAD_REQUEST)

            # Create ticket object
            self.dal.create_object(Ticket, {'customer_id': customer, 'flight_id' : flight})
            # Update remaining tickets  
            self.dal.update_object(flight, {'remaining_tickets': flight.remaining_tickets - 1})

            return Response({'message': 'Ticket added successfully'}, status=status.HTTP_200_OK) 


    # --------------------------------------------- #
    # --------------- Remove Ticket --------------- #
    # --------------------------------------------- #
    def remove_ticket(self, request, pk):
        ticket = self.dal.read_object_filter_by(Ticket, {'id': pk, 'customer_id': request.user.customer})
        if request.method == 'DELETE':
            if ticket:
                # Delete ticket
                ticket = ticket.first()
                self.dal.delete_object(Ticket, ticket.id)

                # Update flight remaining tickets
                flight = self.dal.read_object_filter_by(Flight, {'id': ticket.flight_id.id}).first()
                self.dal.update_object(flight, {'remaining_tickets': flight.remaining_tickets + 1})

                return Response({'message': 'Ticket deleted successfully'}, status=status.HTTP_200_OK)
            
            return Response({'message': 'Ticket not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response()


    # --------------------------------------------- #
    # -------------- Get My Tickets --------------- #
    # --------------------------------------------- #
    def get_my_tickets(self, request):
        pk = request.user.customer.id
        tickets = self.dal.get_tickets_by_customer(pk)

        serializer = TicketSerializer(tickets, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


customer_facade = CustomerFacade()