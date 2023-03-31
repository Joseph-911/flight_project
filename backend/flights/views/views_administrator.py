from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated

from facades.administrator_facade import administrator_facade
from utils.decorators import *

# --------------------------------------------- #
# --------------- View All Users -------------- #
# --------------------------------------------- #
@api_view(['GET', 'POST'])
@user_has_permission('view_user')
def view_all_users(request):
    return administrator_facade.get_all_users(request)