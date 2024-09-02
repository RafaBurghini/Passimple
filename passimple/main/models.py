from django.db import models
from django.contrib.auth.models import User

# Create your models here.



class Account(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    site = models.CharField(max_length=100)
    username = models.CharField(max_length=100, null=True, blank=True)
    email = models.EmailField()
    password = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.username
    
