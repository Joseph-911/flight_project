from rest_framework.decorators import api_view

from facades.customer_facade import customer_facade
from utils.decorators import *


# --------------------------------------------- #
# ----------------- Add Ticket ---------------- #
# --------------------------------------------- #
@api_view(['GET','POST'])
@user_has_permission('add_ticket')
def add_ticket(request, pk):
    return customer_facade.add_ticket(request, pk)


# --------------------------------------------- #
# --------------- Remove Ticket --------------- #
# --------------------------------------------- #
@api_view(['GET','DELETE'])
@user_has_permission('delete_ticket')
def remove_ticket(request, pk):
    return customer_facade.remove_ticket(request, pk)


# --------------------------------------------- #
# -------------- View All Tickets ------------- #
# --------------------------------------------- #
@api_view(['GET'])
@user_has_permission('view_ticket')
def get_my_tickets(request):
    return customer_facade.get_my_tickets(request)