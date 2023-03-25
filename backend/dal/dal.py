from users.models import *
from flights.models import * 


class GenericDAL:

    def read_object(self, model_class, id):
        try:
            obj = model_class.objects.get(id=id)
            return obj
        except model_class.DoesNotExist:
            return None
        
    
    def read_all_objects(self, model_class):
        objects = model_class.objects.all()
        return objects