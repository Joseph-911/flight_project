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
    

    def read_objects_filter_username(self, model_class, username):
        if model_class != User:
            objects = model_class.objects.filter(user_id__username__icontains=username)
        else:
            objects = model_class.objects.filter(username__icontains=username)

        return objects
    
    
    def read_objects_filter_name(self, model_class, name):
        objects = model_class.objects.filter(name__icontains=name)
        return objects

