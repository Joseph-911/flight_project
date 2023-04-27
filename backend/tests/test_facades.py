import pytest
import rest_framework

from django.contrib.sessions.middleware import SessionMiddleware
from django.contrib.auth.hashers import make_password
from django.test import RequestFactory

from rest_framework import status

# Models
from users.models import *
from flights.models import *
# Facades
from facades.facade_base import facade_base
from facades.anonymous_facade import anonymous_facade   
from facades.airline_facade import airline_facade
from facades.customer_facade import customer_facade
from facades.administrator_facade import administrator_facade


@pytest.fixture
def user():
    user_data = {'username': 'testuser1', 'password': make_password('testpassword1'), 'email': 'testemail1@email.com'}
    user = facade_base.dal.create_object(User, user_data)
    return user


@pytest.fixture
def country():
    country_data = {'name': 'China'}
    country = facade_base.dal.create_object(Country, country_data)
    return country


@pytest.fixture
def airline():
    country_data = {'name': 'Japan'}
    country = facade_base.dal.create_object(Country, country_data)
    user_data = {'username': 'testuser2', 'password': make_password('testpassword2'), 'email': 'testemail2@email.com'}
    user = facade_base.dal.create_object(User, user_data)
    airline_data = {'name': 'Tokyo Airlines', 'country_id': country, 'user_id': user}
    airline = facade_base.dal.create_object(AirlineCompany, airline_data)
    facade_base.dal.update_object(user, {'user_role': UserRole.objects.get(role_name='airline company')})

    return airline


@pytest.fixture
def customer():
    user_data = {'username': 'testuser20', 'password': make_password('testpassword20'), 'email': 'testemail20@email.com'}
    user = facade_base.dal.create_object(User, user_data)

    customer_data = {'first_name': 'tester', 'last_name': 'tester', 'address': 'Haifa, Haifa, 123', 'credit_card_no': '5356532653265326', 'phone_no': '0504447789', 'user_id': user}

    customer = facade_base.dal.create_object(Customer, customer_data)

    facade_base.dal.update_object(user, {'user_role': UserRole.objects.get(role_name='customer')})
    
    return customer


@pytest.fixture
def flight():
    country_data = {'name': 'Albania'}
    country = facade_base.dal.create_object(Country, country_data)

    user_data = {'username': 'testuser3', 'password': make_password('testpassword3'), 'email': 'testemail3@email.com'}
    user = facade_base.dal.create_object(User, user_data)

    airline_data = {'name': 'Albania Airlines', 'country_id': country, 'user_id': user}
    airline = facade_base.dal.create_object(AirlineCompany, airline_data)

    flight_data = {
        'airline_company_id': airline,
        'origin_country_id': country,
        'destination_country_id': country,
        'departure_time': '2023-08-26T15:20',
        'landing_time': '2023-08-26T23:55',
        'price': 100,
        'remaining_tickets': 1,
    }

    flight = facade_base.dal.create_object(Flight, flight_data)
    return flight


@pytest.fixture
def admin():
    user_data = {'username': 'testuser100', 'password': make_password('testpassword100'), 'email': 'testemail100@email.com'}
    user = facade_base.dal.create_object(User, user_data)
    administrator_data = {'first_name': 'testadmin', 'last_name': 'testadmin', 'user_id': user}
    administrator = facade_base.dal.create_object(Administrator, administrator_data)
    facade_base.dal.update_object(user, {'user_role': UserRole.objects.get(role_name='admin')})
    return administrator


# --------------------------------------------- # 
# ------------- Facade Base Tests ------------- # 
# --------------------------------------------- # 
@pytest.mark.django_db
class TestFacadeBase:
    facade = facade_base   
    request_factory = RequestFactory()


    def test_user_login(self, user):
        request = self.request_factory.post(
            '/api/login/', 
            content_type='application/json',
        )
        request.data = {'username': user.username, 'password': 'testpassword1'}

        middleware = SessionMiddleware(lambda req: None)
        middleware.process_request(request)
        response = self.facade.user_login(request)
        assert response.status_code == status.HTTP_200_OK


    def test_user_login_invalid(self, user):

        request = self.request_factory.post(
            '/api/login/', 
            content_type='application/json',
        )
        request.data = {'username': user.username, 'password': 'testpassword2'}

        middleware = SessionMiddleware(lambda req: None)
        middleware.process_request(request)
        response = self.facade.user_login(request)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED


    def test_get_all_airlines(self):
        response = self.facade.get_all_airlines()
        assert response.status_code == status.HTTP_200_OK
    

    def test_get_airline_by_id(self, airline):
        airline = airline
        request = type('', (object,), {'method': 'GET'})()
        pk = 1
        response = self.facade.get_airline_by_id(request, pk)
        assert response.status_code == status.HTTP_200_OK
    

    def test_get_airline_by_id_invalid(self):
        request = type('', (object,), {'method': 'GET'})()
        pk = 1000
        response = self.facade.get_airline_by_id(request, pk)
        assert response.status_code == status.HTTP_404_NOT_FOUND


    def test_get_all_countries(self):
        response = self.facade.get_all_countries()
        assert response.status_code == status.HTTP_200_OK
    

    def test_get_country_by_id(self, country):
        country = country
        request = type('', (object,), {'method': 'GET'})()
        pk = 2
        response = self.facade.get_country_by_id(request, pk)
        assert response.status_code == status.HTTP_200_OK
    

    def test_get_country_by_id_invalid(self):
        request = type('', (object,), {'method': 'GET'})()
        pk = 1000
        response = self.facade.get_country_by_id(request, pk)
        assert response.status_code == status.HTTP_404_NOT_FOUND


    def test_get_all_flights(self):
        response = self.facade.get_all_flights()
        assert response.status_code == status.HTTP_200_OK

    
    def test_get_flight_by_id(self, flight):
        flight = flight
        response = self.facade.get_flight_by_id(flight.id)
        assert response.status_code == status.HTTP_200_OK

    
    def test_get_flight_by_id_invalid(self, flight):
        flight = flight
        pk = 999999
        response = self.facade.get_flight_by_id(pk)
        assert response.status_code == status.HTTP_404_NOT_FOUND

    
    def test_create_new_user(self):
        request = type('', (object,), 
                       {'method': 'POST',
                        'data': {
                            'username': 'testuser10', 
                            'password1': 'admin11223344',
                            'password2': 'admin11223344', 
                            'email': 'testuser10@email.com', 
                        }
                    })()

        response = self.facade.create_new_user(request)

        assert response.status_code == status.HTTP_201_CREATED



# --------------------------------------------- # 
# ----------- Anonymous Facade Test ----------  # 
# --------------------------------------------- # 
@pytest.mark.django_db
class TestAnonymousFacade:
    facade = anonymous_facade
    request_factory = RequestFactory()

    def test_create_customer(self, user):
        request = type('', (object,), 
                       {'method': 'POST',
                        'data': {
                            'first_name': 'testcustomer', 
                            'last_name': 'testcustomer', 
                            'user_id': user.id, 
                            'address': 'Test, Test, 123',
                            'phone_no': '0501234567',
                            'credit_card_no': '4580999977775555',
                        }
                    })()
        request.user = user

        response = self.facade.create_customer(request)

        assert response.status_code == status.HTTP_200_OK


# --------------------------------------------- # 
# ------------ Airline Facade Tests ----------- # 
# --------------------------------------------- # 
@pytest.mark.django_db
class TestAirlineFacade:
    facade = airline_facade

    def test_add_flight(self, airline):
        request = type('', (object,), 
                       {'method': 'POST', 
                        'data': {
                            'origin_country_id': int(airline.country_id.id), 
                            'destination_country_id': int(airline.country_id.id), 
                            'departure_time' : '2023-08-26T15:20',
                            'landing_time' : '2023-08-26T22:20',
                            'price' : 20,
                            'remaining_tickets' : 20,
                            },
                        })()
        request.user = airline.user_id

        response = self.facade.add_flight(request)

        assert response.status_code == status.HTTP_200_OK


    def test_add_flight_invalid(self, airline):
        request = type('', (object,), 
                       {'method': 'POST', 
                        'data': {
                            'origin_country_id': int(airline.country_id.id), 
                            'destination_country_id': int(airline.country_id.id), 
                            'departure_time' : '2023-08-26T15:20',
                            'landing_time' : '2023-08-26T22:20',
                            'price' : -100,
                            'remaining_tickets' : 20,
                            },
                        })()
        request.user = airline.user_id

        with pytest.raises(rest_framework.exceptions.ValidationError):
            response = self.facade.add_flight(request)

            assert response.status_code == status.HTTP_400_BAD_REQUEST


# --------------------------------------------- # 
# ----------- Customer Facade Tests ----------- # 
# --------------------------------------------- # 
@pytest.mark.django_db
class TestCustomerFacade:
    facade = customer_facade

    def test_add_ticket(self, customer, flight):
        request = type('', (object,), {'method': 'POST'})()        
        request.user =  customer.user_id

        pk = flight.id

        response = self.facade.add_ticket(request, pk)

        assert response.status_code == status.HTTP_200_OK


    def test_add_ticket_invalid(self, customer, flight):
        request = type('', (object,), {'method': 'POST'})()        
        request.user =  customer.user_id

        pk = flight.id

        self.facade.dal.update_object(flight, {'remaining_tickets': flight.remaining_tickets-1})

        response = self.facade.add_ticket(request, pk)

        assert response.status_code == status.HTTP_400_BAD_REQUEST


# --------------------------------------------- # 
# -------- Administrator Facade Tests --------- # 
# --------------------------------------------- # 
@pytest.mark.django_db
class TestAdministratorFacade:
    facade = administrator_facade

    def test_get_all_customers(self):
        request = type('', (object,), {'method': 'GET'})()
        response = self.facade.get_all_customers(request)
        assert response.status_code == status.HTTP_200_OK


    def test_add_airline(self, country, user):
        data = {
            'user_id': user.id,
            'name': 'testairline10',
            'country_id': country.id,
        }
        request = type('', (object,), {'method': 'POST', 'data': data })()
        
        response = self.facade.add_airline(request)
        assert response.status_code == status.HTTP_200_OK


    def test_remove_airline(self, airline):
        request = type('', (object,), {'method': 'DELETE' })()
        pk = airline.id
        response = self.facade.remove_airline(request, pk)

        assert response.status_code == status.HTTP_200_OK


    def test_remove_airline_invalid(self):
        request = type('', (object,), {'method': 'DELETE' })()
        pk = 99999
        response = self.facade.remove_airline(request, pk)

        assert response.status_code == status.HTTP_404_NOT_FOUND


    def test_add_country(self):
        data = {'name': 'United States'}
        request = type('', (object,), {'method': 'POST', 'data': data })()

        response = self.facade.add_country(request)

        assert response.status_code == status.HTTP_200_OK


    def test_add_country_invalid(self):
        data = {'name': 'x'}
        request = type('', (object,), {'method': 'POST', 'data': data })()


        with pytest.raises(rest_framework.exceptions.ValidationError):
            response = self.facade.add_country(request)

            assert response.status_code == status.HTTP_400_BAD_REQUEST
