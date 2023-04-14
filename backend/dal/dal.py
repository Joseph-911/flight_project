from users.models import *
from flights.models import * 


class GenericDAL:

    def create_object(self, model_class, data):
        try:
            obj = model_class.objects.create(**data)
            return obj
        except Exception as error:
            return error


    def read_object(self, model_class, id):
        try:
            obj = model_class.objects.get(id=id)
            return obj
        except model_class.DoesNotExist:
            return None
        
    def read_object_by(self, model_class, field, value):
        try:
            obj = model_class.objects.get(**{field: value})
            return obj
        except model_class.DoesNotExist:
            return None
        
    def update_object(self, obj, fields):
        for field, value in fields.items():
            setattr(obj, field, value)
        obj.save()
        
    
    def read_all_objects(self, model_class):
        objects = model_class.objects.all()
        return objects
    

    def read_objects_filter_username(self, model_class, username):
        if model_class != User:
            objects = model_class.objects.filter(user_id__username__icontains=username)
        else:
            objects = model_class.objects.filter(username__icontains=username)

        return objects
    
    
    def read_objects_filter_name(self, model_class, name):
        objects = model_class.objects.filter(name__icontains=name)
        return objects
    

    def read_object_filter_by(self, model_class, filter_dict):
        return model_class.objects.filter(**filter_dict)


    def get_customer_by_id(self, pk):
        return Customer.objects.get(id=pk)


    def get_airlines_by_county(self, pk):
        country = self.read_object(Country, pk)
        if country:
            return self.read_object_filter_by(AirlineCompany, {'country_id': pk})
        return None
    

    def get_flights_by_airline_id(self, pk):
        airline = self.read_object(AirlineCompany, pk)

        if airline:
            return self.read_object_filter_by(Flight, {'airline_company_id': pk})
        return None   

    def get_flights_by_origin_country_id(self, pk):
        country = self.read_object(Country, pk)
        if country:
            return self.read_object_filter_by(Flight, {'origin_country_id': pk})
        return None
    
    
    def get_flights_by_destination_country_id(self, pk):
        country = self.read_object(Country, pk)
        if country:
            return self.read_object_filter_by(Flight, {'destination_country_id': pk})
        return None


    def get_tickets_by_customer(self, pk):
        return self.read_object_filter_by(Ticket, {'customer_id': pk})