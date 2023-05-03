from rest_framework.decorators import api_view, authentication_classes
from rest_framework.permissions import IsAuthenticated

from facades.anonymous_facade import anonymous_facade

# --------------------------------------------- # 
# -------------- Create Customer -------------- # 
# --------------------------------------------- # 
@authentication_classes([IsAuthenticated])
@api_view(['GET', 'POST'])
def create_customer(request):
    return anonymous_facade.create_customer(request)