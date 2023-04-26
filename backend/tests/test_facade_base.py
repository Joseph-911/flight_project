import pytest

from django.contrib.sessions.middleware import SessionMiddleware
from django.contrib.auth.hashers import make_password
from django.test import RequestFactory

from rest_framework import status

from users.models import *
from flights.models import *
from facades.facade_base import facade_base    

@pytest.fixture
def instances():
    user_data = {'username': 'testuser1', 'password': make_password('testpassword1'), 'email': 'testemail1@email.com'}
    user = facade_base.dal.create_object(User, user_data)
    return user

@pytest.fixture
def country():
    # Country
    country_data = {'name': 'China'}
    country = facade_base.dal.create_object(Country, country_data)
    return country

@pytest.fixture
def airline():
    # Country
    country_data = {'name': 'Japan'}
    country = facade_base.dal.create_object(Country, country_data)

    user_data = {'username': 'testuser2', 'password': make_password('testpassword2'), 'email': 'testemail2@email.com'}
    user = facade_base.dal.create_object(User, user_data)

    airline_data = {'name': 'Tokyo Airlines', 'country_id': country, 'user_id': user}
    airline = facade_base.dal.create_object(AirlineCompany, airline_data)

    return airline

@pytest.fixture
def flight():
    # Country
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
        'remaining_tickets': 20,
    }

    flight = facade_base.dal.create_object(Flight, flight_data)
    return flight


@pytest.mark.django_db
class TestFacadeBase:
    facade = facade_base   
    request_factory = RequestFactory()

    def test_user_login(self, instances):
        user = instances

        request = self.request_factory.post(
            '/api/login/', 
            content_type='application/json',
        )
        request.data = {'username': user.username, 'password': 'testpassword1'}

        middleware = SessionMiddleware(lambda req: None)
        middleware.process_request(request)
        response = self.facade.user_login(request)
        assert response.status_code == status.HTTP_200_OK


    def test_user_login_invalid(self, instances):
        user = instances

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
        response = facade_base.get_all_airlines()
        assert response.status_code == status.HTTP_200_OK
    

    def test_get_airline_by_id(self, airline):
        airline = airline
        request = type('', (object,), {'method': 'GET'})()
        pk = 1
        response = facade_base.get_airline_by_id(request, pk)
        assert response.status_code == status.HTTP_200_OK
    

    def test_get_airline_by_id_invalid(self):
        request = type('', (object,), {'method': 'GET'})()
        pk = 1000
        response = facade_base.get_airline_by_id(request, pk)
        assert response.status_code == status.HTTP_404_NOT_FOUND


    def test_get_all_countries(self):
        response = facade_base.get_all_countries()
        assert response.status_code == status.HTTP_200_OK
    

    def test_get_country_by_id(self, country):
        country = country
        request = type('', (object,), {'method': 'GET'})()
        pk = 2
        response = facade_base.get_country_by_id(request, pk)
        assert response.status_code == status.HTTP_200_OK
    

    def test_get_country_by_id_invalid(self):
        request = type('', (object,), {'method': 'GET'})()
        pk = 1000
        response = facade_base.get_country_by_id(request, pk)
        assert response.status_code == status.HTTP_404_NOT_FOUND


    def test_get_all_flights(self):
        response = facade_base.get_all_flights()
        assert response.status_code == status.HTTP_200_OK

    
    def test_get_flight_by_id(self, flight):
        flight = flight
        response = facade_base.get_flight_by_id(flight.id)
        assert response.status_code == status.HTTP_200_OK

    
    def test_get_flight_by_id_invalid(self, flight):
        flight = flight
        response = facade_base.get_flight_by_id(flight.id+1)
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

        response = facade_base.create_new_user(request)

        assert response.status_code == status.HTTP_201_CREATED

