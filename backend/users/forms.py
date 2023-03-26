from django import forms
from django.contrib.auth.forms import UserCreationForm

from users.models import *


# --------------------------------------------- # 
# ----------------- User Form ----------------- # 
# --------------------------------------------- # 
class CustomUserCreationForm(UserCreationForm):    
    class Meta:
        model = User
        fields = ['thumbnail', 'username', 'email', 'password1', 'password2']

    def __init__(self, *args, **kwargs):
        super(CustomUserCreationForm, self).__init__(*args, **kwargs)
        for key, field in self.fields.items():
            field.widget.attrs.update({'class': 'form-control'})
        self.fields['username'].widget.attrs.update({'autocomplete': 'username'})

