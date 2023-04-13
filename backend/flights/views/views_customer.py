from rest_framework.decorators import api_view

from facades.customer_facade import customer_facade
from utils.decorators import *


# --------------------------------------------- #
# -------------- View All Tickets ------------- #
# --------------------------------------------- #
@api_view(['GET'])
@user_has_permission('view_ticket')
def get_my_tickets(request):
    return customer_facade.get_my_tickets(request)

