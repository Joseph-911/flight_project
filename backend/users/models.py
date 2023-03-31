from django.db import models
from django.contrib.auth.models import Group, AbstractBaseUser, BaseUserManager, PermissionsMixin


# Create your models here.
# --------------------------------------------- #
# ----------------- User Role ----------------- # 
# --------------------------------------------- # 
class UserRole(models.Model):
    role_name = models.CharField(max_length=50, unique=True)
    group = models.OneToOneField(Group, blank=True, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.role_name


# --------------------------------------------- #
# ------------------- User -------------------- #
# --------------------------------------------- #
class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        if not password:
            raise ValueError('The password field must be set')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('user_role', UserRole.objects.get(role_name='admin'))
        return self.create_user(username, email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=15, unique=True)
    email = models.EmailField(unique=True)
    user_role = models.ForeignKey(UserRole, on_delete=models.SET_NULL, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    thumbnail = models.ImageField(null=True, blank=True, default='defaults/user-default.png', upload_to='users/')
    created = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    objects = CustomUserManager()

    def __str__(self):
        return self.username
    
    class Meta:
        ordering = ['-is_superuser', 'id']
    
