from django.contrib import admin

from flights.models import *

# Register your models here.
myModels = [Country, Flight, Ticket, Customer, AirlineCompany, Administrator]
admin.site.register(myModels)