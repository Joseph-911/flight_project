from django.db.models.signals import post_migrate
from django.dispatch import receiver

from scripts.create_roles_groups import create_roles_groups
from scripts.create_admin import create_admin


@receiver(post_migrate)
def run_create_roles_groups(sender, **kwargs):
    create_roles_groups()


@receiver(post_migrate)
def run_create_admin(sender, **kwargs):
    create_admin()