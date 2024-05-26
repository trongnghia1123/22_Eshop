from django.db import models

# Create your models here.
class Vehicle(models.Model):
    title = models.CharField(max_length=255)
    image = models.ImageField(upload_to='static/images/')
    price = models.DecimalField(max_digits=15, decimal_places=2)
    status = models.BooleanField(default=False)

    def __str__(self):
        return self.title
    
class VehicleDetail(models.Model):
    vehicle_id = models.OneToOneField(Vehicle, on_delete=models.CASCADE)
    color = models.CharField(max_length=255)
    horsepower = models.IntegerField(default=0)
    capacity = models.FloatField(default=0)
    cylinder = models.IntegerField(default=4)
    length = models.FloatField(default=0)
    width = models.FloatField(default=0)
    weight = models.FloatField(default=0)
    height = models.FloatField(default=0)
    max_speed = models.FloatField(default=60)
    doors = models.IntegerField(default=4)
    seats = models.IntegerField(default=4)
    interior_color = models.CharField(max_length=255)
    fuel = models.CharField(max_length=100)
    gear_box = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.vehicle_id.title} - {self.color}"
    