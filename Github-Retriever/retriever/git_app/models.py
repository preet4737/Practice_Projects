from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class UserInfo(models.Model):
    user = models.OneToOneField(User,on_delete = models.PROTECT)
    def __str__(self):
        return self.user.username

class GitUserInfo(models.Model):
    username = models.CharField(max_length = 256)
