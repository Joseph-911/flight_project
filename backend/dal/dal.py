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

    def create_object(self, model_class, data):
        try:
            obj = model_class.objects.create(**data)
            self.info_logger.info(f'Created "{model_class.__name__}" object')
            return obj
        except Exception as error:
            self.error_logger.error(f'Failed creating "{model_class.__name__}" object')
            return error


    def read_object(self, model_class, id):
        try:
            obj = model_class.objects.get(id=id)
            self.info_logger.info(f'Reading "{model_class.__name__}" object')
            return obj
        except model_class.DoesNotExist:
            self.error_logger.error(f'Failed reading "{model_class.__name__}" object (404 not found)')
            return None
        
    def read_object_by(self, model_class, field, value):
        try:
            obj = model_class.objects.get(**{field: value})
            self.info_logger.info(f'Reading "{model_class.__name__}" object')
            return obj
        except model_class.DoesNotExist:
            self.error_logger.error(f'Failed reading "{model_class.__name__}" object (404 not found)')
            return None
        
    def update_object(self, obj, fields):
        for field, value in fields.items():
            setattr(obj, field, value)
        self.info_logger.info(f'Updating "{obj._meta.model_name}" object')
        obj.save()
        
    
    def read_all_objects(self, model_class):
        objects = model_class.objects.all()
        self.info_logger.info(f'Reading All "{model_class.__name__}" objects')
        return objects
    

    def read_objects_filter_username(self, model_class, username):
        if model_class != User:
            objects = model_class.objects.filter(user_id__username__icontains=username)
        else:
            objects = model_class.objects.filter(username__icontains=username)
        self.info_logger.info(f'Searching "{model_class.__name__}" objects')
        return objects
    
    
    def read_objects_filter_name(self, model_class, name):
        objects = model_class.objects.filter(name__icontains=name)
        self.info_logger.info(f'Searching "{model_class.__name__}" objects')
        return objects
    

    def read_object_filter_by(self, model_class, filter_dict):
        self.info_logger.info(f'Searching "{model_class.__name__}" objects')
        return model_class.objects.filter(**filter_dict)


    def delete_object(self, model_class, pk):
        self.info_logger.info(f'Deleting "{model_class.__name__}" object')
        return model_class.objects.get(id=pk).delete()
    

    def get_airlines_by_county(self, pk):
        country = self.read_object(Country, pk)
        if country:
            self.info_logger.info(f'Reading "{AirlineCompany.__name__}" objects by "{Country.__name__}"')
            return self.read_object_filter_by(AirlineCompany, {'country_id': pk})
        self.error_logger.error(f'Failed reading "{AirlineCompany.__name__}" objects by "{Country.__name__}"  (404 not found)')
        return None
    

    def get_flights_by_airline_id(self, pk):
        airline = self.read_object(AirlineCompany, pk)

        if airline:
            self.info_logger.info(f'Reading "{Flight.__name__}" objects by "{AirlineCompany.__name__}"')
            return self.read_object_filter_by(Flight, {'airline_company_id': pk})
        self.error_logger.error(f'Failed  reading "{Flight.__name__}" objects by "{AirlineCompany.__name__}"  (404 not found)')
        return None   


    def get_flights_by_origin_country_id(self, pk):
        country = self.read_object(Country, pk)
        if country:
            self.info_logger.info(f'Reading "{Flight.__name__}" objects by "{Country.__name__}"')
            return self.read_object_filter_by(Flight, {'origin_country_id': pk})
        self.error_logger.error(f'Failed reading "{Flight.__name__}" objects by origin "{Country.__name__}"  (404 not found)')
        return None
    
    
    def get_flights_by_destination_country_id(self, pk):
        country = self.read_object(Country, pk)
        if country:
            self.info_logger.info(f'Reading "{Flight.__name__}" objects by destination "{Country.__name__}"')
            return self.read_object_filter_by(Flight, {'destination_country_id': pk})
        self.error_logger.error(f'Failed reading "{Flight.__name__}" objects by destination "{Country.__name__}"  (404 not found)')
        return None


    def get_flights_by_parameters(self, origin_country_id, destination_country_id, date):
        origin_country = self.read_object(Country, origin_country_id)
        destination_country = self.read_object(Country, destination_country_id)

        date = datetime.strptime(date, '%Y-%m-%d').date()
        date_time = datetime.combine(date, time.min)

        flights = Flight.objects.filter(
            origin_country_id=origin_country,
            destination_country_id=destination_country,
            departure_time__gte=date_time,
            departure_time__lte=date_time.replace(hour=23, minute=59, second=59)
        )

        self.info_logger.info(f'Reading "{Flight.__name__}" objects by parameters')
        return flights


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


    def get_tickets_by_customer(self, pk):
        self.info_logger.info(f'Reading "{Ticket.__name__}" objects by {Customer.__name__}')
        return self.read_object_filter_by(Ticket, {'customer_id': pk})