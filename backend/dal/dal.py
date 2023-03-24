from users.models import *
from flights.models import * 


class GenericDAL:
    
    def read_all_objects(self, model_class):
        objects = model_class.objects.all()
        return objects