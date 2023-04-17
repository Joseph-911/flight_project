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
            country = self.dal.read_object_by(Country, 'id', request.data['country_id'])
            request.data['country_id'] = country.id
            serializer = AirlineCompanySerializer(instance=airline, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)

            validated_data = serializer.validated_data
            validated_data['country_id'] = country
            validated_data['name'] = validated_data['name'].title()
            self.dal.update_object(airline, validated_data)
            return Response({'message': 'Airline company updated successfully'}, status=status.HTTP_200_OK)


    # --------------------------------------------- # 
    # ----------------- Add Flight ---------------- # 
    # --------------------------------------------- #  
    def add_flight(self, request):
        if request.method == 'POST':
            # Assign the airline company ID to the request user
            request.data['airline_company_id'] = request.user.airlinecompany.id

            serializer = FlightSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                validated_data = serializer.validated_data

                airline_company = self.dal.read_object(AirlineCompany, validated_data['airline_company_id'])
                origin_country = self.dal.read_object(Country, validated_data['origin_country_id'])
                destination_country = self.dal.read_object(Country, validated_data['destination_country_id'])

                validated_data['airline_company_id'] = airline_company
                validated_data['origin_country_id'] = origin_country
                validated_data['destination_country_id'] = destination_country

                self.dal.create_object(Flight, validated_data)
                
                return Response({'message': 'Flight added successfully'}, status=status.HTTP_200_OK)
            return Response({'error': 'An error has occurred during adding flight'}, status=status.HTTP_400_BAD_REQUEST)
        return Response()


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
        if request.method == 'PUT':
            flight = self.dal.read_object_filter_by(Flight, {'id': pk, 'airline_company_id': request.user.airlinecompany.id})
            
            serializer = FlightSerializer(instance=flight.first(), data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            validated_data = serializer.validated_data

            validated_data['origin_country_id'] = self.dal.read_object(Country, validated_data['origin_country_id'])
            validated_data['destination_country_id'] = self.dal.read_object(Country, validated_data['destination_country_id'])

            self.dal.update_object(flight.first(), validated_data)
            return Response({'message': 'Flight updated successfully'}, status=status.HTTP_200_OK)


    # --------------------------------------------- #
    # --------------- Remove Flight --------------- #
    # --------------------------------------------- #
    def remove_flight(self, request, pk):
        flight = self.dal.read_object_filter_by(Flight, {'id': pk, 'airline_company_id': request.user.airlinecompany.id})

        if request.method == 'DELETE':
            if flight:
                flight = flight.first()
                tickets = self.dal.read_object_filter_by(Ticket, {'flight_id': flight})

                if tickets.exists():
                    return Response({'message': 'Flight cannot be deleted. Customers already booked this flight'}, status=status.HTTP_403_FORBIDDEN)
                
                self.dal.delete_object(Flight, flight.id)
                return Response({'message': 'Flight deleted successfully'}, status=status.HTTP_200_OK)
                
            return Response({'message': 'Flight is not found. It\'s either not in the database or doesn\'t belong to you'}, status=status.HTTP_404_NOT_FOUND)
        return Response()


    # --------------------------------------------- # 
    # -------------- Get My Flights --------------- # 
    # --------------------------------------------- # 
    def get_my_flights(self, request):
        # Get request user airline company flights
        flights = self.dal.read_object_filter_by(Flight, {'airline_company_id': request.user.airlinecompany})
        serializer = FlightSerializer(flights, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


airline_facade= AirlineFacade()