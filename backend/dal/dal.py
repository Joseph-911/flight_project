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
        
    
    def read_all_objects(self, model_class):
        objects = model_class.objects.all()
        return objects