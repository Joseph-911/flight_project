import logging
import logging.config

from django.utils import timezone
from datetime import datetime, time, timedelta
from django.conf import settings

from users.models import *
from flights.models import * 

logging.config.dictConfig(settings.LOGGING)

class GenericDAL:

    def __init__(self):
        self.info_logger = logging.getLogger('dal.info')
        self.error_logger = logging.getLogger('dal.error')

    # --------------------------------------------- # 
    # ------------ Create a New Object ------------ # 
    # --------------------------------------------- # 
    '''Creating a new 'model_class' object witht the data that passed'''
    def create_object(self, model_class, data):
        try:
            obj = model_class.objects.create(**data)
            self.info_logger.info(f'Created "{model_class.__name__}" object')
            return obj
        except Exception as error:
            self.error_logger.error(f'Failed creating "{model_class.__name__}" object')
            return error


    # --------------------------------------------- # 
    # ------------- Read Object by ID ------------- # 
    # --------------------------------------------- # 
    '''Reading 'model_class' object by ID'''
    def read_object(self, model_class, id):
        try:
            obj = model_class.objects.get(id=id)
            self.info_logger.info(f'Reading "{model_class.__name__}" object')
            return obj
        except model_class.DoesNotExist:
            self.error_logger.error(f'Failed reading "{model_class.__name__}" object (404 not found)')
            return None
    
    # --------------------------------------------- # 
    # ----------- Read Object by * ---------------- # 
    # --------------------------------------------- # 
    '''Reading 'model_class' object by the field and value that passed'''
    def read_object_by(self, model_class, field, value):
        try:
            obj = model_class.objects.get(**{field: value})
            self.info_logger.info(f'Reading "{model_class.__name__}" object')
            return obj
        except model_class.DoesNotExist:
            self.error_logger.error(f'Failed reading "{model_class.__name__}" object (404 not found)')
            return None
        

    # --------------------------------------------- # 
    # --------------- Update Object --------------- # 
    # --------------------------------------------- #
    '''Updating object'''
    def update_object(self, obj, fields):
        for field, value in fields.items():
            setattr(obj, field, value)
        self.info_logger.info(f'Updating "{obj._meta.model_name}" object')
        obj.save()
        
    
    # --------------------------------------------- #
    # -------------- Read All Objects ------------- #
    # --------------------------------------------- #
    '''Read all 'model_class' objects'''
    def read_all_objects(self, model_class):
        objects = model_class.objects.all()
        self.info_logger.info(f'Reading All "{model_class.__name__}" objects')
        return objects
    

    # --------------------------------------------- #
    # --------- Filter Users by Username ---------- #
    # --------------------------------------------- #
    def read_objects_filter_username(self, model_class, username):
        if model_class != User:
            objects = model_class.objects.filter(user_id__username__icontains=username)
        else:
            objects = model_class.objects.filter(username__icontains=username)
        self.info_logger.info(f'Searching "{model_class.__name__}" objects')
        return objects
    

    # --------------------------------------------- #
    # ----------- Filter Objects by Name ---------- #
    # --------------------------------------------- #
    def read_objects_filter_name(self, model_class, name):
        objects = model_class.objects.filter(name__icontains=name)
        self.info_logger.info(f'Searching "{model_class.__name__}" objects')
        return objects
    

    # --------------------------------------------- #
    # --------- Read Objects Filter by * ---------- #
    # --------------------------------------------- #
    def read_object_filter_by(self, model_class, filter_dict):
        self.info_logger.info(f'Filtering "{model_class.__name__}" objects')
        return model_class.objects.filter(**filter_dict)


    # --------------------------------------------- #
    # --------------- Delete Object --------------- #
    # --------------------------------------------- #
    def delete_object(self, model_class, pk):
        self.info_logger.info(f'Deleting "{model_class.__name__}" object')
        return model_class.objects.get(id=pk).delete()
    

    # --------------------------------------------- #
    # --------- Get Airlines by Country ID -------- #
    # --------------------------------------------- #
    def get_airlines_by_county(self, pk):
        country = self.read_object(Country, pk)
        if country:
            self.info_logger.info(f'Reading "{AirlineCompany.__name__}" objects by "{Country.__name__}"')
            return self.read_object_filter_by(AirlineCompany, {'country_id': pk})
        self.error_logger.error(f'Failed reading "{AirlineCompany.__name__}" objects by "{Country.__name__}"  (404 not found)')
        return None
    

    # --------------------------------------------- #
    # --------- Get Flights by Airline ID --------- #
    # --------------------------------------------- #
    def get_flights_by_airline_id(self, pk):
        airline = self.read_object(AirlineCompany, pk)
        if airline:
            self.info_logger.info(f'Reading all "{Flight.__name__}" objects by "{AirlineCompany.__name__}"')
            return Flight.objects.filter(airline_company_id=airline)
        
        self.error_logger.error(f'Failed reading "{Flight.__name__}" objects by "{AirlineCompany.__name__}"  (404 not found)')
        return None   

    # --------------------------------------------- #
    # ----- Get Flights by Origin Country ID ------ #
    # --------------------------------------------- #
    def get_flights_by_origin_country_id(self, pk):
        country = self.read_object(Country, pk)
        if country:
            self.info_logger.info(f'Reading "{Flight.__name__}" objects by "{Country.__name__}"')
            return self.read_object_filter_by(Flight, {'origin_country_id': pk})
        
        self.error_logger.error(f'Failed reading "{Flight.__name__}" objects by origin "{Country.__name__}"  (404 not found)')
        return None
    
    
    # --------------------------------------------- #
    # --- Get Flights by Destination Country ID --- #
    # --------------------------------------------- #
    def get_flights_by_destination_country_id(self, pk):
        country = self.read_object(Country, pk)
        if country:
            self.info_logger.info(f'Reading "{Flight.__name__}" objects by destination "{Country.__name__}"')
            return self.read_object_filter_by(Flight, {'destination_country_id': pk})
        self.error_logger.error(f'Failed reading "{Flight.__name__}" objects by destination "{Country.__name__}"  (404 not found)')
        return None


    # --------------------------------------------- #
    # --------- Get Flights by Parameters --------- #
    # --------------------------------------------- #
    def get_flights_by_parameters(self, origin_country_id, destination_country_id, date):
        # get origin country and destination country
        origin_country = self.read_object(Country, origin_country_id)
        destination_country = self.read_object(Country, destination_country_id)

        # Convert datetime to date
        date = datetime.strptime(date, '%Y-%m-%d').date()
        date_time = datetime.combine(date, time.min)

        # Get flights 
        flights = Flight.objects.filter(
            origin_country_id=origin_country,
            destination_country_id=destination_country,
            departure_time__gte=date_time,
            departure_time__lte=date_time.replace(hour=23, minute=59, second=59)
        )

        self.info_logger.info(f'Reading "{Flight.__name__}" objects by parameters')
        return flights


    # --------------------------------------------- #
    # ------------ Get Arrival Flights ------------ #
    # --------------------------------------------- #
    def get_arrival_flights(self, country_id):
        destination_country = self.read_object(Country, country_id)
        if destination_country:
            now = timezone.now()
            next_12_hours = now + timedelta(hours=12)

            flights = Flight.objects.filter(
                destination_country_id=destination_country,
                landing_time__range=[now, next_12_hours]
            )
            self.info_logger.info(f'Reading arrival "{Flight.__name__}" objects by {Country.__name__}')
            return flights
        self.error_logger.error(f'Failed reading arrival "{Flight.__name__}" objects by {Country.__name__} - (404 not found)')
        return None
    

    # --------------------------------------------- #
    # ----------- Get Departure Flights ----------- #
    # --------------------------------------------- #
    def get_departure_flights(self, country_id):
        origin_country = self.read_object(Country, country_id)

        if origin_country:
            now = timezone.now()
            next_12_hours = now + timedelta(hours=12)

            flights = Flight.objects.filter(
                origin_country_id=origin_country,
                departure_time__range=[now, next_12_hours]
            )
            self.info_logger.info(f'Reading departure "{Flight.__name__}" objects by {Country.__name__}')
            return flights
        
        self.error_logger.error(f'Failed reading departure "{Flight.__name__}" objects by {Country.__name__} (404 not found)')
        return None
    

    # --------------------------------------------- #
    # ------- Get Flights by Departure Date ------- #
    # --------------------------------------------- #
    def get_flights_by_departure_date(self, date):
        datetime_at_midnight = datetime.combine(date, time.min)
        flights = Flight.objects.filter(departure_time__gte=datetime_at_midnight, departure_time__lt=datetime_at_midnight+timedelta(days=1))

        self.info_logger.info(f'Reading all "{Flight.__name__}" objects by departure date {date}')
        return flights
    

    # --------------------------------------------- #
    # -------- Get Flights by Landing Date -------- #
    # --------------------------------------------- #
    def get_flights_by_landing_date(self, date):
        datetime_at_midnight = datetime.combine(date, time.min)
        flights = Flight.objects.filter(landing_time__gte=datetime_at_midnight, landing_time__lt=datetime_at_midnight+timedelta(days=1))

        self.info_logger.info(f'Reading all "{Flight.__name__}" objects by landing date {date}')
        return flights


    # --------------------------------------------- #
    # ---------- Get Tickets by Customer ---------- #
    # --------------------------------------------- #
    def get_tickets_by_customer(self, pk):
        self.info_logger.info(f'Reading all "{Ticket.__name__}" objects by "{Customer.__name__}"')
        return Ticket.objects.filter(customer_id=pk)