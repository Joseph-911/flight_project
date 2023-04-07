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

    def __str__(self):
        return f'Company: {self.airline_company_id}, From: {self.origin_country_id}, To: {self.destination_country_id}'


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
