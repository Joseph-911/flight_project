import os
from dotenv import load_dotenv
from django.contrib.auth import get_user_model
from flights.models import Administrator
load_dotenv()

def create_admin():
    User = get_user_model()
    if not User.objects.filter(username=os.getenv('ADMIN_USERNAME'), is_superuser=True).exists():
        admin_user = User.objects.create_superuser(
            username=os.getenv('ADMIN_USERNAME'), 
            email=os.getenv('ADMIN_EMAIL'),
            password=os.getenv('ADMIN_PASSWORD'),
        )
        admin = Administrator.objects.create(
            first_name=os.getenv('ADMIN_FIRSTNAME'),
            last_name=os.getenv('ADMIN_LASTNAME'),
            user_id=admin_user,
        )
