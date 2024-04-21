from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    email = models.EmailField(max_length=254, unique=True)
    phone_number = models.CharField(max_length=15)
    gender = models.BooleanField(default=False)
    address = models.TextField()
    
    def __str__(self):
        return self.username
