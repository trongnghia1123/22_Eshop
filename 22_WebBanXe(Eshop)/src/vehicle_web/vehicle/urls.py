from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .serializers import VehicleViewSet, VehicleDetailViewSet
from . import views

router = DefaultRouter()
router.register(r'vehicles', VehicleViewSet)
router.register(r'vehicle-details', VehicleDetailViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('vehicle/<int:vehicle_id>/', views.vehicle_detail, name='vehicle-detail'),
    path('load-new-vehicles/', views.load_new_vehicles, name='load-new-vehicles'),
]