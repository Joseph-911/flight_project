from django.db import models

from users.models import User


# Create your models here.
# --------------------------------------------- #
# ------------------ Country ------------------ #
# --------------------------------------------- #
class Country(models.Model):
    name = models.CharField(max_length=25, unique=True)
    flag = models.ImageField(blank=True, null=True, default='defaults/country-default.png', upload_to='countries/')

    class Meta:
        verbose_name_plural = "Countries"

    def __str__(self):
        return self.name


# --------------------------------------------- #
# ------------------ Flight ------------------- #
# --------------------------------------------- #
class Flight(models.Model):
    airline_company_id = models.ForeignKey('AirlineCompany', on_delete=models.CASCADE)
    origin_country_id = models.ForeignKey(Country, related_name='origin_country', on_delete=models.CASCADE)
    destination_country_id = models.ForeignKey(Country, related_name='destination_country', on_delete=models.CASCADE)
    departure_time = models.DateTimeField()
    landing_time = models.DateTimeField()
    price = models.IntegerField()
    remaining_tickets = models.IntegerField()

    class Meta:
        ordering = ['-departure_time']

    def __str__(self):
        return f'Company: {self.airline_company_id}, From: {self.origin_country_id}, To: {self.destination_country_id}'


    def get_from_to(self):
        if self.origin_country_id.name == self.destination_country_id.name:
            return f'{self.origin_country_id} (Local Flight)'
        else:
            return f'{self.origin_country_id.name} to {self.destination_country_id.name}' 
        

    def get_tickets_sold(self):
        tickets = self.ticket_set.all()
        return tickets.count()


    def get_flight_duration(self):
        duration = self.landing_time - self.departure_time
        seconds = duration.total_seconds()
        hours = int(seconds // 3600)
        minutes = int((seconds % 3600) // 60)

        if hours == 0:
            return f'{minutes}m'
        elif minutes == 0:
            return f'{hours}h'
        else:
            return f'{hours}h {minutes}m'
        
        
    def formatted_datetime(self, datetime_obj):
        return datetime_obj.strftime(f'%H:%M, %d %b %Y (%a)')
    
    def formatted_time(self, time_obj):
        return time_obj.strftime(f'%H:%M')

    def formatted_date(self, date_obj):
        return date_obj.strftime(f'%d %b %Y')


    def formatted_departure_date(self):
        return self.formatted_date(self.departure_time)

    def formatted_landing_date(self):
        return self.formatted_date(self.landing_time)
    

    def formatted_departure_time(self):
        return self.formatted_time(self.departure_time)

    def formatted_landing_time(self):
        return self.formatted_time(self.landing_time)
    

    def formatted_departure_datetime(self):
        return self.formatted_datetime(self.departure_time)

    def formatted_landing_datetime(self):
        return self.formatted_datetime(self.landing_time)
    
# --------------------------------------------- #
# ------------------- Ticket ------------------ #
# --------------------------------------------- #
class Ticket(models.Model):
    flight_id = models.ForeignKey(Flight, on_delete=models.CASCADE)
    customer_id = models.ForeignKey('Customer', on_delete=models.CASCADE)

    class Meta:
        unique_together = ('flight_id', 'customer_id')

    def __str__(self):
        return f'Customer Ticket: {self.customer_id}'


# --------------------------------------------- #
# ----------------- Customer ------------------ #
# --------------------------------------------- #
class Customer(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    address = models.CharField(max_length=250)
    credit_card_no = models.CharField(max_length=16, unique=True)
    phone_no = models.CharField(max_length=10, unique=True)
    user_id = models.OneToOneField(User, on_delete=models.CASCADE)
        
    class Meta:
        ordering = ['first_name']

    def __str__(self):
        return f'{self.first_name} {self.last_name}'


# --------------------------------------------- #
# -------------- Airline Company -------------- #
# --------------------------------------------- #
class AirlineCompany(models.Model):
    name = models.CharField(max_length=30, unique=True)
    country_id = models.ForeignKey(Country, on_delete=models.CASCADE)
    user_id = models.OneToOneField(User, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = "Airline companies"
        ordering = ['name'] 

    def __str__(self):
        return self.name
    

# --------------------------------------------- #
# --------------- Administrator --------------- #
# --------------------------------------------- #
class Administrator(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    user_id = models.OneToOneField(User, on_delete=models.CASCADE)
    
    class Meta:
        ordering = ['id']
    
    def __str__(self):
        return f'{self.first_name} {self.last_name}'
