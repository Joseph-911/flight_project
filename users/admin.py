from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from users.models import *

# Register your models here.
class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ('email', 'username', 'is_staff', 'user_role', 'thumbnail', 'created')
    list_filter = ('email', 'username', 'is_staff', 'is_active', 'user_role')
    fieldsets = (
        (None, {'fields': ('email', 'username', 'password', 'thumbnail')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'user_role')}),
        ('Important dates', {'fields': ('last_login',)}), 
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2', 'user_role', 'is_staff', 'is_active', 'thumbnail')}
        ),
    )
    search_fields = ('email', 'username')



admin.site.register(UserRole)
admin.site.register(User, CustomUserAdmin)