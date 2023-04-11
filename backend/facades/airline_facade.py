from rest_framework import status
from rest_framework.response import Response

from facades.facade_base import FacadeBase

from flights.serializers import *

class AirlineFacade(FacadeBase):

    # --------------------------------------------- #
    # -------------- Update Airline --------------- #
    # --------------------------------------------- #
    def update_airline(self, request, airline):
        # Check the request user airline company
        if request.method == 'GET':
            serializer = AirlineCompanySerializer(airline)
            return Response(serializer.data)
        # Update the request user airline company
        if request.method == 'PUT':
            serializer = AirlineCompanyCreationSerializer(instance=airline, data=request.data, partial=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response({'message': 'Airline company updated successfully'}, status=status.HTTP_200_OK)


    # --------------------------------------------- # 
    # ----------------- Add Flight ---------------- # 
    # --------------------------------------------- #  
    def add_flight(self, request):
        # Assign the airline company ID to the request user
        request.data['airline_company_id'] = request.user.airlinecompany.id
        
        serializer = FlightCreationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'message': 'Flight added successfully'}, status=status.HTTP_200_OK)
        return Response({'error': 'An error has occurred during adding flight'}, status=status.HTTP_400_BAD_REQUEST)


    # --------------------------------------------- #
    # --------------- Update Flight --------------- #
    # --------------------------------------------- #
    def update_flight(self, request, pk):
        # Try to get the request user flight 
        if request.method == 'GET':
            flight = self.dal.read_object_filter_by(Flight, {'id': pk, 'airline_company_id': request.user.airlinecompany.id})
            # If flight is found, return it
            if flight:
                flight = flight.first()
                serializer = FlightSerializer(flight)
                return Response(serializer.data)
            # If flight is not found, return 404 Error 
            else:
                return Response({'message': 'Flight is not found. It\'s either not in the database or doesn\'t belong to you'}, status=status.HTTP_404_NOT_FOUND)


    # --------------------------------------------- # 
    # -------------- Get My Flights --------------- # 
    # --------------------------------------------- # 
    def get_my_flights(self, request):
        # Get request user airline company flights
        flights = self.dal.read_object_filter_by(Flight, {'airline_company_id': request.user.airlinecompany})
        serializer = FlightSerializer(flights, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

airline_facade= AirlineFacade()