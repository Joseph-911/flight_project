from rest_framework import status
from rest_framework.response import Response

from facades.facade_base import FacadeBase

from flights.serializers import *

class AirlineFacade(FacadeBase):

    # --------------------------------------------- #
    # -------------- Update Airline --------------- #
    # --------------------------------------------- #
    def update_airline(self, request, airline):
        if request.method == 'GET':
            serializer = AirlineCompanySerializer(airline)
            return Response(serializer.data)
        if request.method == 'PUT':
            serializer = AirlineCompanyCreationSerializer(instance=airline, data=request.data, partial=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response({'message': 'Airline company updated successfully'}, status=status.HTTP_200_OK)


    # --------------------------------------------- # 
    # ----------------- Add Flight ---------------- # 
    # --------------------------------------------- #  
    def add_flight(self, request):
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
        if request.method == 'GET':
            flight = self.dal.read_object_filter_by(Flight, {'id': pk, 'airline_company_id': request.user.airlinecompany.id})
            if flight:
                flight = flight.first()
                serializer = FlightSerializer(flight)
                return Response(serializer.data)
            else:
                return Response({'message': 'Flight is not found, it\'s either not in the database or doesn\'t belong to you'}, status=status.HTTP_404_NOT_FOUND)


    # --------------------------------------------- # 
    # --------------- Get My Flight --------------- # 
    # --------------------------------------------- # 
    def get_my_flights(self, request):
        flights = self.dal.read_object_filter_by(Flight, {'airline_company_id': request.user.airlinecompany})
        serializer = FlightSerializer(flights, many=True)
        # print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)
        # return Response(serializer.data, status=status.HTTP_200_OK)

airline_facade= AirlineFacade()